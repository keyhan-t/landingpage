import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import { Link } from "react-router";

const groups = [
  {
    title: "تیشرت‌های منتخب",
    category: "تیشرت",
    test: (p) => /تی.?شرت/i.test(p.title),
  },
  {
    title: "استایل زنانه",
    category: "زنانه",
    test: (p) => p.category === "پوشاک زنانه",
  },
  {
    title: "استایل مردانه",
    category: "مردانه",
    test: (p) => p.category === "پوشاک مردانه",
  },
  {
    title: "اکسسوری‌های جذاب",
    category: "اکسسوری",
    test: (p) => p.category === "اکسسوری",
  },
];

// 👇 این خط بسیار مهم است. حتماً باید وجود داشته باشد
export default function Sells() {
  const { products, loading, error, retry } = useProducts();

  return (
    <div className="mx-auto mt-12 w-[92%] max-w-7xl space-y-12 sm:mt-20 sm:space-y-16 lg:w-[88%] lg:space-y-20">
      {groups.map((group) => {
        const list = products ? products.filter(group.test).slice(0, 8) : [];

        return (
          <section key={group.category}>
            {/* هدر بخش - قرارگیری دقیق در یک سطر */}
            <div className="mb-6 flex w-full items-end justify-between sm:mb-8">
              {/* سمت راست: NEW COLLECTION و عنوان */}
              <div className="flex flex-col items-start">
                <span className="mb-1 text-[10px] font-bold tracking-widest text-blue-600 sm:text-xs">
                  NEW COLLECTION
                </span>
                {/* با استفاده از flex و items-center، خط آبی SectionTitle را با لینک هم‌تراز می‌کنیم */}
                <div className="flex items-center">
                  <SectionTitle>{group.title}</SectionTitle>
                </div>
              </div>

              {/* سمت چپ: لینک مشاهده همه */}
              <Link
                to="/products"
                className="group flex shrink-0 items-center gap-1 pb-1 text-xs font-semibold text-gray-700 transition hover:text-blue-600 sm:text-sm"
              >
                <span className="whitespace-nowrap">مشاهده همه</span>
                <i className="bi bi-arrow-left transition-transform duration-300 group-hover:-translate-x-1" />
              </Link>
            </div>

            {/* حالت لودینگ */}
            {loading && (
              <div className="grid grid-cols-2 gap-3 gap-y-6 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div className="aspect-[3/4] w-full animate-pulse rounded-2xl bg-gray-100" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
                  </div>
                ))}
              </div>
            )}

            {/* حالت خطا */}
            {error && (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-red-50 p-6 text-center sm:p-8">
                <p className="text-sm text-red-600">{error}</p>
                <button
                  onClick={retry}
                  className="rounded-full bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700 active:scale-95"
                >
                  تلاش دوباره
                </button>
              </div>
            )}

            {/* محصولات */}
            {!loading && !error && list.length > 0 && (
              <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-4">
                {list.map((product, index) => (
                  <Reveal
                    key={product.id}
                    variant="up"
                    delay={(index % 4) * 70}
                    className="min-w-0"
                  >
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
            )}

            {/* حالت خالی */}
            {!loading && !error && list.length === 0 && (
              <div className="rounded-2xl bg-gray-50 p-6 text-center sm:p-8">
                <p className="text-sm text-gray-500">
                  محصولی در این دسته موجود نیست.
                </p>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
