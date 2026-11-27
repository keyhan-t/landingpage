import Reveal from "./Reveal";

// تیتر سکشن‌ها (مثلا NEW ARRIVALS) با یه خط آبی زیرش
export default function SectionTitle({ children }) {
  return (
    <Reveal variant="blur" className="flex flex-col items-center gap-4">
      <h2 className="font-archivo text-center text-2xl leading-tight sm:text-4xl lg:text-6xl">
        {children}
      </h2>
      <span className="title-bar block h-1.5 w-24 rounded-full bg-blue-600" />
    </Reveal>
  );
}
