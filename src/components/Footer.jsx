import Reveal from "./Reveal";
import { currentJalaliYear } from "../utils/format";

// ستون‌های لینک فوتر
const columns = [
  {
    title: "شرکت",
    links: ["درباره‌ی ما", "ویژگی‌ها", "نمونه‌کارها", "فرصت‌های شغلی"],
  },
  {
    title: "راهنما",
    links: [
      "پشتیبانی مشتریان",
      "جزئیات ارسال",
      "قوانین و مقررات",
      "حریم خصوصی",
    ],
  },
  {
    title: "پرسش‌های متداول",
    links: ["حساب کاربری", "مدیریت ارسال‌ها", "سفارش‌ها", "پرداخت‌ها"],
  },
  {
    title: "منابع",
    links: ["کتاب‌های رایگان", "آموزش‌ها", "وبلاگ", "لیست پخش یوتیوب"],
  },
];

// آیکون شبکه‌های اجتماعی و روش‌های پرداخت (اسم کلاس آیکون‌های bootstrap-icons)
const socials = ["bi-twitter-x", "bi-facebook", "bi-instagram", "bi-github"];
const payments = [
  "bi-credit-card-2-front",
  "bi-paypal",
  "bi-apple",
  "bi-google",
];

export default function Footer() {
  return (
    <footer className="bg-mist">
      <div className="mx-auto w-[92%] max-w-7xl pb-8 pt-12 sm:pt-16 lg:w-[88%]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* لوگو و شبکه‌های اجتماعی */}
          <Reveal variant="up" className="lg:col-span-4">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-violet-100 text-violet-600">
                <i className="bi bi-flower1 text-2xl" />
              </span>
              <span className="font-sans text-3xl font-black tracking-tight text-gray-950">
                Bloom<span className="text-violet-600">.</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-gray-600">
              لباس‌هایی داریم که با سبک تو می‌خواند و پوشیدنش برایت افتخار است.
              از لباس زنانه تا مردانه.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="grid size-9 place-items-center rounded-full border border-black/15 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <i className={`bi ${icon}`}></i>
                </a>
              ))}
            </div>
          </Reveal>

          {/* ۴ ستون لینک */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:gap-6">
            {columns.map((column, index) => (
              <Reveal key={column.title} variant="up" delay={(index + 1) * 100}>
                <h3 className="text-sm font-semibold">{column.title}</h3>
                <ul className="mt-5 flex flex-col gap-3.5 text-gray-600">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="link-underline text-sm transition-colors duration-300 hover:text-black sm:text-[15px]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        {/* خط پایین: کپی‌رایت و آیکون‌های پرداخت */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 text-sm text-gray-600 sm:flex-row">
          <p>
            طراحی و توسعه توسط{" "}
            <a
              href="https://github.com/keyhan-dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              کیهان تخت روان
            </a>
          </p>
          <div className="flex gap-2">
            {payments.map((icon) => (
              <span
                key={icon}
                className="grid h-9 w-12 place-items-center rounded-lg border border-black/10 bg-white text-lg text-black transition-transform duration-300 hover:-translate-y-1"
              >
                <i className={`bi ${icon}`}></i>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
