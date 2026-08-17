export default function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div className="flex w-max animate-marquee gap-16 py-4">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-xl sm:text-2xl font-semibold text-ink/30 whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-base to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-base to-transparent" />
    </div>
  );
}
