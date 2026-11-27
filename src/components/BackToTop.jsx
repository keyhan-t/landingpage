import { useEffect, useState } from "react";

// دکمه‌ی گرد پایین صفحه که کاربر رو به بالای صفحه برمی‌گردونه
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleScroll() {
      // بعد از ۷۰۰ پیکسل اسکرول، دکمه نشون داده بشه
      setShow(window.scrollY > 700);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // اگه show درست باشه دکمه دیده می‌شه، وگرنه پایین و نامرئیه
  const visibility = show
    ? "translate-y-0 opacity-100"
    : "pointer-events-none translate-y-6 opacity-0";

  return (
    <button
      aria-label="بازگشت به بالای صفحه"
      onClick={goTop}
      className={`fixed bottom-5 end-5 z-40 grid size-12 place-items-center rounded-full bg-black text-white shadow-xl transition-all duration-500 hover:-translate-y-1 hover:bg-blue-600 sm:bottom-8 sm:end-8 ${visibility}`}
    >
      <i className="bi bi-arrow-up text-lg"></i>
    </button>
  );
}
