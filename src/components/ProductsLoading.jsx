// لودینگ نمایش محصولات: یه پیام با آیکون چرخان + کارت‌های اسکلتی که چشمک می‌زنن
//   count = چند کارت اسکلتی نشون بده
//   className = چیدمان ستون‌ها (پیش‌فرض: ۲ ستون موبایل، ۳ ستون بزرگ‌تر)
export default function ProductsLoading({
  count = 6,
  className = "grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5",
}) {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <p className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-500">
        <i className="bi bi-arrow-repeat inline-block animate-spin text-lg text-blue-600"></i>
        در حال بارگذاری محصولات…
      </p>

      <div className={`mt-3 grid ${className}`}>
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-square rounded-2xl bg-gray-100" />
            <div className="mt-4 h-4 w-4/5 rounded bg-gray-100" />
            <div className="mt-3 h-4 w-2/5 rounded bg-gray-100" />
            <div className="mt-3 h-5 w-1/3 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
