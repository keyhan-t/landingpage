import { useEffect, useState } from "react";

// عددی که از صفر شروع می‌کنه و تا عدد نهایی بالا می‌ره
// مثال: <CountUp end={200} suffix="+" delay={2800} />
export default function CountUp({ end, suffix = "", delay = 0 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let counter; // تایمر شمارنده

    // اول به اندازه‌ی delay صبر می‌کنیم (تا لودینگ تموم شه)
    const waiter = setTimeout(() => {
      let current = 0;
      const step = Math.ceil(end / 60); // هر بار چقدر زیاد بشه

      counter = setInterval(() => {
        current = current + step;
        if (current >= end) {
          current = end;
          clearInterval(counter); // به عدد آخر رسیدیم، تایمر رو بس کن
        }
        setValue(current);
      }, 30); // هر ۳۰ میلی‌ثانیه
    }, delay);

    // پاکسازی تایمرها وقتی کامپوننت حذف شد
    return () => {
      clearTimeout(waiter);
      clearInterval(counter);
    };
  }, [end, delay]);

  // toLocaleString("fa-IR") یعنی 2000 رو بنویسه ۲٬۰۰۰ (با رقم فارسی)
  return (
    <span>
      {value.toLocaleString("fa-IR")}
      {suffix}
    </span>
  );
}
