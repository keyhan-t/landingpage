import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

import ScrollProgress from "./ScrollProgress";
import BackToTop from "./BackToTop";
import Navbar from "./Navbar";
import Footer from "./Footer";

// قالب مشترک همه‌ی صفحه‌ها: Navbar بالا، Footer پایین، و صفحه‌ی فعلی وسط (Outlet)
export default function Layout() {
  // pathname = آدرس فعلی صفحه (مثلا "/products")
  const { pathname } = useLocation();

  // هر وقت آدرس عوض شد (یعنی رفتیم صفحه‌ی دیگه)، بپر بالای صفحه
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
