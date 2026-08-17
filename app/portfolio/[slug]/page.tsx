import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/shared/FadeIn";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return { title: project.title, description: project.shortDescription };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex items-center gap-3 mb-6">
            <Badge>{project.category}</Badge>
            <span className="text-sm text-ink/40">{project.year}</span>
          </div>
          <SectionHeading title={project.title} description={project.fullDescription} align="left" />

          <div className="relative aspect-video rounded-3xl bg-brand-gradient-soft my-10 overflow-hidden">
            {project.video ? (
              <video
                src={project.video}
                className="h-full w-full object-cover"
                controls
                playsInline
              />
            ) : (
              <Image
                src={project.coverImage as string}
                alt={`${project.title} interface preview`}
                fill
                className="object-cover object-top"
                unoptimized
              />
            )}
          </div>

          {project.liveUrl && project.liveUrl !== "#" && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand-indigo hover:underline"
            >
              Visit live site →
            </a>
          )}

          <div>
            <h3 className="font-semibold text-ink mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            <Button href="/contact" showArrow>Start a Similar Project</Button>
            <Button href="/portfolio" variant="secondary">Back to Portfolio</Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
