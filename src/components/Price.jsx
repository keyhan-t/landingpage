import { formatPrice } from "../utils/format";

// قیمت به تومان: عدد فارسی + واحد کوچک‌تر کنارش
//   <Price value={890000} className="text-xl font-semibold" />
export default function Price({ value, className = "", unitClassName = "text-xs sm:text-sm" }) {
  return (
    <span className={className}>
      {formatPrice(value)} <span className={`font-medium ${unitClassName}`}>تومان</span>
    </span>
  );
}
