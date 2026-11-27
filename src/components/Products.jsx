import { useEffect, useMemo, useState } from "react";
import useProducts from "../hooks/useProducts";
import { toFa } from "../utils/format";
import ProductCard from "./ProductCard";
import ProductsLoading from "./ProductsLoading";
import ProductFilters from "./ProductFilters";
import ProductsHero from "./ProductsHero";
import Newsletter from "./Newsletter";
import Reveal from "./Reveal";

// ───── تنظیمات ─────
const PAGE_SIZE = 9; // هر بار چند محصول نشون بدیم
const PRICE_STEP = 10000; // گام اسلایدر قیمت (تومان)
const STORAGE_KEY = "shop-filters"; // ذخیره‌ی فیلترها (تا موقع برگشت از صفحه‌ی جزئیات پاک نشن)

const defaultFilters = {
  priceMin: 0,
  priceMax: null, // null یعنی بدون محدودیت
  minRating: 0, // 0 یعنی همه‌ی امتیازها
  sort: "default",
};

// فیلترهای ذخیره‌شده رو بخون
function loadFilters() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultFilters, ...JSON.parse(saved) };
  } catch {
    // اگه مرورگر اجازه نداد، مهم نیست
  }
  return defaultFilters;
}

export default function Products() {
  // محصولات از API میان (products = null یعنی هنوز نیومده)
  const { products, loading, error, retry: handleRetry } = useProducts();

  const [filters, setFilters] = useState(loadFilters);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false); // منوی فیلتر موبایل

  // ───── ذخیره‌ی فیلترها ─────
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } catch {
      // مهم نیست
    }
  }, [filters]);

  // ───── قفل اسکرول و بستن با Esc وقتی منوی موبایل بازه ─────
  useEffect(() => {
    if (!drawerOpen) return;

    document.body.style.overflow = "hidden";
    function handleKey(event) {
      if (event.key === "Escape") setDrawerOpen(false);
    }
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [drawerOpen]);

  // گران‌ترین محصول = سقف اسلایدر قیمت
  const maxPrice = useMemo(() => {
    if (!products || products.length === 0) return PRICE_STEP;
    const highest = Math.max(...products.map((p) => p.price));
    return Math.ceil(highest / PRICE_STEP) * PRICE_STEP;
  }, [products]);

  // ───── فیلتر + مرتب‌سازی ─────
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const max = filters.priceMax === null ? maxPrice : filters.priceMax;

    // ۱) فقط محصولاتی که توی بازه‌ی قیمت و امتیاز هستن
    const result = products.filter((product) => {
      const priceOk = product.price >= filters.priceMin && product.price <= max;
      const ratingOk = product.rating >= filters.minRating;
      return priceOk && ratingOk;
    });

    // ۲) مرتب‌سازی
    if (filters.sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sort === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title, "fa"));
    }

    return result;
  }, [products, filters, maxPrice]);

  // ───── تابع‌ها ─────
  function update(changes) {
    setFilters({ ...filters, ...changes });
    setVisible(PAGE_SIZE); // با هر تغییر فیلتر، از اول نشون بده
  }

  function resetFilters() {
    setFilters({ ...defaultFilters, sort: filters.sort });
    setVisible(PAGE_SIZE);
  }

  // تعداد فیلترهای فعال (برای نشان روی دکمه‌ی Filters موبایل)
  let activeCount = 0;
  if (filters.priceMin > 0 || filters.priceMax !== null) activeCount += 1;
  if (filters.minRating > 0) activeCount += 1;

  const shown = filteredProducts.slice(0, visible);
  const total = products ? products.length : 0;

  // با تغییر فیلتر، کل شبکه از نو انیمیشن می‌گیره (key عوض می‌شه)
  const gridKey = `${filters.priceMin}-${filters.priceMax}-${filters.minRating}-${filters.sort}`;

  return (
    <>
      {/* هدر: نوار اخبار + بنر تخفیف + مزیت‌ها */}
      <ProductsHero total={total} loading={loading} />

      <div className="mx-auto mt-10 w-[92%] max-w-7xl lg:w-[88%]">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
          {/* ═════════ ستون فیلتر (سمت راست، فقط دسکتاپ) ═════════ */}
          <aside className="hidden self-start lg:sticky lg:top-24 lg:block">
            <Reveal variant="left">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <ProductFilters
                  filters={filters}
                  update={update}
                  maxPrice={maxPrice}
                  step={PRICE_STEP}
                  onReset={resetFilters}
                />
              </div>
            </Reveal>
          </aside>

          {/* ═════════ محصولات (سمت چپ) ═════════ */}
          <section className="min-w-0">
            {/* نوار بالا: تعداد نتایج + دکمه‌ی فیلتر موبایل + مرتب‌سازی */}
            <Reveal variant="up">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-archivo text-2xl sm:text-3xl">مجموعه‌ی ما</h2>
                  {!loading && !error && (
                    <p className="mt-1 text-sm text-gray-500">
                      نمایش{" "}
                      <span key={filteredProducts.length} className="animate-pop inline-block font-bold text-black">
                        {toFa(filteredProducts.length)}
                      </span>{" "}
                      از {toFa(total)} محصول
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* دکمه‌ی فیلتر (فقط موبایل و تبلت) */}
                  <button
                    onClick={() => setDrawerOpen(true)}
                    className="relative flex h-11 items-center gap-2 rounded-full border border-gray-200 bg-white px-5 text-sm font-medium transition-all duration-300 hover:border-blue-600 hover:text-blue-600 active:scale-95 lg:hidden"
                  >
                    <i className="bi bi-sliders2"></i>
                    فیلترها
                    {activeCount > 0 && (
                      <span className="animate-pop grid size-5 place-items-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
                        {toFa(activeCount)}
                      </span>
                    )}
                  </button>

                  {/* مرتب‌سازی */}
                  <div className="relative">
                    <select
                      value={filters.sort}
                      onChange={(e) => update({ sort: e.target.value })}
                      aria-label="مرتب‌سازی محصولات"
                      className="h-11 cursor-pointer appearance-none rounded-full border border-gray-200 bg-white ps-5 pe-10 text-sm font-medium outline-none transition hover:border-black focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="default">پیشنهاد ما</option>
                      <option value="price-low">قیمت: کم به زیاد</option>
                      <option value="price-high">قیمت: زیاد به کم</option>
                      <option value="rating">بیشترین امتیاز</option>
                      <option value="name">نام: الفبایی</option>
                    </select>
                    <i className="bi bi-chevron-down pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-xs"></i>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ───── در حال بارگذاری ───── */}
            {loading && <ProductsLoading count={6} />}

            {/* ───── خطا ───── */}
            {error && (
              <div className="animate-panel mt-6 rounded-3xl border border-red-100 bg-red-50 px-5 py-14 text-center">
                <i className="bi bi-wifi-off animate-float inline-block text-4xl text-red-500"></i>
                <h3 className="mt-4 text-lg font-bold">دریافت محصولات انجام نشد</h3>
                <p className="mt-2 text-sm text-gray-600">{error}</p>
                <button
                  onClick={handleRetry}
                  className="mt-5 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>تلاش دوباره
                </button>
              </div>
            )}

            {/* ───── کارت‌ها: رو به پایین ───── */}
            {!loading && !error && shown.length > 0 && (
              <div
                key={gridKey}
                className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-10"
              >
                {shown.map((product, index) => (
                  <Reveal
                    key={product.id}
                    variant="up"
                    delay={(index % 3) * 90}
                    className="min-w-0"
                  >
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
            )}

            {/* ───── دکمه‌ی Load more + نوار پیشرفت ───── */}
            {!loading && !error && filteredProducts.length > 0 && (
              <Reveal variant="up" className="mt-12 flex flex-col items-center gap-4">
                <p className="text-sm text-gray-500">
                  {toFa(shown.length)} محصول از {toFa(filteredProducts.length)} محصول را دیده‌ای
                </p>
                <div className="h-1.5 w-48 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-700"
                    style={{ width: `${(shown.length / filteredProducts.length) * 100}%` }}
                  />
                </div>

                {visible < filteredProducts.length && (
                  <button
                    onClick={() => setVisible(visible + PAGE_SIZE)}
                    className="group relative mt-2 h-12 w-full overflow-hidden whitespace-nowrap rounded-full border border-black px-10 font-medium transition-colors duration-500 hover:text-white sm:w-64"
                  >
                    <span className="relative z-10">نمایش محصولات بیشتر</span>
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-black transition-transform duration-500 ease-out group-hover:scale-y-100" />
                  </button>
                )}
              </Reveal>
            )}

            {/* ───── نتیجه‌ای پیدا نشد ───── */}
            {!loading && !error && products && filteredProducts.length === 0 && (
              <div className="animate-panel mt-6 rounded-3xl bg-gray-100 px-5 py-16 text-center">
                <i className="bi bi-search animate-float inline-block text-4xl text-gray-400"></i>
                <h3 className="mt-4 text-lg font-bold">محصولی پیدا نشد</h3>
                <p className="mt-2 text-sm text-gray-500">فیلتر قیمت یا امتیاز را تغییر بده.</p>
                <button
                  onClick={resetFilters}
                  className="mt-5 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  پاک کردن فیلترها
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* خبرنامه‌ی تخفیف‌ها (بعدش فوتر میاد) */}
      <Newsletter />

      {/* ═════════ منوی فیلتر موبایل (از راست می‌آد) ═════════ */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div
            className="animate-fade absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="animate-drawer absolute inset-y-0 start-0 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <span className="font-archivo text-xl">فیلترها</span>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="بستن فیلترها"
                className="grid size-9 place-items-center rounded-full transition hover:rotate-90 hover:bg-gray-100"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <ProductFilters
                filters={filters}
                update={update}
                maxPrice={maxPrice}
                step={PRICE_STEP}
                onReset={resetFilters}
                showTitle={false}
              />
            </div>

            <div className="border-t border-gray-100 p-5">
              <button
                onClick={() => setDrawerOpen(false)}
                className="h-12 w-full rounded-full bg-black font-medium text-white transition hover:bg-blue-600 active:scale-95"
              >
                نمایش {toFa(filteredProducts.length)} نتیجه
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
