import { useState } from "react";
import Reveal from "./Reveal";
import Sparkle from "./Sparkle";

// کارت مشکی عضویت در خبرنامه
// پس‌زمینه‌ی section نصفش سفیده و نصفش خاکستریِ فوتر،
// پس دقیقاً نصف کارت داخل فوتره، هر ارتفاعی که کارت داشته باشه.
export default function Newsletter() {
  const [email, setEmail] = useState(""); // متنی که کاربر تایپ کرده
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState(""); // پیام زیر دکمه

  function handleSubmit(event) {
    event.preventDefault(); // جلوگیری از رفرش شدن صفحه موقع ارسال فرم

    // بررسی ساده‌ی ایمیل: باید @ و . داشته باشه
    if (!email.includes("@") || !email.includes(".")) {
      setStatus("error");
      setMessage("لطفاً یک ایمیل معتبر وارد کنید.");
      return; // همین‌جا تموم، ادامه نده
    }

    setStatus("loading");
    setMessage("");

    // 👉 فعلا فقط تست هست (۱ ثانیه صبر می‌کنه).
    // بعداً اینجا به جای setTimeout از fetch برای فرستادن ایمیل به سرورت استفاده کن.
    setTimeout(() => {
      console.log("subscribed:", email);
      setStatus("success");
      setMessage("عضو شدی! برای دریافت هدیه‌ی خوش‌آمدگویی به ایمیلت سر بزن 🎉");
      setEmail("");
    }, 1000);
  }

  // متن دکمه بر اساس وضعیت
  let buttonText = "عضویت در خبرنامه";
  if (status === "loading") buttonText = "در حال ثبت…";
  if (status === "success") buttonText = "عضو شدی ✓";

  // رنگ پیام: سبز برای موفقیت، قرمز برای خطا
  const messageColor = status === "success" ? "text-green-400" : "text-red-400";

  // اگه خطا داریم دور اینپوت قرمز بشه
  const inputRing = status === "error" ? "ring-red-400" : "ring-transparent";

  return (
    <section
      className="relative z-10 mt-20 sm:mt-28"
      style={{ background: "linear-gradient(to bottom, #fff 50%, var(--color-mist) 50%)" }}
    >
      <Reveal
        variant="up"
        className="relative mx-auto w-[92%] max-w-7xl overflow-hidden rounded-[2rem] bg-black px-6 py-10 text-white shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:px-12 sm:py-12 lg:w-[88%] lg:px-16"
      >
        {/* تزئینات: دایره‌های آبی محو و ستاره */}
        <Sparkle className="animate-twinkle pointer-events-none absolute end-6 top-6 size-10 text-white/80 sm:size-14" />

        <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* متن (سمت راست) */}
          <div>
            <h2 className="font-archivo text-3xl leading-tight sm:text-4xl lg:text-5xl">
              از تازه‌ترین تخفیف‌های ما باخبر باش
            </h2>
            <p className="mt-3 max-w-md text-sm text-white/60 sm:text-base">
              عضو خبرنامه‌ی ما شو تا اولین نفری باشی که از محصولات تازه و تخفیف‌های ویژه
              باخبر می‌شود.
            </p>
          </div>

          {/* فرم (سمت چپ) */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
            <div className="relative">
              <i className="bi bi-envelope pointer-events-none absolute start-5 top-1/2 -translate-y-1/2 text-lg text-gray-500"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل خود را وارد کنید"
                className={`h-12 w-full rounded-full bg-white ps-12 pe-4 text-sm text-black outline-none ring-2 transition-all duration-300 placeholder:text-gray-500 focus:ring-blue-500 sm:h-14 sm:text-base ${inputRing}`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative h-12 overflow-hidden rounded-full bg-white font-semibold text-black transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:cursor-wait disabled:opacity-80 sm:h-14"
            >
              <span className="absolute inset-0 translate-x-full bg-blue-600 transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative transition-colors duration-300 group-hover:text-white">
                {buttonText}
              </span>
            </button>

            <p className={`min-h-5 text-center text-sm lg:text-start ${messageColor}`}>{message}</p>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
