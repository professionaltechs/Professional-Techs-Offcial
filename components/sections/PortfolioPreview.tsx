import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/shared/FadeIn";
import Button from "@/components/ui/Button";

export default function PortfolioPreview() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Work"
          title="Selected projects we're proud of"
          description="A glimpse into the products we've engineered for clients across the globe."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(0, 4).map((project, i) => (
            <FadeIn key={project.slug} delay={i * 0.08}>
              <Link href={`/portfolio/${project.slug}`}>
                <GlowCard className="h-full group cursor-pointer">
                  <div className="relative aspect-video rounded-2xl bg-brand-gradient-soft mb-6 overflow-hidden">
                    {project.video ? (
                      <video
                        src={project.video}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <Image
                        src={project.coverImage as string}
                        alt={`${project.title} interface preview`}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    )}
                  </div>
                  <Badge>{project.category}</Badge>
                  <h3 className="mt-4 text-xl font-semibold text-ink group-hover:text-brand-indigo transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink/60">{project.shortDescription}</p>
                </GlowCard>
              </Link>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/portfolio" variant="secondary" showArrow>
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
