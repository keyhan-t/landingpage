import { Link } from "react-router";
import header from "../assets/header.png";
import CountUp from "./CountUp";
import Sparkle from "./Sparkle";

const stats = [
  { end: 200, suffix: "+", label: "برند بین‌المللی" },
  { end: 2000, suffix: "+", label: "محصول باکیفیت" },
  { end: 30000, suffix: "+", label: "مشتری راضی" },
];

export default function Header() {
  return (
    <header className="relative flex w-full flex-col overflow-hidden bg-hero lg:block">
      {/* تصویر پس‌زمینه - ارتفاع در موبایل افزایش یافت */}
      <div className="relative order-2 h-[320px] w-full overflow-hidden xs:h-[380px] sm:h-[450px] md:h-[500px] lg:absolute lg:inset-y-0 lg:end-0 lg:h-auto lg:w-full">
        <div className="hero-fade size-full lg:scale-105">
          <img
            src={header}
            alt="دو مدل با کاپشن جین و هودی"
            className="hero-img size-full object-cover object-[50%_20%] sm:object-[60%_20%] lg:object-[80%_center]"
          />
        </div>
      </div>

      {/* ستاره‌های تزئینی دسکتاپ */}
      <Sparkle className="animate-twinkle absolute end-[8%] top-[10%] z-10 hidden size-24 text-black lg:block xl:size-32" />
      <Sparkle className="animate-twinkle absolute start-[46%] top-[42%] z-10 hidden size-12 text-black lg:block" />
      
      {/* ستاره موبایل - جابجایی به سمت راست و بالاتر تا روی متن نیفتد */}
      <Sparkle className="animate-twinkle absolute end-6 top-[45%] z-10 size-8 text-blue-600 lg:hidden" />

      {/* محتوای متنی */}
      <div className="relative z-10 order-1 mx-auto flex w-full max-w-7xl flex-col items-start justify-center gap-4 px-5 py-8 text-right sm:gap-6 sm:px-8 sm:py-12 lg:min-h-[680px] lg:w-[88%] lg:items-end lg:gap-7 lg:px-0 lg:py-0 xl:min-h-[760px]">
        <h1
          className="hero-anim font-archivo flex w-full max-w-[18ch] text-[clamp(1.8rem,6.5vw,2.6rem)] leading-[1.4] sm:max-w-[20ch] sm:text-4xl md:text-5xl lg:max-w-[600px] lg:text-5xl xl:max-w-[720px] xl:text-7xl"
          style={{ animationDelay: "0ms" }}
        >
          لباسی پیدا کن که با سبک تو بخواند
        </h1>

        <p
          className="hero-anim max-w-[520px] text-sm leading-7 text-gray-600 sm:text-base sm:leading-8"
          style={{ animationDelay: "100ms" }}
        >
          در میان مجموعه‌ی متنوع پوشاک ما که با دقت طراحی و دوخته شده، چیزی را
          انتخاب کن که شخصیت تو را نشان می‌دهد و با سلیقه‌ات هماهنگ است.
        </p>

        {/* دکمه */}
        <div
          className="hero-anim w-full sm:w-auto mt-2 sm:mt-0"
          style={{ animationDelay: "160ms" }}
        >
          <Link
            to="/products"
            className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-black px-7 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03] active:scale-95 sm:h-14 sm:w-auto sm:max-w-[280px] sm:px-10 sm:text-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              همین حالا بخر
              <i className="bi bi-arrow-left transition-transform duration-300 group-hover:-translate-x-1"></i>
            </span>
            <span className="absolute inset-0 translate-x-full bg-blue-600 transition-transform duration-500 ease-out group-hover:translate-x-0" />
          </Link>
        </div>

        {/* بخش آمار - اصلاح شده برای موبایل */}
        <div
          className="hero-anim mt-6 flex w-full items-start justify-between gap-2 sm:mt-8 sm:justify-start sm:gap-10 lg:mt-12"
          style={{ animationDelay: "220ms" }}
        >
          {stats.map((item, index) => (
            <div
              key={item.label}
              className={`flex flex-col gap-1 ${
                index !== 0 
                  ? "border-s border-black/10 ps-3 sm:ps-8" 
                  : ""
              }`}
            >
              <span className="whitespace-nowrap text-lg font-bold sm:text-3xl lg:text-4xl xl:text-5xl">
                <CountUp end={item.end} suffix={item.suffix} delay={250} />
              </span>
              <span className="text-[10px] leading-5 text-gray-600 sm:text-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}