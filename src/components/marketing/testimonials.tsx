"use client";

import { motion } from "framer-motion";
import {
  GraduationCap, Users, BookOpen, Award, TrendingUp, Star,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/* ─── Stats ──────────────────────────────────────────────────────── */
const INSTRUCTOR_STATS = [
  { value: "10+ yrs",  label: "Clinical & teaching experience",  icon: Award       },
  { value: "RDMS",     label: "Active ARDMS credential",         icon: GraduationCap },
  { value: "Houston",  label: "Houston International Cardiotech Ultrasound School",  icon: Users },
  { value: "High",     label: "Documented student pass rates",   icon: TrendingUp  },
];

/* ─── Honest proof points ────────────────────────────────────────── */
const PROOF_POINTS = [
  {
    icon: BookOpen,
    title: "These Notes Came from the Classroom",
    body: "SonoPrep was built directly from the study materials and teaching methods developed at Houston International Cardiotech Ultrasound School in Houston, TX. The retired RDMS instructor behind this content watched students walk in overwhelmed by physics — and walk out with their credentials. The material works because it was refined in a real classroom, not assembled by a content team.",
  },
  {
    icon: GraduationCap,
    title: "Written by a Credentialed RDMS Instructor",
    body: "Every flashcard, exam question, and Physics Pearl was written by a retired RDMS sonographer who spent years teaching at the collegiate level. When the content says Doppler angle matters, it's because our instructor drilled that correction in clinical rotations for decades. That depth of context is what separates memorization from understanding.",
  },
  {
    icon: TrendingUp,
    title: "The Proof Is in the Pass Rates",
    body: "SonoPrep is new — but the underlying notes and teaching methodology are not. Students who learned from this same curriculum at Houston International Cardiotech Ultrasound School went on to earn their RDMS, RVT, and RDCS credentials. We're bringing that same rigor directly to you, on your schedule.",
  },
];

/* ─── Component ─────────────────────────────────────────────────── */
export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-transparent via-charcoal/50 to-transparent">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-teal">Instructor Credibility</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">
            Not Fake Reviews — Real Classroom Results
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-cream-dim">
            SonoPrep is honest about being new. Here's what we <em>can</em> show you: 
            the instructor, the methodology, and the track record behind the content.
          </p>
        </motion.div>

        {/* Instructor stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {INSTRUCTOR_STATS.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl border border-border bg-slate p-5 text-center group hover:border-teal/30 transition-colors"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 ring-1 ring-teal/20 mx-auto mb-3">
                <Icon className="h-4 w-4 text-teal" />
              </div>
              <p className="font-display text-xl font-bold text-cream">{value}</p>
              <p className="mt-1 text-xs text-cream-dim/60">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Proof points */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROOF_POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
              className="group relative rounded border border-border bg-slate p-6 transition-all duration-300 hover:border-teal/30 hover:shadow-glow"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mist transition-colors duration-300 group-hover:bg-teal/10 mb-4">
                <p.icon className="h-5 w-5 text-teal" />
              </div>
              <p className="font-display text-sm font-semibold text-cream mb-2">{p.title}</p>
              <p className="text-sm leading-relaxed text-cream-dim">{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* "Your review will be first" CTA — honest early adopter framing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 relative overflow-hidden rounded border border-teal/20 bg-teal/5 px-8 py-10 text-center"
        >
          {/* Decorative star row */}
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-amber/60 fill-amber/20" />
            ))}
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">Early Access</p>
          <h3 className="font-display text-2xl font-bold text-cream mb-3">
            Be Among the First to Pass — and Tell Us About It
          </h3>
          <p className="text-cream-dim max-w-lg mx-auto mb-6">
            Early students get direct access to the instructor and help shape the platform. 
            Pass your SPI, come back, and your story becomes the social proof we build on.
          </p>
          <Button size="lg" asChild className="btn-glow">
            <Link href="/demo">Try It Free — No Card Required</Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
