import { useEffect, useState } from "react";

// پایان فروش ویژه = یکشنبه‌ی همین هفته ساعت ۲۳:۵۹:۵۹
function getSaleEnd() {
  const today = new Date();
  const daysToSunday = (7 - today.getDay()) % 7; // getDay: یکشنبه = 0
  const end = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + daysToSunday,
    23,
    59,
    59,
  );
  return end.getTime();
}

// عدد تک‌رقمی رو دو رقمی می‌کنه: 5 → "05"
function pad(number) {
  // "۰۵" رو با رقم فارسی می‌سازه (toFa به‌تنهایی صفر اول رو حذف می‌کرد)
  return String(number).padStart(2, "0").replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

// شمارش معکوس روز / ساعت / دقیقه / ثانیه
export default function Countdown() {
  const [end] = useState(getSaleEnd); // فقط یک بار محاسبه می‌شه
  const [now, setNow] = useState(() => Date.now());

  // هر ثانیه ساعت رو آپدیت کن
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // چند ثانیه مونده؟
  const diff = Math.max(0, Math.floor((end - now) / 1000));

  const parts = [
    { label: "روز", value: Math.floor(diff / 86400) },
    { label: "ساعت", value: Math.floor((diff % 86400) / 3600) },
    { label: "دقیقه", value: Math.floor((diff % 3600) / 60) },
    { label: "ثانیه", value: diff % 60 },
  ];

  return (
    <div className="flex gap-2 sm:gap-3">
      {parts.map((part) => (
        <div key={part.label} className="flex flex-col items-center gap-1.5">
          <div className="grid size-14 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur sm:size-16">
            {/* key={part.value}: وقتی عدد عوض شد، انیمیشن pop دوباره اجرا می‌شه */}
            <span
              key={part.value}
              className="animate-pop font-archivo text-2xl tabular-nums sm:text-3xl"
            >
              {pad(part.value)}
            </span>
          </div>
          <span className="text-[10px] text-white/50">{part.label}</span>
        </div>
      ))}
    </div>
  );
}
