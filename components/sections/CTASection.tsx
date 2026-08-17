import Button from "@/components/ui/Button";
import FadeIn from "@/components/shared/FadeIn";

export default function CTASection() {
  return (
    <section className="py-24 sm:py-32 bg-navy relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-brand-indigo/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Ready to build something <span className="text-gradient">extraordinary?</span>
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto">
            Let&apos;s talk about your project. Our team typically responds within 24 hours.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contact" showArrow>
              Get in Touch
            </Button>
            <Button href="/portfolio" variant="secondary" className="!bg-white/5 !text-white !border-white/10 hover:!border-brand-cyan">
              See Our Work
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
