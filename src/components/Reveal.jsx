import { useEffect, useRef, useState } from "react";

// ───────────────────────────────────────────────────────────
// Reveal = "نمایش با انیمیشن موقع اسکرول"
//
// هر چیزی رو بذاری داخلش، وقتی کاربر اسکرول کنه و بهش برسه،
// با انیمیشن ظاهر می‌شه. مثال:
//
//   <Reveal variant="left" delay={200}>
//     <h2>سلام</h2>
//   </Reveal>
//
// variant (نوع انیمیشن): "up" | "down" | "left" | "right" | "zoom" | "blur"
// delay   (تاخیر)       : به میلی‌ثانیه، مثلا 200 یعنی 0.2 ثانیه
// ───────────────────────────────────────────────────────────
export default function Reveal({ variant = "up", delay = 0, className = "", children }) {
  // boxRef یه "اشاره‌گر" به همین div هست تا بتونیم ببینیم کی روی صفحه دیده می‌شه
  const boxRef = useRef(null);

  // show = آیا باید انیمیشن اجرا بشه؟ (اولش نه)
  const [show, setShow] = useState(false);

  useEffect(() => {
    // IntersectionObserver مرورگر بهمون خبر می‌ده وقتی یه المنت وارد صفحه شد
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShow(true); // انیمیشن شروع شه
          observer.disconnect(); // دیگه لازم نیست نگاه کنیم (فقط یک بار)
        }
      },
      { threshold: 0.15 }, // یعنی وقتی ۱۵٪ از المنت دیده شد
    );

    observer.observe(boxRef.current);

    // وقتی کامپوننت حذف شد، نگاه کردن رو متوقف کن
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      data-variant={variant}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${show ? "in-view" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
