// ستاره‌ی ۴ پر که برای تزئین استفاده می‌شه
export default function Sparkle({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M50 0 C54 30 70 46 100 50 C70 54 54 70 50 100 C46 70 30 54 0 50 C30 46 46 30 50 0Z"
      />
    </svg>
  );
}
