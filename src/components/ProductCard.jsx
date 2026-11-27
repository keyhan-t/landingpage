import { useState } from "react";
import { Link } from "react-router";
import Stars from "./Stars";
import Price from "./Price";
import { toFa, formatCategory } from "../utils/format";

// یک کارت محصول. محصول رو از بیرون می‌گیره:
//   <ProductCard product={{ id: 1, title: "...", image: "...", rating: 4, price: 120, oldPrice: 150 }} />
// fit = "cover" (عکس کل کادر رو پر کنه) یا "contain" (کل عکس دیده بشه، مناسب عکس‌های API)
// اگه fit نده، از خود محصول (product.fit) خونده می‌شه
export default function ProductCard({ product }) {
  // liked = قلب علاقه‌مندی زده شده یا نه
  const [liked, setLiked] = useState(false);

  // درصد تخفیف رو از قیمت قدیمی و جدید حساب می‌کنیم
  let discount = 0;
  if (product.oldPrice) {
    discount = Math.round((1 - product.price / product.oldPrice) * 100);
  }

  // همه‌ی تصاویر داخل بوم شفاف و هم‌اندازه نمایش داده می‌شوند.
  const imageStyle = "size-full object-contain p-1.5 sm:p-4";

  // آدرس صفحه‌ی جزئیات + خود محصول (که توی صفحه‌ی جزئیات نشون داده بشه)
  const detailsLink = `/products/${product.id}`;

  return (
    <article className="group flex h-full select-none flex-col gap-2">
      {/* قسمت عکس */}
      <div className="relative aspect-[4/4.7] overflow-hidden rounded-xl bg-[#f7f7f7] sm:aspect-square sm:rounded-2xl">
        <img
          src={product.image}
          alt={product.title}
          className={`${imageStyle} bg-transparent transition-transform duration-300 ease-out group-hover:scale-[1.025]`}
          loading="lazy"
          decoding="async"
        />

        {/* برچسب تخفیف (فقط اگه تخفیف داشت) */}
        {discount > 0 && (
          <span className="absolute start-3 top-3 rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-600">
            {toFa(discount)}٪
          </span>
        )}

        {/* دکمه‌ی قلب */}
        <button
          aria-label="افزودن به علاقه‌مندی‌ها"
          onClick={() => setLiked(!liked)}
          className="absolute end-3 top-3 grid size-8 place-items-center sm:size-9 rounded-full bg-white/90 shadow transition-all duration-300 hover:scale-110"
        >
          <i className={liked ? "bi bi-heart-fill text-red-500" : "bi bi-heart"}></i>
        </button>

        {/* دکمه‌ی See Details که موقع hover از پایین میاد بالا */}
        <Link
          to={detailsLink}
          state={{ product }}
          className="absolute inset-x-3 bottom-3 hidden translate-y-[150%] rounded-full bg-black py-2.5 text-center text-sm font-medium text-white shadow-lg transition-all duration-300 ease-out hover:bg-violet-700 group-hover:translate-y-0 sm:block"
        >
          <i className="bi bi-eye me-1"></i>مشاهده جزئیات
        </Link>
      </div>

      {/* دسته‌بندی (اگه محصول داشت) */}
      {product.category && (
        <span className="mt-1 text-xs text-gray-500">
          {formatCategory(product.category)}
        </span>
      )}

      {/* اسم محصول (لینک به صفحه‌ی جزئیات) */}
      <h3 className="line-clamp-2 text-xs font-bold leading-5 sm:text-lg sm:leading-6">
        <Link
          to={detailsLink}
          state={{ product }}
          className="transition-colors hover:text-blue-600"
        >
          {product.title}
        </Link>
      </h3>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        <Stars rating={product.rating} className="text-sm sm:text-base" showValue />
        {product.reviewsCount > 0 && (
          <span className="text-xs text-gray-400">({toFa(product.reviewsCount)})</span>
        )}
      </div>

      {/* قیمت‌ها (mt-auto یعنی همیشه پایین کارت) */}
      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1">
        <Price value={product.price} className="text-sm font-semibold sm:text-2xl" />
        {product.oldPrice && (
          <del className="text-lg text-gray-400 sm:text-xl">
            <Price value={product.oldPrice} unitClassName="text-[10px] sm:text-xs" />
          </del>
        )}
      </div>
    </article>
  );
}
