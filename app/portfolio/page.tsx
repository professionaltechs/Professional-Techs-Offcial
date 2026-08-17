import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/shared/FadeIn";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore projects delivered by Professional Techs across web development and SEO.",
};

const webProjects = projects.filter((p) => p.category === "Web Development");
const seoProjects = projects.filter((p) => p.category === "SEO");
const aiProjects = projects.filter((p) => p.category === "AI / ML");

function ProjectGrid({ items }: { items: typeof projects }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((project, i) => (
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
              <div className="flex items-center justify-between">
                <Badge>{project.category}</Badge>
                <span className="text-xs text-ink/40">{project.year}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-ink group-hover:text-brand-indigo transition-colors">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-ink/60">{project.shortDescription}</p>
            </GlowCard>
          </Link>
        </FadeIn>
      ))}
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <div className="pt-32 pb-24">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected work"
          description="A showcase of products we've designed and engineered for clients around the world."
        />
      </section>

      {webProjects.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
          <h2 className="text-2xl font-semibold text-ink mb-8">Web Development</h2>
          <ProjectGrid items={webProjects} />
        </section>
      )}

      {seoProjects.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
          <h2 className="text-2xl font-semibold text-ink mb-8">SEO</h2>
          <ProjectGrid items={seoProjects} />
        </section>
      )}

      {aiProjects.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-ink mb-8">AI / ML</h2>
          <ProjectGrid items={aiProjects} />
        </section>
      )}
    </div>
  );
}
