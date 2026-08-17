import Marquee from "@/components/shared/Marquee";

const clients = [
  "NovaBank", "Orbit Logistics", "Verve Retail", "Pulse Analytics",
  "Skyline Group", "Meridian Health", "Atlas Robotics", "Zenith Capital",
];

export default function ClientLogos() {
  return (
    <section className="py-16 border-y border-surface-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-ink/40 uppercase tracking-wider mb-8">
          Trusted by innovative companies worldwide
        </p>
        <Marquee items={clients} />
      </div>
    </section>
  );
}
