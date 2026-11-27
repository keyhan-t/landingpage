import { useState } from "react";

// پنجره‌ی نوشتن نظر
//   open     = باز باشه یا نه
//   onClose  = تابعی که پنجره رو می‌بنده
//   onSubmit = تابعی که نظر جدید رو می‌گیره
export default function ReviewModal({ open, onClose, onSubmit }) {
  const [rating, setRating] = useState(0); // ستاره‌ی انتخاب‌شده
  const [hover, setHover] = useState(0); // ستاره‌ای که ماوس روشه
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  // اگه باز نیست، هیچی نشون نده
  if (!open) return null;

  function handleSubmit(event) {
    event.preventDefault(); // جلوگیری از رفرش صفحه

    // بررسی فیلدها
    if (rating === 0) {
      setError("لطفاً امتیاز ستاره‌ای را انتخاب کنید.");
      return;
    }
    if (name.trim() === "") {
      setError("لطفاً نام خود را وارد کنید.");
      return;
    }
    if (text.trim().length < 10) {
      setError("نظر شما باید حداقل ۱۰ حرف باشد.");
      return;
    }

    // همه‌چیز درسته: نظر رو بفرست و فرم رو خالی کن
    onSubmit({ name: name.trim(), rating: rating, text: text.trim() });
    setRating(0);
    setName("");
    setText("");
    setError("");
  }

  // اگه ماوس روی یه ستاره باشه همون رو نشون بده، وگرنه ستاره‌ی انتخاب‌شده رو
  const shownStars = hover || rating;

  // استایل مشترک اینپوت‌ها
  const fieldStyle =
    "w-full rounded-xl bg-gray-100 px-4 py-3 outline-none ring-2 ring-transparent transition focus:bg-white focus:ring-blue-600";

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-4">
      {/* پس‌زمینه‌ی تیره (با کلیک روش پنجره بسته می‌شه) */}
      <div className="animate-fade absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="animate-modal relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:max-w-lg sm:rounded-3xl sm:p-8"
      >
        {/* دکمه‌ی بستن */}
        <button
          type="button"
          onClick={onClose}
          aria-label="بستن"
          className="absolute end-4 top-4 grid size-9 place-items-center rounded-full transition hover:rotate-90 hover:bg-gray-100"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <h3 className="font-archivo text-2xl sm:text-3xl">ثبت نظر</h3>
        <span className="mt-3 block h-1 w-16 rounded-full bg-blue-600" />

        {/* انتخاب ستاره */}
        <div className="mt-6 flex items-center gap-1.5 text-3xl text-yellow-500">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              aria-label={`${n} ستاره`}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(n)}
              className="transition-transform duration-200 hover:scale-125 active:scale-90"
            >
              <i className={n <= shownStars ? "bi bi-star-fill" : "bi bi-star"}></i>
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="نام شما"
            className={fieldStyle}
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="نظرتان درباره‌ی این محصول را بنویسید…"
            rows={4}
            className={`${fieldStyle} resize-none`}
          />
        </div>

        {/* پیام خطا */}
        <p className="mt-3 min-h-5 text-sm text-red-500">{error}</p>

        <button
          type="submit"
          className="group relative mt-2 h-12 w-full overflow-hidden rounded-full bg-black font-medium text-white transition-transform duration-300 hover:scale-[1.02] active:scale-95"
        >
          <span className="relative z-10">ارسال نظر</span>
          <span className="absolute inset-0 translate-x-full bg-blue-600 transition-transform duration-500 ease-out group-hover:translate-x-0" />
        </button>
      </form>
    </div>
  );
}
