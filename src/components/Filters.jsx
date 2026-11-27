import { useState } from "react";
import Reveal from "./Reveal";
import { toFa } from "../utils/format";

// تب‌های بالای بخش نظرات
const tabs = [
  { id: "details", label: "جزئیات محصول" },
  { id: "reviews", label: "امتیاز و نظرات" },
  { id: "faqs", label: "پرسش‌های متداول" },
];

// گزینه‌های مرتب‌سازی نظرات
const sortOptions = [
  { value: "popular", label: "محبوب‌ترین" },
  { value: "latest", label: "جدیدترین" },
  { value: "highest", label: "بیشترین امتیاز" },
  { value: "lowest", label: "کمترین امتیاز" },
];

// دکمه‌های فیلتر بر اساس ستاره
const ratingOptions = ["all", 5, 4, 3, 2, 1];

// تب‌ها + نوار ابزار نظرات (فیلتر، مرتب‌سازی، نوشتن نظر)
// همه‌ی state ها توی ProductDetails هستن و از بیرون به این کامپوننت داده می‌شن (props)
export default function Filters({
  activeTab,
  setActiveTab,
  total,
  sort,
  setSort,
  ratingFilter,
  setRatingFilter,
  onWriteReview,
}) {
  // showFilters = دکمه‌های ستاره باز هستن یا نه
  const [showFilters, setShowFilters] = useState(false);

  // شماره‌ی تب فعال (۰، ۱ یا ۲) برای حرکت دادن خط آبی
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  // رنگ دکمه‌ی قیف: اگه فیلتر باز باشه یا فیلتری انتخاب شده، آبی
  let funnelStyle = "bg-gray-200 hover:bg-gray-300";
  if (showFilters || ratingFilter !== "all") {
    funnelStyle = "bg-blue-600 text-white";
  }

  return (
    <div className="mx-auto w-[92%] max-w-7xl lg:w-[88%]">
      {/* ───── تب‌ها ───── */}
      <Reveal variant="up">
        <div className="relative flex border-b-2 border-gray-200">
          {tabs.map((tab) => {
            // تب فعال مشکیه، بقیه خاکستری
            const color = activeTab === tab.id ? "text-black" : "text-gray-500 hover:text-black";
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-1 py-3 text-center text-[13px] font-medium transition-colors duration-300 sm:py-4 sm:text-lg lg:text-2xl ${color}`}
              >
                {tab.label}
              </button>
            );
          })}

          {/* خط آبی زیر تب‌ها که سر می‌خوره (هر تب ۱۰۰٪ عرض خودش جابجا می‌شه) */}
          <span
            className="absolute -bottom-0.5 start-0 h-0.5 w-1/3 bg-blue-600 transition-transform duration-500"
            style={{ transform: `translateX(${-activeIndex * 100}%)` }}
          />
        </div>
      </Reveal>

      {/* ───── نوار ابزار نظرات (فقط توی تب Reviews) ───── */}
      {activeTab === "reviews" && (
        <div className="animate-panel pt-6 sm:pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-xl font-bold sm:text-2xl">
              همه‌ی نظرات <span className="font-normal text-gray-500">({toFa(total)})</span>
            </h3>

            <div className="flex flex-wrap items-center gap-3">
              {/* دکمه‌ی قیف */}
              <button
                aria-label="فیلتر نظرات"
                onClick={() => setShowFilters(!showFilters)}
                className={`grid size-10 place-items-center rounded-full transition-all duration-300 hover:scale-110 ${funnelStyle}`}
              >
                <i className="bi bi-funnel-fill"></i>
              </button>

              {/* انتخاب نوع مرتب‌سازی */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-10 cursor-pointer appearance-none rounded-lg bg-gray-200 ps-4 pe-10 text-base outline-none transition hover:bg-gray-300 focus:ring-2 focus:ring-blue-600"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <i className="bi bi-chevron-down pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-sm"></i>
              </div>

              {/* دکمه‌ی نوشتن نظر */}
              <button
                onClick={onWriteReview}
                className="group relative h-10 flex-1 overflow-hidden rounded-lg bg-black px-5 text-white transition-transform duration-300 hover:scale-105 active:scale-95 sm:flex-none"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <i className="bi bi-pencil-square"></i>ثبت نظر
                </span>
                <span className="absolute inset-0 translate-x-full bg-blue-600 transition-transform duration-500 ease-out group-hover:translate-x-0" />
              </button>
            </div>
          </div>

          {/* دکمه‌های فیلتر ستاره (فقط وقتی قیف باز شده) */}
          {showFilters && (
            <div className="animate-panel flex flex-wrap gap-2 pt-4">
              {ratingOptions.map((option) => {
                // دکمه‌ی انتخاب‌شده مشکیه
                const chipStyle =
                  ratingFilter === option ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300";
                return (
                  <button
                    key={option}
                    onClick={() => setRatingFilter(option)}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${chipStyle}`}
                  >
                    {option === "all" ? (
                      "همه"
                    ) : (
                      <>
                        {toFa(option)} <i className="bi bi-star-fill text-yellow-500"></i>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
