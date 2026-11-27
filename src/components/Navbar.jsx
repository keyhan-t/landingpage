import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

const links = [
  { label: "فروشگاه", to: "/products" },
  { label: "حراج", to: "/products" },
  { label: "تازه‌ها", to: "/products" },
  { label: "دسته‌بندی‌ها", to: "/products" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 w-full border-b border-black/5 transition-colors duration-300 ${scrolled || open ? "bg-white/95 shadow-sm backdrop-blur-lg" : "bg-white"}`}>
      <div className="mx-auto flex h-[60px] w-[94%] max-w-7xl items-center justify-between gap-1 sm:h-[72px] sm:w-[92%] lg:w-[88%]">
        <button
          className="grid size-9 shrink-0 place-items-center rounded-full text-[22px] transition hover:bg-gray-100 lg:hidden"
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <i className={open ? "bi bi-x-lg" : "bi bi-list"} />
        </button>

        <Link to="/" className="order-1 flex min-w-0 shrink-0 items-center gap-1.5 font-sans text-[22px] font-black tracking-tight text-gray-950 sm:gap-2 sm:text-3xl" aria-label="Bloom - صفحه اصلی">
          <span className="grid size-7 place-items-center rounded-xl bg-violet-100 text-violet-600 sm:size-9"><i className="bi bi-flower1 text-lg sm:text-2xl" /></span>
          <span>Bloom<span className="text-violet-600">.</span></span>
        </Link>

        <ul className="hidden items-center gap-5 text-sm font-medium xl:gap-7 lg:flex">
          {links.map((link) => <li key={link.label}><Link to={link.to} className="link-underline whitespace-nowrap">{link.label}</Link></li>)}
        </ul>

        <div className="relative hidden max-w-sm flex-1 lg:block">
          <i className="bi bi-search pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="search" placeholder="جستجوی محصولات…" className="h-10 w-full rounded-full bg-gray-100 ps-11 pe-4 text-sm outline-none ring-2 ring-transparent transition focus:bg-white focus:ring-violet-500" />
        </div>

        <div className="order-2 flex shrink-0 items-center gap-0 text-lg sm:gap-1 sm:text-2xl">
          <Link to="/products" aria-label="سبد خرید" className="relative grid size-9 place-items-center rounded-full transition hover:bg-gray-100 sm:size-10"><i className="bi bi-bag" /><span className="absolute end-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-violet-600 text-[9px] font-bold text-white">۲</span></Link>
          <Link to="/profile" aria-label="حساب کاربری" title="حساب کاربری" className="grid size-9 place-items-center rounded-full transition hover:bg-gray-100 sm:size-10"><i className="bi bi-person-circle" /></Link>
        </div>
      </div>

      {open && <div className="border-t border-gray-100 bg-white px-[5%] pb-5 pt-3 shadow-lg lg:hidden">
        <div className="relative mb-3">
          <i className="bi bi-search pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="search" placeholder="جستجوی محصولات…" className="h-11 w-full rounded-full bg-gray-100 ps-11 pe-4 text-sm outline-none focus:ring-2 focus:ring-violet-500" />
        </div>
        <ul className="grid grid-cols-2 gap-2">
          {links.map((link) => <li key={link.label}><Link to={link.to} onClick={() => setOpen(false)} className="flex min-h-11 items-center justify-between rounded-xl bg-gray-50 px-4 text-sm font-medium">{link.label}<i className="bi bi-arrow-left text-gray-400" /></Link></li>)}
          <li><Link to="/profile" onClick={() => setOpen(false)} className="flex min-h-11 items-center justify-between rounded-xl bg-gray-50 px-4 text-sm font-medium">حساب کاربری<i className="bi bi-person text-gray-400" /></Link></li>
        </ul>
      </div>}
    </nav>
  );
}
