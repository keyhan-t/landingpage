// اسلایدر قیمت با دو دسته (حداقل و حداکثر) + دو تا کادر عدد
//   min, max = مقدار فعلی
//   bound    = بیشترین قیمت ممکن (سقف اسلایدر)
//   step     = گام تغییر قیمت (تومان)
//   onChange = تابعی که (min, max) جدید رو می‌گیره
export default function PriceRange({ min, max, bound, step = 1, onChange }) {
  const top = Math.max(bound, 1);

  // جای شروع و پایان نوار آبی (به درصد)
  // نکته: خود اسلایدر همیشه چپ‌به‌راسته (کم ← زیاد)، پس این‌جا left/right واقعی درسته
  const left = (min / top) * 100;
  const right = (max / top) * 100;

  // حداقل هیچ‌وقت از حداکثر بیشتر نشه و برعکس
  function changeMin(value) {
    const number = Math.max(0, Math.min(Number(value), max));
    onChange(number, max);
  }
  function changeMax(value) {
    const number = Math.min(top, Math.max(Number(value), min));
    onChange(min, number);
  }

  const boxStyle =
    "h-11 w-full rounded-xl border border-gray-200 bg-gray-50 ps-3 pe-14 text-sm font-semibold outline-none transition focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100";

  return (
    <div>
      {/* اسلایدر */}
      <div className="dual-range mt-2">
        {/* نوار خاکستری و نوار آبی بین دو دسته */}
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gray-200" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-blue-600"
          style={{ left: `${left}%`, width: `${right - left}%` }}
        />

        <input
          type="range"
          min="0"
          max={top}
          step={step}
          value={min}
          onChange={(e) => changeMin(e.target.value)}
          aria-label="کمترین قیمت"
          // اگه هر دو دسته آخر نوار باشن، دسته‌ی حداقل باید بالاتر باشه تا بشه برش گردوند
          style={{ zIndex: min > top / 2 ? 5 : 3 }}
        />
        <input
          type="range"
          min="0"
          max={top}
          step={step}
          value={max}
          onChange={(e) => changeMax(e.target.value)}
          aria-label="بیشترین قیمت"
          style={{ zIndex: 4 }}
        />
      </div>

      {/* کادرهای عدد */}
      <div className="mt-4 flex items-center gap-3">
        <label className="relative block flex-1">
          <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            تومان
          </span>
          <input
            type="number"
            min="0"
            max={top}
            step={step}
            value={min}
            onChange={(e) => changeMin(e.target.value)}
            aria-label="مقدار کمترین قیمت"
            className={boxStyle}
          />
        </label>
        <span className="text-gray-300">—</span>
        <label className="relative block flex-1">
          <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            تومان
          </span>
          <input
            type="number"
            min="0"
            max={top}
            step={step}
            value={max}
            onChange={(e) => changeMax(e.target.value)}
            aria-label="مقدار بیشترین قیمت"
            className={boxStyle}
          />
        </label>
      </div>
    </div>
  );
}
