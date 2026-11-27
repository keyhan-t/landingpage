import { useState } from "react";
import Reveal from "./Reveal";
import Stars from "./Stars";
import { formatDate, toFa } from "../utils/format";

// هر بار چند نظر نشون بدیم
const PAGE_SIZE = 4;

// یک کارت نظر
function ReviewCard({ review }) {
  const [liked, setLiked] = useState(false); // دکمه‌ی Helpful زده شده یا نه

  return (
    <article className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-gray-300 bg-gray-100 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-blue-600/50 hover:bg-white hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)] sm:p-6">
      <i className="bi bi-quote pointer-events-none absolute -end-2 -top-5 text-8xl text-gray-200 transition-colors duration-500 group-hover:text-blue-600/10"></i>

      <Stars rating={review.rating} className="relative text-lg" />

      <div className="relative flex items-center gap-2">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-black text-sm font-bold text-white">
          {review.name.charAt(0)}
        </span>
        <span className="font-archivo text-lg sm:text-xl">{review.name}</span>
        {/* تیک آبی فقط برای خریدارهای تأییدشده */}
        {review.verified && <i className="bi bi-patch-check-fill text-lg text-blue-600"></i>}
      </div>

      <p className="relative flex-1 text-[15px] leading-relaxed text-gray-600">{review.text}</p>

      <div className="relative flex items-center justify-between gap-3 text-sm text-gray-500">
        <span>ثبت‌شده در {formatDate(review.date)}</span>
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all duration-300 hover:bg-white ${
            liked ? "text-blue-600" : "hover:text-black"
          }`}
        >
          <i className={liked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"}></i>
          مفید بود ({toFa(liked ? review.likes + 1 : review.likes)})
        </button>
      </div>
    </article>
  );
}

// لیست نظرات (فیلتر و مرتب‌سازی از ProductDetails میاد)
export default function ProductComments({ reviews, sort, ratingFilter }) {
  // visible = الان چند نظر نشون داده می‌شه
  const [visible, setVisible] = useState(PAGE_SIZE);

  // ۱) فیلتر: اگه ستاره‌ای انتخاب شده، فقط همون نظرها
  let list = reviews;
  if (ratingFilter !== "all") {
    list = reviews.filter((review) => Math.round(review.rating) === ratingFilter);
  }

  // ۲) مرتب‌سازی (کپی می‌گیریم تا لیست اصلی به‌هم نریزه)
  list = [...list];
  if (sort === "popular") {
    list.sort((a, b) => b.likes - a.likes); // بیشترین لایک اول
  } else if (sort === "latest") {
    list.sort((a, b) => new Date(b.date) - new Date(a.date)); // جدیدترین اول
  } else if (sort === "highest") {
    list.sort((a, b) => b.rating - a.rating); // بیشترین امتیاز اول
  } else if (sort === "lowest") {
    list.sort((a, b) => a.rating - b.rating); // کمترین امتیاز اول
  }

  // اگه هیچ نظری نموند
  if (list.length === 0) {
    return (
      <div className="mx-auto w-[92%] max-w-7xl py-16 text-center text-gray-500 lg:w-[88%]">
        <i className="bi bi-chat-square-dots text-5xl"></i>
        <p className="mt-3 text-lg">نظری با این فیلتر پیدا نشد.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[92%] max-w-7xl lg:w-[88%]">
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {/* slice(0, visible) یعنی فقط اولین `visible` تا نظر */}
        {list.slice(0, visible).map((review, index) => (
          <Reveal
            key={review.id}
            variant={index % 2 === 0 ? "left" : "right"}
            delay={(index % PAGE_SIZE) * 90}
          >
            <ReviewCard review={review} />
          </Reveal>
        ))}
      </div>

      {/* دکمه‌ی Load More فقط وقتی هنوز نظر نشون داده‌نشده داریم */}
      {visible < list.length && (
        <div className="flex justify-center pt-8">
          <button
            onClick={() => setVisible(visible + PAGE_SIZE)}
            className="group relative h-12 w-full overflow-hidden whitespace-nowrap rounded-full border border-black px-10 font-medium transition-colors duration-500 hover:text-white sm:w-64"
          >
            <span className="relative z-10">نمایش نظرات بیشتر</span>
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-black transition-transform duration-500 ease-out group-hover:scale-y-100" />
          </button>
        </div>
      )}
    </div>
  );
}
