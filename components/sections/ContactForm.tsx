"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Button from "@/components/ui/Button";
import GlowCard from "@/components/ui/GlowCard";
import { CheckCircle2, AlertCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Please enter a subject"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to send message.");
      }
      setSubmitted(true);
      reset();
    } catch (err: any) {
      setServerError(err?.message || "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <GlowCard className="text-center py-16">
        <CheckCircle2 className="h-12 w-12 text-brand-indigo mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-ink">Message sent!</h3>
        <p className="mt-2 text-ink/60">We&apos;ll get back to you within 24 hours.</p>
        <Button className="mt-6" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </GlowCard>
    );
  }

  return (
    <GlowCard>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-ink/70">Full Name</label>
            <input
              {...register("name")}
              className="mt-2 w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-indigo transition-colors"
              placeholder="John Doe"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-ink/70">Email</label>
            <input
              {...register("email")}
              className="mt-2 w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-indigo transition-colors"
              placeholder="john@company.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-ink/70">Phone (optional)</label>
          <input
            {...register("phone")}
            className="mt-2 w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-indigo transition-colors"
            placeholder="03XX XXXXXXX"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-ink/70">Subject</label>
          <input
            {...register("subject")}
            className="mt-2 w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-indigo transition-colors"
            placeholder="Project inquiry"
          />
          {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-ink/70">Message</label>
          <textarea
            {...register("message")}
            rows={5}
            className="mt-2 w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-indigo transition-colors resize-none"
            placeholder="Tell us about your project..."
          />
          {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
        </div>

        {serverError && (
          <p className="flex items-center gap-2 text-sm text-red-500">
            <AlertCircle className="h-4 w-4 shrink-0" /> {serverError}
          </p>
        )}

        <Button type="submit" className="w-full justify-center" showArrow>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </GlowCard>
  );
}
