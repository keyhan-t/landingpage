import { useState } from "react";
import { Link } from "react-router";
import Countdown from "./Countdown";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import Sparkle from "./Sparkle";

// اخبار تخفیف که توی نوار بالا می‌چرخن
const news = [
  "ارسال رایگان برای سفارش‌های بالای ۲ میلیون تومان",
  "حراج ویژه: تا ۳۰٪ تخفیف روی کالاهای منتخب",
  "با کد SHOP20 ۲۰٪ تخفیف اضافه بگیر",
  "مدل‌های فصل جدید رسیدند",
  "۳۰ روز بازگشت رایگان برای همه‌ی کالاها",
];

// کارت‌های امتیاز فروشگاه
const perks = [
  { icon: "bi-truck", title: "ارسال رایگان", text: "برای خرید بالای ۲ میلیون تومان" },
  { icon: "bi-arrow-repeat", title: "بازگشت آسان", text: "۳۰ روز بازگشت رایگان" },
  { icon: "bi-shield-check", title: "پرداخت امن", text: "۱۰۰٪ محافظت‌شده" },
  { icon: "bi-headset", title: "پشتیبانی ۲۴/۷", text: "همیشه کنارتیم" },
];

export default function ProductsHero({ total, loading }) {
  const [copied, setCopied] = useState(false);

  // کپی کردن کد تخفیف
  function copyCode() {
    navigator.clipboard
      .writeText("SHOP20")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  }

  // نوار اخبار: لیست رو ۴ بار تکرار می‌کنیم تا چرخش بی‌وقفه باشه
  const tickerItems = [...news, ...news, ...news, ...news];

  return (
    <>
      {/* ───── نوار اخبار تخفیف ───── */}
      <div className="overflow-hidden bg-blue-600 py-2.5 text-sm font-medium text-white">
        <div className="animate-marquee flex w-max">
          {tickerItems.map((item, index) => (
            <span key={index} className="flex items-center whitespace-nowrap">
              <span className="px-6">{item}</span>
              <Sparkle className="size-3 text-white/70" />
            </span>
          ))}
        </div>
      </div>

      {/* ───── هدر صفحه ───── */}
      <section className="relative overflow-hidden bg-hero">
        {/* تزئینات */}
        <Sparkle className="animate-twinkle absolute end-[6%] top-10 hidden size-16 text-black lg:block" />
        <Sparkle className="animate-twinkle absolute bottom-12 start-[48%] hidden size-8 text-blue-600 lg:block" />

        <div className="relative mx-auto grid w-[92%] max-w-7xl items-center gap-10 py-12 sm:py-16 lg:w-[88%] lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          {/* متن (سمت راست) */}
          <div>
            <Reveal variant="down">
              <nav className="flex items-center gap-2 text-sm text-gray-500">
                <Link to="/" className="transition-colors hover:text-black">
                  خانه
                </Link>
                <i className="bi bi-chevron-left text-xs"></i>
                <span className="font-medium text-black">فروشگاه</span>
              </nav>
            </Reveal>

            <Reveal variant="up" delay={100}>
              <p className="mt-6 text-sm font-semibold text-blue-600">سبک خودت را کشف کن</p>
            </Reveal>

            <Reveal variant="blur" delay={200}>
              <h1 className="font-archivo mt-3 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                همه‌ی محصولات
              </h1>
            </Reveal>

            <Reveal variant="up" delay={300}>
              <p className="mt-5 max-w-lg text-sm leading-7 text-gray-600 sm:text-base">
                تمام مجموعه‌ی ما را ببین، بر اساس چیزی که برایت مهم است فیلتر کن و لباس‌هایی را پیدا کن
                که به سبک تو می‌خورد.
              </p>
            </Reveal>

            <Reveal variant="up" delay={400} className="mt-7 flex flex-wrap gap-3 text-sm">
              <span className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white">
                <i className="bi bi-grid"></i>
                {loading ? (
                  "در حال بارگذاری…"
                ) : (
                  <span>
                    <CountUp end={total} /> محصول
                  </span>
                )}
              </span>
              <span className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-700">
                <i className="bi bi-funnel text-blue-600"></i>
                فیلترهای هوشمند
              </span>
              <span className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-700">
                <i className="bi bi-truck text-blue-600"></i>
                ارسال رایگان بالای ۲ میلیون
              </span>
            </Reveal>
          </div>

          {/* کارت فروش ویژه */}
          <Reveal variant="right" delay={250}>
            <div className="relative overflow-hidden rounded-[2rem] bg-black p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:p-8">
              <i className="bi bi-tags-fill animate-float pointer-events-none absolute end-6 top-6 text-4xl text-white/20"></i>

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-red-200 px-3 py-1 text-xs font-bold text-red-600">
                  <i className="bi bi-lightning-charge-fill"></i> حراج ویژه
                </span>

                <h2 className="text-shine font-archivo mt-4 text-4xl sm:text-5xl">تا ۳۰٪ تخفیف</h2>
                <p className="mt-2 text-sm text-white/60">کالاهای منتخب · پایان حراج تا</p>

                <div className="mt-5">
                  <Countdown />
                </div>

                {/* کد تخفیف */}
                <button
                  onClick={copyCode}
                  className="group mt-6 flex w-full items-center justify-between gap-3 rounded-2xl border border-dashed border-white/30 bg-white/5 px-5 py-3 text-start transition-all duration-300 hover:border-blue-400 hover:bg-white/10 active:scale-[0.98]"
                >
                  <span>
                    <span className="block text-[10px] text-white/50">کد تخفیف</span>
                    <span className="font-archivo text-xl tracking-widest">SHOP20</span>
                  </span>
                  <span
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      copied ? "text-green-400" : "text-white/70 group-hover:text-white"
                    }`}
                  >
                    <i className={copied ? "bi bi-check2-circle animate-pop" : "bi bi-copy"}></i>
                    {copied ? "کپی شد!" : "کپی"}
                  </span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───── مزیت‌های فروشگاه ───── */}
      <div className="mx-auto mt-8 grid w-[92%] max-w-7xl grid-cols-2 gap-3 sm:gap-4 lg:w-[88%] lg:grid-cols-4">
        {perks.map((perk, index) => (
          <Reveal key={perk.title} variant="up" delay={index * 100}>
            <div className="group flex h-full items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-500 hover:-translate-y-1 hover:border-blue-600/40 hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)]">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gray-100 text-xl text-blue-600 transition-all duration-500 group-hover:rotate-6 group-hover:bg-blue-600 group-hover:text-white">
                <i className={`bi ${perk.icon}`}></i>
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold sm:text-base">{perk.title}</span>
                <span className="block truncate text-xs text-gray-500 sm:text-sm">{perk.text}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
