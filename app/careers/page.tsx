import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/shared/FadeIn";
import { MapPin, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Professional Techs team — explore open positions.",
};

// Placeholder open position — replace with the real opening.
const positions = [
  { title: "DevOps Engineer", type: "Full-time", location: "Remote" },
];

export default function CareersPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Careers"
          title="Build the future with us"
          description="We're always looking for talented people who care deeply about craft. Explore our open roles below."
        />

        <div className="mt-16 space-y-4 max-w-3xl mx-auto">
          {positions.map((pos, i) => (
            <FadeIn key={pos.title} delay={i * 0.06}>
              <GlowCard className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-ink">{pos.title}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge>
                      <Briefcase className="h-3 w-3 mr-1 inline" /> {pos.type}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-ink/50">
                      <MapPin className="h-3 w-3" /> {pos.location}
                    </span>
                  </div>
                </div>
                <Button href="/contact" variant="secondary">Apply Now</Button>
              </GlowCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
