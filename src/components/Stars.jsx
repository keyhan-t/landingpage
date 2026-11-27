import { formatRating } from "../utils/format";

// نمایش ستاره‌ها. مثلا rating={4.5} یعنی ۴ ستاره‌ی پر و یک نیمه‌پر
export default function Stars({ rating, className = "text-base", showValue = false }) {
  const numbers = [1, 2, 3, 4, 5];

  return (
    <div className={`flex items-center gap-1 text-yellow-500 ${className}`}>
      {numbers.map((n) => {
        // برای هر ستاره تصمیم می‌گیریم پر باشه، نیمه باشه یا خالی
        let icon = "bi-star"; // خالی
        if (rating >= n) {
          icon = "bi-star-fill"; // پر
        } else if (rating >= n - 0.5) {
          icon = "bi-star-half"; // نیمه
        }
        // نیم‌ستاره‌ی bootstrap-icons از چپ پره؛ توی راست‌چین باید از راست پر باشه، پس برعکسش می‌کنیم
        const flip = icon === "bi-star-half" ? " -scale-x-100" : "";
        return <i key={n} className={`bi ${icon}${flip}`}></i>;
      })}

      {showValue && (
        <span className="ms-2 text-sm text-black sm:text-base">{formatRating(rating)} از ۵</span>
      )}
    </div>
  );
}
