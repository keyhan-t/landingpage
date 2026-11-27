import { useEffect, useState } from "react";

// نوار آبی باریک بالای صفحه که نشون می‌ده چقدر اسکرول کردی
export default function ScrollProgress() {
  const [percent, setPercent] = useState(0); // ۰ تا ۱۰۰

  useEffect(() => {
    function handleScroll() {
      // کل ارتفاعی که می‌شه اسکرول کرد
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      // window.scrollY = الان چقدر اسکرول شده
      if (scrollable > 0) {
        setPercent((window.scrollY / scrollable) * 100);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1">
      <div className="h-full bg-blue-600" style={{ width: `${percent}%` }} />
    </div>
  );
}
