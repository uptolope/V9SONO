import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FounderSection } from "@/components/marketing/founder-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, BookOpen, Award, Stethoscope, GraduationCap, Heart, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SonoPrep — built by practicing sonographers to help you pass the ARDMS SPI exam.",
};

const VALUES = [
  {
    icon: Target,
    title: "Mission-Driven",
    desc: "We exist to help sonography students pass the SPI exam — the mandatory gateway to RDMS, RDCS, RVT, and RMSKS credentials. Every feature serves that mission.",
  },
  {
    icon: Users,
    title: "Built by Experts",
    desc: "Our content is created by credentialed, practicing sonographers who know the exam inside out.",
  },
  {
    icon: BookOpen,
    title: "Science-Based",
    desc: "SM-2 spaced repetition, ARDMS domain weighting, and evidence-based pedagogy power every product.",
  },
  {
    icon: Award,
    title: "Results First",
    desc: "Every product maps directly to the ARDMS exam blueprint. We measure success by your success.",
  },
];

const CREDENTIALS = [
  { icon: Stethoscope, text: "Registered Diagnostic Cardiac Sonographer (RDCS)" },
  { icon: GraduationCap, text: "10+ years teaching Adult Echocardiography" },
  { icon: Heart, text: "Practicing clinical sonographer" },
  { icon: Clock, text: "SonoPrep founder & curriculum designer" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Hero */}
          <div className="text-center">
            <Badge className="mb-4">Our Story</Badge>
            <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl">
              About SonoPrep
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-cream-dim">
              We&apos;re sonographers who were frustrated by the lack of
              quality SPI exam prep. So we built what we wished existed.
            </p>
          </div>

          {/* Instructor Section */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <p className="font-mono text-xs uppercase tracking-widest text-teal">
                Meet Your Instructor
              </p>
            </div>

            <div className="relative rounded-2xl border border-border bg-slate overflow-hidden">
              {/* Subtle gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal via-cobalt to-teal" />

              <div className="grid gap-0 lg:grid-cols-5">
                {/* Photo */}
                <div className="lg:col-span-2 relative">
                  <div className="aspect-[4/5] lg:aspect-auto lg:h-full relative">
                    <Image
                      src="/instructor.jpg"
                      alt="Olajide Labiyi, RDCS — SonoPrep Founder"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                    />
                    {/* Overlay gradient for text readability on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-slate/20" />
                  </div>
                </div>

                {/* Bio */}
                <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="h-2 w-2 rounded-full bg-teal animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-widest text-teal">
                      Founder & Lead Educator
                    </span>
                  </div>

                  <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">
                    Olajide Labiyi
                    <span className="block text-lg font-normal text-teal mt-1">RDCS</span>
                  </h2>

                  <div className="mt-6 space-y-4 text-sm leading-relaxed text-cream-dim">
                    <p>
                      I&apos;ve spent over a decade in the echo lab — scanning patients,
                      training students, and watching talented sonographers struggle
                      with an exam that doesn&apos;t reflect how hard they&apos;ve worked.
                    </p>
                    <p>
                      The SPI exam is a specific challenge. It tests physics concepts
                      that many programs gloss over, and most study materials treat it
                      like an afterthought. I built SonoPrep because I kept seeing
                      the same gap: students who were excellent clinically but
                      under-prepared for the way the ARDMS actually tests this content.
                    </p>
                    <p>
                      Every flashcard, exam question, and physics pearl in SonoPrep
                      comes from real teaching experience — the mistakes I&apos;ve seen
                      students make, the concepts that trip people up, and the
                      explanations that actually make things click.
                    </p>
                    <p className="text-cream font-medium">
                      My goal isn&apos;t just to help you pass an exam. It&apos;s to make
                      sure you walk into your career with the confidence and
                      understanding that sets you apart.
                    </p>
                  </div>

                  {/* Credentials */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CREDENTIALS.map((cred) => (
                      <div
                        key={cred.text}
                        className="flex items-center gap-3 rounded-lg border border-teal/30 bg-teal/5 px-4 py-3.5"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal/15">
                          <cred.icon className="h-3.5 w-3.5 text-teal" />
                        </div>
                        <span className="text-sm font-medium text-cream">{cred.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values grid */}
          <div className="mt-24 grid gap-6 sm:grid-cols-2">
            {VALUES.map((v) => (
              <Card key={v.title} className="hover:border-teal/40 transition-colors">
                <CardContent className="flex gap-4 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist">
                    <v.icon className="h-5 w-5 text-teal" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-cream">
                      {v.title}
                    </h3>
                    <p className="mt-1 text-sm text-cream-dim">{v.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <FounderSection />
        </div>
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
