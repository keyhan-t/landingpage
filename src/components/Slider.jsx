import { useRef, useState } from "react";

// ───────────────────────────────────────────────────────────
// Slider = یه ردیف افقی که با انگشت (موبایل) یا فلش‌ها (دسکتاپ) جابجا می‌شه
//
// استفاده:
//   <Slider>
//     <div className="shrink-0 snap-start basis-1/3">کارت ۱</div>
//     <div className="shrink-0 snap-start basis-1/3">کارت ۲</div>
//   </Slider>
//
// هر اسلاید باید این کلاس‌ها رو داشته باشه:
//   shrink-0   → کوچیک نشه
//   snap-start → موقع اسکرول سر جاش بچسبه
//   basis-...  → عرض اسلاید (مثلا basis-1/3 یعنی یک‌سوم عرض)
// ───────────────────────────────────────────────────────────
export default function Slider({ children, arrowTop = "top-[38%]" }) {
  // trackRef = اشاره‌گر به ردیف اسلایدها (تا بتونیم اسکرولش کنیم)
  const trackRef = useRef(null);

  // progress = چقدر اسکرول شده (از ۰ تا ۱) برای نوار پایین
  const [progress, setProgress] = useState(0);

  // direction: عدد 1 یعنی بعدی ، عدد -1 یعنی قبلی
  // توی راست‌چین «بعدی» یعنی رفتن به سمت چپ، پس جهت اسکرول برعکس می‌شه
  function moveSlider(direction) {
    const track = trackRef.current;
    track.scrollBy({
      left: -direction * track.clientWidth * 0.8, // ۸۰٪ عرض صفحه
      behavior: "smooth",
    });
  }

  // هر وقت اسکرول شد، نوار پیشرفت رو آپدیت کن
  function handleScroll() {
    const track = trackRef.current;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll > 0) {
      // توی راست‌چین scrollLeft منفیه (۰ سمت راسته)، پس قدر مطلقش رو می‌گیریم
      setProgress(Math.abs(track.scrollLeft) / maxScroll);
    }
  }

  // استایل مشترک دو تا دکمه‌ی فلش (فقط توی صفحه‌های بزرگ دیده می‌شن)
  const arrowStyle =
    "absolute z-20 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-xl shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white md:grid";

  return (
    <div className="relative">
      {/* فلش «قبلی» (سمت راست) */}
      <button
        aria-label="قبلی"
        className={`${arrowStyle} ${arrowTop} start-1 lg:-start-4`}
        onClick={() => moveSlider(-1)}
      >
        <i className="bi bi-chevron-right"></i>
      </button>

      {/* فلش «بعدی» (سمت چپ) */}
      <button
        aria-label="بعدی"
        className={`${arrowStyle} ${arrowTop} end-1 lg:-end-4`}
        onClick={() => moveSlider(1)}
      >
        <i className="bi bi-chevron-left"></i>
      </button>

      {/* ردیف اسلایدها */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="no-scrollbar -mx-2 flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth py-3"
      >
        {children}
      </div>

      {/* نوار پیشرفت زیر اسلایدر */}
      <div className="mx-auto mt-4 h-1 w-32 overflow-hidden rounded-full bg-gray-200 sm:w-48">
        <div
          className="h-full w-1/3 rounded-full bg-blue-600 transition-transform duration-150"
          style={{ transform: `translateX(${-progress * 200}%)` }}
        />
      </div>
    </div>
  );
}
