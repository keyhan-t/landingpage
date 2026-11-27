import casual from "../assets/section1.png";
import formal from "../assets/section3.png";
import party from "../assets/section2.png";
import gym from "../assets/section4.png";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

// کارت‌های سبک لباس
//   span = کارت چند ستون از ۵ ستون رو بگیره (فقط توی صفحه‌های بزرگ‌تر از sm)
//   variant = جهت انیمیشن ورود
const kinds = [
  { name: "روزمره", img: casual, span: "sm:col-span-2", variant: "left" },
  { name: "رسمی", img: formal, span: "sm:col-span-3", variant: "right" },
  { name: "مهمانی", img: party, span: "sm:col-span-3", variant: "left" },
  { name: "ورزشی", img: gym, span: "sm:col-span-2", variant: "right" },
];

export default function Kinds() {
  return (
    <section className="mx-auto mt-20 w-[92%] max-w-7xl rounded-3xl bg-gray-200 px-4 py-12 sm:mt-28 sm:px-8 sm:py-16 lg:w-[88%] lg:px-12 lg:py-20">
      <SectionTitle>انتخاب بر اساس سبک پوشش</SectionTitle>

      <div className="mx-auto mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-5 sm:gap-5 lg:w-[92%]">
        {kinds.map((kind, index) => (
          <Reveal
            key={kind.name}
            variant={kind.variant}
            delay={(index % 2) * 120}
            className={`group relative h-48 cursor-pointer overflow-hidden rounded-2xl bg-white sm:h-56 lg:h-64 ${kind.span}`}
          >
            <img
              src={kind.img}
              alt={kind.name}
              className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
            />
            <span className="absolute start-5 top-4 text-xl font-bold sm:start-6 sm:top-5 sm:text-2xl">
              {kind.name}
            </span>
            {/* دایره‌ی فلش که موقع hover ظاهر می‌شه */}
            <span className="absolute bottom-4 end-4 grid size-11 translate-y-3 place-items-center rounded-full bg-black text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:bg-blue-600 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
              <i className="bi bi-arrow-up-left"></i>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
