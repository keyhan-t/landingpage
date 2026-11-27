import { Link } from "react-router";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import Slider from "./Slider";
import ProductCard from "./ProductCard";
import ProductsLoading from "./ProductsLoading";

// یه بخش کامل محصولات: تیتر + اسلایدر کارت‌ها + دکمه‌ی View all
//   title    = تیتر بخش
//   products = لیست محصولات (آرایه)
//   loading  = هنوز محصولات از API نیومدن؟ (لودینگ نشون بده)
//   error    = پیام خطا (اگه API جواب نداد) و onRetry = تابع «تلاش دوباره»
export default function ProductSection({
  title,
  products = [],
  loading = false,
  error = "",
  onRetry,
  className = "",
}) {
  return (
    <section className={`mx-auto w-[92%] max-w-7xl lg:w-[88%] ${className}`}>
      <SectionTitle>{title}</SectionTitle>

      <div className="mt-10 sm:mt-14">
        {loading && (
          <ProductsLoading count={4} className="grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4" />
        )}

        {error && (
          <div className="animate-panel rounded-3xl border border-red-100 bg-red-50 px-5 py-12 text-center">
            <i className="bi bi-wifi-off animate-float inline-block text-4xl text-red-500"></i>
            <h3 className="mt-4 text-lg font-bold">دریافت محصولات انجام نشد</h3>
            <p className="mt-2 text-sm text-gray-600">{error}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-5 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                <i className="bi bi-arrow-clockwise me-2"></i>تلاش دوباره
              </button>
            )}
          </div>
        )}

        {!loading && !error && products.length > 0 && (
        <Slider>
          {/* برای هر محصول یه کارت می‌سازیم. map یعنی "روی همه‌ی آیتم‌ها بگرد" */}
          {products.map((product, index) => (
            <Reveal
              key={product.id}
              variant="up"
              delay={(index % 4) * 120} // کارت‌ها یکی‌یکی با تاخیر میان
              className="shrink-0 basis-[72%] snap-start px-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </Reveal>
          ))}
        </Slider>
        )}
      </div>

      <Reveal variant="up" className="flex justify-center pt-8 sm:pt-10">
        <Link
          to="/products"
          className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-full border border-black px-10 font-medium transition-colors duration-500 hover:text-white sm:w-48"
        >
          <span className="relative z-10">مشاهده همه</span>
          {/* لایه‌ی مشکی که موقع hover از پایین بالا میاد */}
          <span className="absolute inset-0 origin-bottom scale-y-0 bg-black transition-transform duration-500 ease-out group-hover:scale-y-100" />
        </Link>
      </Reveal>
    </section>
  );
}
