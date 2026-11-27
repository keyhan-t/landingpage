// نوار مشکی که اسم برندها توش بی‌نهایت می‌چرخه
const brands = ["VERSACE", "ZARA", "GUCCI", "PRADA", "CALVIN KLEIN"];

export default function Marquee() {
  // لیست رو ۴ بار پشت هم تکرار می‌کنیم تا وقتی نصفش (۵۰٪) حرکت کرد، دوباره از اول شروع بشه
  // و کاربر هیچ پرشی نبینه
  const items = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="overflow-hidden bg-black py-5 sm:py-7">
      <div className="animate-marquee flex w-max">
        {items.map((brand, index) => (
          <div key={index} className="flex items-center">
            <span className="font-archivo px-6 text-2xl text-white sm:px-10 sm:text-4xl">
              {brand}
            </span>
            <i className="bi bi-stars text-lg text-blue-500 sm:text-2xl"></i>
          </div>
        ))}
      </div>
    </div>
  );
}
