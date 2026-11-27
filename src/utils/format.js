// ───────────────────────────────────────────────────────────
// ابزارهای نمایش عدد و تاریخ به فارسی
// ───────────────────────────────────────────────────────────

// عدد رو با رقم‌های فارسی و جداکننده‌ی هزارگان می‌نویسه: 1250000 → "۱٬۲۵۰٬۰۰۰"
export function toFa(value) {
  return Number(value).toLocaleString("fa-IR");
}

// قیمت (به تومان) بدون واحد: 890000 → "۸۹۰٬۰۰۰"
// واحد "تومان" رو کامپوننت Price کنارش می‌ذاره
export function formatPrice(value) {
  return toFa(Math.round(value));
}

// امتیاز با یه رقم اعشار فارسی: 4.5 → "۴٫۵" ، 5 → "۵"
export function formatRating(value) {
  return Number(value).toLocaleString("fa-IR", { maximumFractionDigits: 1 });
}

// دسته‌بندی همون‌طور که API می‌ده نمایش داده می‌شه (فارسیه، نیازی به تبدیل نیست)
export function formatCategory(value) {
  return value;
}

// تاریخ "2026-08-23" رو به تاریخ شمسی تبدیل می‌کنه: «۱ شهریور ۱۴۰۵»
export function formatDate(date) {
  return new Date(date).toLocaleDateString("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

// سال شمسی فعلی (برای فوتر)
export function currentJalaliYear() {
  return new Date().toLocaleDateString("fa-IR", { year: "numeric" });
}

// آیا این دسته‌بندی پوشاکه؟ (رنگ و سایز فقط برای پوشاک نشون داده می‌شه)
export function isClothingCategory(category) {
  if (!category) return true;
  return /clothing|پوشاک|لباس/i.test(category);
}
