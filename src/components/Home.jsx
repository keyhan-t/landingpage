import Header from "./Header";
import Marquee from "./Marquee";
import Sells from "./Sells";
import Kinds from "./Kinds";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";

export default function Home() {
  return (
    <>
      <Header />
      <Marquee />
      <Sells />
      <Kinds />
      <Testimonials />
      <Newsletter />
    </>
  );
}