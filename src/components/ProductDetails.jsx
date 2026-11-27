import { useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import Filters from "./Filters";
import ProductComments from "./ProductComments";
import ProductSection from "./ProductSection";
import ReviewModal from "./ReviewModal";
import Newsletter from "./Newsletter";
import Reveal from "./Reveal";
import Stars from "./Stars";
import Price from "./Price";
import ProductsLoading from "./ProductsLoading";
import useProducts from "../hooks/useProducts";
import { productDetails } from "../data/productDetails";
import { reviewsData } from "../data/reviews";
import { toFa, formatRating, formatCategory, isClothingCategory } from "../utils/format";

/* ═══════════════ گالری عکس (عکس‌های کوچک + عکس بزرگ) ═══════════════ */
function Gallery({ images, title, discount }) {
  // active = شماره‌ی عکسی که الان بزرگ نشون داده می‌شه
  const [active, setActive] = useState(0);

  const imageStyle =
    "size-full object-contain p-5";

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row lg:gap-4">
      {/* عکس‌های کوچک (موبایل: زیر عکس بزرگ، دسکتاپ: کنارش) */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3 lg:flex lg:w-24 lg:shrink-0 lg:flex-col xl:w-32">
        {images.map((src, index) => {
          // عکس انتخاب‌شده کادر آبی داره، بقیه کمی کم‌رنگ هستن
          const thumbStyle =
            active === index
              ? "border-blue-600 shadow-lg shadow-blue-600/20"
              : "border-transparent opacity-70 hover:-translate-y-0.5 hover:opacity-100";

          return (
            <Reveal key={index} variant="left" delay={index * 100}>
              <button
                onClick={() => setActive(index)}
                className={`block aspect-square w-full overflow-hidden rounded-xl border-2 bg-hero transition-all duration-300 ${thumbStyle}`}
              >
                <img src={src} alt="" className={imageStyle} />
              </button>
            </Reveal>
          );
        })}
      </div>

      {/* عکس بزرگ (موقع hover زوم می‌شه) */}
      <Reveal variant="zoom" className="flex-1">
        <div className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl bg-hero">
          <img
            src={images[active]}
            alt={title}
            className={`${imageStyle} transition-transform duration-500 ease-out group-hover:scale-[1.4]`}
          />
          {discount > 0 && (
            <span className="absolute start-4 top-4 rounded-full bg-red-200 px-3 py-1 text-sm font-semibold text-red-600">
              {toFa(discount)}٪
            </span>
          )}
        </div>
      </Reveal>
    </div>
  );
}

/* ═══════════════ سوالات متداول (آکاردئون) ═══════════════ */
function Faq({ items }) {
  // openIndex = شماره‌ی سوالی که بازه (-1 یعنی هیچکدوم)
  const [openIndex, setOpenIndex] = useState(0);

  function toggle(index) {
    if (openIndex === index) {
      setOpenIndex(-1); // اگه بازه ببندش
    } else {
      setOpenIndex(index); // وگرنه بازش کن
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const boxStyle = isOpen
          ? "border-blue-600/50 bg-white shadow-lg"
          : "border-gray-300 bg-gray-100";

        return (
          <Reveal key={item.q} variant="up" delay={index * 90}>
            <div className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${boxStyle}`}>
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-base font-semibold sm:text-lg"
              >
                {item.q}
                {/* علامت + که وقتی بازه می‌چرخه و می‌شه × */}
                <i
                  className={`bi bi-plus-lg shrink-0 text-xl transition-transform duration-300 ${
                    isOpen ? "rotate-45 text-blue-600" : ""
                  }`}
                ></i>
              </button>
              {/* جواب فقط وقتی سوال بازه نشون داده می‌شه */}
              {isOpen && <p className="animate-panel px-5 pb-5 text-gray-600">{item.a}</p>}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ═══════════════ صفحه‌ی اصلی جزئیات محصول ═══════════════ */
function ProductDetailsContent({ base, similar, similarLoading }) {
  // base = محصولی که از API اومده؛ رنگ‌ها، سایزها و سوالات متداول از productDetails
  const product = {
    ...productDetails,
    ...base,
    description: base.description || productDetails.description,
    images: base.images && base.images.length > 0 ? base.images : [base.image],
    specs: [
      { label: "دسته‌بندی", value: base.category ? formatCategory(base.category) : "—" },
      { label: "امتیاز", value: `${formatRating(base.rating)} از ۵` },
      { label: "تعداد نظرات", value: toFa(base.reviewsCount || 0) },
      { label: "کد محصول", value: `#${toFa(base.id)}` },
    ],
  };

  // رنگ و سایز فقط برای پوشاک معنی داره
  const isClothing = isClothingCategory(product.category);

  // درصد تخفیف
  let discount = 0;
  if (product.oldPrice) {
    discount = Math.round((1 - product.price / product.oldPrice) * 100);
  }

  // ───── state ها (چیزهایی که با کلیک کاربر عوض می‌شن) ─────
  const [color, setColor] = useState(0); // شماره‌ی رنگ انتخاب‌شده
  const [size, setSize] = useState(2); // شماره‌ی سایز انتخاب‌شده
  const [qty, setQty] = useState(1); // تعداد
  const [added, setAdded] = useState(false); // به سبد اضافه شد؟
  const [liked, setLiked] = useState(false); // قلب علاقه‌مندی

  const [tab, setTab] = useState("reviews"); // تب فعال: details | reviews | faqs
  const [reviews, setReviews] = useState(reviewsData); // لیست نظرات
  const [sort, setSort] = useState("popular"); // نوع مرتب‌سازی
  const [ratingFilter, setRatingFilter] = useState("all"); // فیلتر ستاره
  const [modalOpen, setModalOpen] = useState(false); // پنجره‌ی نوشتن نظر

  // ───── تابع‌ها ─────
  function handleAddToCart() {
    setAdded(true);
    // بعد از ۱.۸ ثانیه دوباره به حالت اول برگرد
    setTimeout(() => setAdded(false), 1800);
  }

  function decreaseQty() {
    if (qty > 1) setQty(qty - 1); // کمتر از ۱ نشه
  }

  function increaseQty() {
    if (qty < 10) setQty(qty + 1); // بیشتر از ۱۰ نشه
  }

  // نظر جدید رو اول لیست اضافه می‌کنه
  function handleAddReview(newReview) {
    const review = {
      id: Date.now(), // یه شماره‌ی یکتا از زمان فعلی
      name: newReview.name,
      rating: newReview.rating,
      text: newReview.text,
      likes: 0,
      verified: false,
      date: new Date().toISOString().slice(0, 10), // تاریخ امروز به شکل 2026-10-28
    };

    setReviews([review, ...reviews]); // نظر جدید + نظرهای قبلی
    setTab("reviews");
    setSort("latest");
    setRatingFilter("all");
    setModalOpen(false);
  }

  return (
    <>
      {/* ───── مسیر صفحه (breadcrumb) ───── */}
      <Reveal variant="down" className="mx-auto w-[92%] max-w-7xl pt-5 lg:w-[88%]">
        <nav className="no-scrollbar flex items-center gap-2 overflow-x-auto whitespace-nowrap text-sm text-gray-500">
          <Link to="/" className="transition-colors hover:text-black">
            خانه
          </Link>
          <i className="bi bi-chevron-left text-xs"></i>
          <Link to="/products" className="transition-colors hover:text-black">
            فروشگاه
          </Link>
          <i className="bi bi-chevron-left text-xs"></i>
          <span className="font-medium text-black">
            {product.category ? formatCategory(product.category) : "محصولات"}
          </span>
        </nav>
      </Reveal>

      {/* ───── بخش اصلی محصول: گالری + اطلاعات ───── */}
      <section className="mx-auto mt-5 grid w-[92%] max-w-7xl gap-8 lg:mt-8 lg:w-[88%] lg:grid-cols-2 lg:gap-12">
        <Gallery
          images={product.images}
          title={product.title}
          discount={discount}
        />

        <div className="flex flex-col gap-4 sm:gap-5">
          <Reveal variant="right">
            <h1 className="font-archivo text-3xl leading-tight sm:text-4xl xl:text-[42px]">
              {product.title}
            </h1>
          </Reveal>

          <Reveal variant="right" delay={80}>
            <Stars rating={product.rating} showValue className="text-xl" />
          </Reveal>

          {/* قیمت‌ها */}
          <Reveal variant="right" delay={140} className="flex flex-wrap items-center gap-3 sm:gap-5">
            <Price value={product.price} className="text-3xl font-bold" unitClassName="text-base" />
            {product.oldPrice && (
              <del className="text-2xl font-bold text-gray-400">
                <Price value={product.oldPrice} unitClassName="text-sm" />
              </del>
            )}
            {discount > 0 && (
              <span className="rounded-full bg-red-200 px-3 py-1 text-base font-semibold text-red-600">
                {toFa(discount)}٪
              </span>
            )}
          </Reveal>

          <Reveal variant="right" delay={200}>
            <p className="max-w-xl text-base text-gray-500 sm:text-lg">{product.description}</p>
          </Reveal>

          {isClothing && (
            <>
          {/* انتخاب رنگ */}
          <Reveal variant="up" delay={100} className="flex flex-col gap-3 border-t-2 border-gray-200 py-4">
            <span className="text-lg text-gray-600 sm:text-xl">
              انتخاب رنگ: <b className="text-black">{product.colors[color].name}</b>
            </span>
            <div className="flex gap-4 sm:gap-5">
              {product.colors.map((item, index) => {
                // رنگ انتخاب‌شده یه حلقه‌ی مشکی دور خودش داره و کمی بزرگ‌تره
                const selected = color === index;
                return (
                  <button
                    key={item.name}
                    aria-label={item.name}
                    onClick={() => setColor(index)}
                    style={{ background: item.value }}
                    className={`grid size-10 place-items-center rounded-full ring-2 ring-offset-2 transition-all duration-300 hover:scale-110 ${
                      selected ? "scale-110 ring-black" : "ring-transparent"
                    }`}
                  >
                    {/* تیک سفید فقط روی رنگ انتخاب‌شده */}
                    {selected && <i className="bi bi-check-lg animate-pop text-white"></i>}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* انتخاب سایز */}
          <Reveal variant="up" delay={150} className="flex flex-col gap-3 border-y-2 border-gray-200 py-4">
            <span className="text-lg text-gray-600 sm:text-xl">انتخاب سایز</span>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {product.sizes.map((item, index) => {
                // سایز انتخاب‌شده مشکیه
                const sizeStyle =
                  size === index ? "bg-black text-white shadow-lg" : "bg-gray-200 hover:bg-gray-300";
                return (
                  <button
                    key={item}
                    onClick={() => setSize(index)}
                    className={`h-11 rounded-lg px-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 sm:text-base ${sizeStyle}`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </Reveal>

            </>
          )}

          {/* تعداد + افزودن به سبد + قلب */}
          <Reveal variant="up" delay={200} className="flex flex-col gap-3 sm:flex-row sm:gap-5">
            <div className="flex h-12 items-center justify-between rounded-full bg-gray-200 px-5 sm:w-40">
              <button
                aria-label="کم کردن تعداد"
                onClick={decreaseQty}
                className="text-2xl transition-transform hover:scale-125 active:scale-90"
              >
                <i className="bi bi-dash-lg"></i>
              </button>
              <span className="text-xl font-medium">{toFa(qty)}</span>
              <button
                aria-label="زیاد کردن تعداد"
                onClick={increaseQty}
                className="text-2xl transition-transform hover:scale-125 active:scale-90"
              >
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`group relative h-12 flex-1 overflow-hidden rounded-full font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                added ? "bg-blue-600" : "bg-black"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {added ? (
                  <>
                    <i className="bi bi-check2-circle text-lg"></i> به سبد اضافه شد
                  </>
                ) : (
                  <>
                    <i className="bi bi-bag-plus"></i> افزودن به سبد خرید
                  </>
                )}
              </span>
              <span className="absolute inset-0 translate-x-full bg-blue-600 transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </button>

            <button
              aria-label="افزودن به علاقه‌مندی‌ها"
              onClick={() => setLiked(!liked)}
              className="grid size-12 shrink-0 place-items-center self-end rounded-full border border-black/15 text-xl transition-all duration-300 hover:scale-110 hover:border-red-300 sm:self-auto"
            >
              <i className={liked ? "bi bi-heart-fill text-red-500" : "bi bi-heart"}></i>
            </button>
          </Reveal>

          {/* ۳ تا نشان اطمینان */}
          <Reveal
            variant="up"
            delay={250}
            className="grid grid-cols-3 gap-2 pt-1 text-center text-xs text-gray-600 sm:text-sm"
          >
            <div className="flex flex-col items-center gap-1.5 rounded-xl bg-gray-100 px-2 py-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md">
              <i className="bi bi-truck text-xl text-blue-600"></i>
              ارسال رایگان
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-xl bg-gray-100 px-2 py-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md">
              <i className="bi bi-arrow-repeat text-xl text-blue-600"></i>
              ۳۰ روز بازگشت
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-xl bg-gray-100 px-2 py-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md">
              <i className="bi bi-shield-check text-xl text-blue-600"></i>
              پرداخت امن
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───── تب‌ها ───── */}
      <div className="mt-14 sm:mt-20">
        <Filters
          activeTab={tab}
          setActiveTab={setTab}
          total={reviews.length}
          sort={sort}
          setSort={setSort}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
          onWriteReview={() => setModalOpen(true)}
        />
      </div>

      {/* ───── محتوای تب انتخاب‌شده ───── */}
      <div className="mt-6 sm:mt-8">
        {/* تب نظرات */}
        {tab === "reviews" && (
          <ProductComments reviews={reviews} sort={sort} ratingFilter={ratingFilter} />
        )}

        {/* تب جزئیات */}
        {tab === "details" && (
          <div className="animate-panel mx-auto grid w-[92%] max-w-7xl gap-8 lg:w-[88%] lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-4 text-base text-gray-600 sm:text-lg">
              <p>{product.description}</p>
              {product.details.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
            <dl className="grid grid-cols-2 gap-3">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-2xl border border-gray-300 bg-gray-100 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/50 hover:bg-white hover:shadow-lg"
                >
                  <dt className="text-sm text-gray-500">{spec.label}</dt>
                  <dd className="mt-1 text-base font-semibold sm:text-lg">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* تب سوالات متداول */}
        {tab === "faqs" && (
          <div className="mx-auto w-[92%] max-w-7xl lg:w-[88%]">
            <Faq items={product.faqs} />
          </div>
        )}
      </div>

      {/* ───── محصولات مشابه ───── */}
      <ProductSection
        title="شاید اینها را هم بپسندید"
        products={similar}
        loading={similarLoading}
        className="mt-20 sm:mt-28"
      />

      <Newsletter />

      {/* پنجره‌ی نوشتن نظر */}
      <ReviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddReview}
      />
    </>
  );
}

// این wrapper محصول رو پیدا می‌کنه (از لینک کارت یا از API) و وقتی از یه محصول به محصول دیگه می‌ری
// (مثلا از محصولات مشابه)، همه‌ی state ها (تب، رنگ، تعداد و ...) از اول شروع می‌شن
export default function ProductDetails() {
  const { pathname, state } = useLocation();
  const { id } = useParams();
  const { products, loading, error, retry } = useProducts();

  // اول محصولی که کارت همراه لینک فرستاده، وگرنه از لیست API (اگه مستقیم آدرس رو باز کرده باشن)
  const base = state?.product ?? products?.find((item) => String(item.id) === id);

  if (!base) {
    return (
      <div className="mx-auto w-[92%] max-w-7xl py-16 lg:w-[88%]">
        {loading && <ProductsLoading count={4} className="grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-4" />}

        {error && (
          <div className="animate-panel rounded-3xl border border-red-100 bg-red-50 px-5 py-14 text-center">
            <i className="bi bi-wifi-off animate-float inline-block text-4xl text-red-500"></i>
            <h3 className="mt-4 text-lg font-bold">دریافت محصول انجام نشد</h3>
            <p className="mt-2 text-sm text-gray-600">{error}</p>
            <button
              onClick={retry}
              className="mt-5 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              <i className="bi bi-arrow-clockwise me-2"></i>تلاش دوباره
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="rounded-3xl bg-gray-100 px-5 py-16 text-center">
            <i className="bi bi-search inline-block text-4xl text-gray-400"></i>
            <h3 className="mt-4 text-lg font-bold">این محصول پیدا نشد</h3>
            <Link
              to="/products"
              className="mt-5 inline-block rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              بازگشت به فروشگاه
            </Link>
          </div>
        )}
      </div>
    );
  }

  // محصولات مشابه: اول هم‌دسته‌ها، بعد بقیه (خود محصول نباشه)
  const others = (products ?? []).filter((item) => item.id !== base.id);
  const sameCategory = others.filter((item) => item.category === base.category);
  const rest = others.filter((item) => item.category !== base.category);
  const similar = [...sameCategory, ...rest].slice(0, 8);

  return (
    <ProductDetailsContent
      key={pathname}
      base={base}
      similar={similar}
      similarLoading={products === null && !error}
    />
  );
}
