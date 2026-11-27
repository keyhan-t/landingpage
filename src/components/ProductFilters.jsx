import PriceRange from "./PriceRange";
import Stars from "./Stars";
import { formatPrice } from "../utils/format";

// گزینه‌های فیلتر امتیاز (0 یعنی همه)
const ratingOptions = [
  { value: 4, label: "به بالا" },
  { value: 3, label: "به بالا" },
  { value: 2, label: "به بالا" },
];

// ستون فیلتر: قیمت + امتیاز
// (هم سمت راست صفحه توی دسکتاپ استفاده می‌شه، هم توی منوی موبایل)
//   filters  = { priceMin, priceMax, minRating }
//   update   = تابعی که یه تغییر رو توی فیلترها ذخیره می‌کنه
//   maxPrice = گران‌ترین محصول (سقف اسلایدر)
//   step     = گام اسلایدر قیمت
export default function ProductFilters({
  filters,
  update,
  maxPrice,
  step = 1,
  onReset,
  showTitle = true,
}) {
  // اگه کاربر حداکثر قیمت رو دست نزده باشه، همون سقف رو نشون بده
  const currentMax = filters.priceMax === null ? maxPrice : filters.priceMax;

  // آیا فیلتری فعاله؟ (برای نشون دادن دکمه‌ی Reset)
  const hasFilter = filters.priceMin > 0 || filters.priceMax !== null || filters.minRating > 0;

  function handlePriceChange(newMin, newMax) {
    // اگه حداکثر به سقف رسید، یعنی "بدون محدودیت" (null)
    update({ priceMin: newMin, priceMax: newMax >= maxPrice ? null : newMax });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* عنوان + Reset */}
      <div className="flex items-center justify-between">
        {showTitle ? (
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <i className="bi bi-sliders2 text-blue-600"></i>
            فیلترها
          </h2>
        ) : (
          <span />
        )}
        {hasFilter && (
          <button
            onClick={onReset}
            className="animate-pop rounded-full px-3 py-1 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-blue-600"
          >
            <i className="bi bi-arrow-counterclockwise me-1"></i>بازنشانی
          </button>
        )}
      </div>

      {/* ───── قیمت ───── */}
      <div className="animate-panel border-t border-gray-100 pt-5" style={{ animationDelay: "100ms" }}>
        <h3 className="mb-4 flex items-center justify-between font-semibold">
          قیمت
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-blue-600">
            {formatPrice(filters.priceMin)} تا {formatPrice(currentMax)} تومان
          </span>
        </h3>
        <PriceRange
          min={filters.priceMin}
          max={currentMax}
          bound={maxPrice}
          step={step}
          onChange={handlePriceChange}
        />
      </div>

      {/* ───── امتیاز ───── */}
      <div className="animate-panel border-t border-gray-100 pt-5" style={{ animationDelay: "200ms" }}>
        <h3 className="mb-4 font-semibold">امتیاز</h3>

        <div className="flex flex-col gap-2">
          {/* گزینه‌ی همه‌ی امتیازها */}
          <button
            onClick={() => update({ minRating: 0 })}
            className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
              filters.minRating === 0
                ? "bg-black text-white shadow-lg"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            همه‌ی امتیازها
            {filters.minRating === 0 && <i className="bi bi-check2 animate-pop"></i>}
          </button>

          {ratingOptions.map((option) => {
            const selected = filters.minRating === option.value;
            return (
              <button
                key={option.value}
                onClick={() => update({ minRating: option.value })}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                  selected ? "bg-black text-white shadow-lg" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Stars rating={option.value} className="text-sm" />
                  {option.label}
                </span>
                {selected && <i className="bi bi-check2 animate-pop"></i>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
