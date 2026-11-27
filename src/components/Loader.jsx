import { useEffect, useState } from "react";

// Lightweight Bloom brand intro: CSS-driven motion, no frame-by-frame React updates.
export default function Loader({ onFinish }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const leaveTimer = window.setTimeout(() => setLeaving(true), 2350);
    const finishTimer = window.setTimeout(() => onFinish?.(), 2950);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
      document.body.style.overflow = "";
    };
  }, [onFinish]);

  return (
    <div
      className={`bloom-loader fixed inset-0 z-[100] grid place-items-center bg-[#fbfaff] transition-opacity duration-500 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-label="در حال بارگذاری فروشگاه بلوم"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center px-6 text-center">
        <div className="bloom-loader-mark relative mb-5 grid size-32 place-items-center sm:size-36">
          <div className="bloom-loader-orbit absolute inset-1 rounded-full border border-violet-200" />
          <svg viewBox="0 0 120 120" className="relative size-24 sm:size-28" fill="none" aria-hidden="true">
            <g className="bloom-petal bloom-petal-1" fill="#7C3AED">
              <path d="M60 59 C43 47 42 27 60 12 C78 27 77 47 60 59Z" />
            </g>
            <g className="bloom-petal bloom-petal-2" fill="#8B5CF6" transform="rotate(72 60 60)">
              <path d="M60 59 C43 47 42 27 60 12 C78 27 77 47 60 59Z" />
            </g>
            <g className="bloom-petal bloom-petal-3" fill="#A78BFA" transform="rotate(144 60 60)">
              <path d="M60 59 C43 47 42 27 60 12 C78 27 77 47 60 59Z" />
            </g>
            <g className="bloom-petal bloom-petal-4" fill="#8B5CF6" transform="rotate(216 60 60)">
              <path d="M60 59 C43 47 42 27 60 12 C78 27 77 47 60 59Z" />
            </g>
            <g className="bloom-petal bloom-petal-5" fill="#7C3AED" transform="rotate(288 60 60)">
              <path d="M60 59 C43 47 42 27 60 12 C78 27 77 47 60 59Z" />
            </g>
            <circle cx="60" cy="60" r="7" fill="#5B21B6" />
          </svg>
        </div>

        <div className="bloom-loader-wordmark" dir="ltr">Bloom<span>.</span></div>
        <p className="mt-2 text-xs font-medium tracking-[0.22em] text-gray-400" dir="ltr">
          FASHION · STYLE · YOU
        </p>

        <div className="mt-9 h-1.5 w-52 overflow-hidden rounded-full bg-violet-100 sm:w-60">
          <div className="bloom-loader-progress h-full w-full origin-right rounded-full bg-gradient-to-l from-violet-500 to-fuchsia-400" />
        </div>
        <p className="mt-3 text-xs text-gray-500">در حال آماده‌سازی فروشگاه...</p>
      </div>
    </div>
  );
}
