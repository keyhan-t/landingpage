import { testimonials } from "../data/testimonials";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import Slider from "./Slider";
import Stars from "./Stars";

// یک کارت نظر مشتری
function ReviewCard({ item }) {
  return (
    <figure className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-black/10 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-blue-600/40 hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)] sm:p-8">
      {/* علامت نقل‌قول بزرگ و محو پشت کارت */}
      <i className="bi bi-quote pointer-events-none absolute -end-2 -top-4 text-9xl text-gray-100 transition-colors duration-500 group-hover:text-blue-600/10"></i>

      <Stars rating={item.rating} className="text-lg" />

      <figcaption className="relative flex items-center gap-3">
        {/* دایره‌ی مشکی با حرف اول اسم */}
        <span className="grid size-10 place-items-center rounded-full bg-black text-sm font-bold text-white">
          {item.name.charAt(0)}
        </span>
        <span className="flex items-center gap-1.5 text-lg font-bold">
          {item.name}
          <i className="bi bi-patch-check-fill text-base text-blue-600"></i>
        </span>
      </figcaption>

      <blockquote className="relative text-[15px] leading-relaxed text-gray-600">
        «{item.text}»
      </blockquote>
    </figure>
  );
}

// اسلایدر نظرات مشتری‌ها (از همون Slider بالا استفاده می‌کنه)
export default function Testimonials() {
  return (
    <section className="mx-auto mt-20 w-[92%] max-w-7xl sm:mt-28 lg:w-[88%]">
      <SectionTitle>مشتریان راضی ما</SectionTitle>

      <div className="mt-10 sm:mt-14">
        {/* arrowTop: فلش‌ها وسط ارتفاع کارت‌ها باشن */}
        <Slider arrowTop="top-1/2">
          {testimonials.map((item, index) => (
            <Reveal
              key={item.id}
              variant="up"
              delay={(index % 3) * 120}
              className="shrink-0 basis-[88%] snap-start px-2.5 sm:basis-1/2 lg:basis-1/3"
            >
              <ReviewCard item={item} />
            </Reveal>
          ))}
        </Slider>
      </div>
    </section>
  );
}
