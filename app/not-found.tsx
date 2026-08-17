import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 pt-20">
      <span className="text-7xl font-bold text-gradient">404</span>
      <h1 className="mt-4 text-2xl font-semibold text-ink">Page not found</h1>
      <p className="mt-3 text-ink/60 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button href="/" className="mt-8" showArrow>
        Back to Home
      </Button>
    </section>
  );
}
