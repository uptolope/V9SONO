"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap, BookOpen, Lightbulb, FileText,
  ArrowRight, TrendingUp, Target, Flame, Zap,
  CalendarDays, Trophy, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ─── localStorage Keys ──────────────────────────────────────────── */
const LS_EXAM_DATE   = "sonoprep_exam_date";
const LS_STREAK_DATE = "sonoprep_streak_date";
const LS_STREAK_CNT  = "sonoprep_streak_count";
const LS_CARDS_SEEN  = "sonoprep_cards_seen";
const LS_EXAM_SCORES = "sonoprep_exam_scores";

/* ─── Content Data ───────────────────────────────────────────────── */
const STUDY_TOOLS = [
  { href: "/exam",       title: "Exam Simulator",  desc: "110 ARDMS-weighted questions",   icon: GraduationCap, badge: "Full Exam",   stat: "110 Q"      },
  { href: "/flashcards", title: "Flashcards",       desc: "200 spaced-repetition cards",   icon: BookOpen,       badge: "SM-2",        stat: "200 Cards"  },
  { href: "/pearls",     title: "Physics Pearls",   desc: "50 high-yield clinical insights",icon: Lightbulb,      badge: "High Yield",  stat: "50 Pearls"  },
  { href: "/notes",      title: "Study Notes",      desc: "6 complete domain breakdowns",  icon: FileText,       badge: "All Domains", stat: "6 Domains"  },
];

const DOMAINS = [
  { name: "Pulse-Echo & Sound",      pct: 25 },
  { name: "Transducers & Beams",     pct: 20 },
  { name: "Doppler & Hemodynamics",  pct: 22 },
  { name: "Image Formation",         pct: 18 },
  { name: "Artifacts",               pct: 10 },
  { name: "Bioeffects & Safety",     pct: 5  },
];

const TIPS = [
  "Doppler angle > 60° dramatically reduces velocity accuracy — always angle-correct.",
  "Higher frequency = better resolution but less penetration. Pick based on depth.",
  "ALARA: As Low As Reasonably Achievable. Know this for every bioeffects question.",
  "Reverberation artifact: parallel hyperechoic lines at equal intervals from a reflector.",
  "Acoustic impedance mismatch drives reflection — Z = ρ × c.",
  "Axial resolution = SPL / 2. Shorter pulses = better axial resolution.",
  "PRF must be ≥ 2× the Doppler shift to avoid aliasing (Nyquist limit).",
  "Near field length = r² / λ. Larger aperture = longer near field.",
];

/* ─── Helpers ────────────────────────────────────────────────────── */
function getDaysUntil(dateStr: string) {
  const exam  = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  exam.setHours(0, 0, 0, 0);
  return Math.ceil((exam.getTime() - today.getTime()) / 86_400_000);
}

function refreshStreak() {
  if (typeof window === "undefined") return 0;
  const today = new Date().toISOString().slice(0, 10);
  const last  = localStorage.getItem(LS_STREAK_DATE);
  const count = parseInt(localStorage.getItem(LS_STREAK_CNT) ?? "0", 10);
  if (last === today) return count;
  const yest = new Date();
  yest.setDate(yest.getDate() - 1);
  const next = last === yest.toISOString().slice(0, 10) ? count + 1 : 1;
  localStorage.setItem(LS_STREAK_DATE, today);
  localStorage.setItem(LS_STREAK_CNT,  String(next));
  return next;
}

function getLastScore() {
  if (typeof window === "undefined") return null;
  try {
    const raw: number[] = JSON.parse(localStorage.getItem(LS_EXAM_SCORES) ?? "[]");
    return raw.length ? raw[raw.length - 1] : null;
  } catch { return null; }
}

function getCardsSeen() {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(LS_CARDS_SEEN) ?? "0", 10);
}

/* ─── Exam Countdown ─────────────────────────────────────────────── */
function CountdownWidget({ examDate }: { examDate: string }) {
  const days = getDaysUntil(examDate);
  const color =
    days <= 7  ? "text-red-400"  :
    days <= 14 ? "text-amber"    :
    days <= 30 ? "text-amber/70" : "text-teal";

  const label =
    days < 0  ? "Your exam date has passed." :
    days === 0 ? "Exam day — you've got this!" :
    days === 1 ? "1 day until your SPI exam." :
    `${days} days until your SPI exam.`;

  const dailySuggestion =
    days <= 0  ? null :
    days <= 7  ? "4 h/day" :
    days <= 14 ? "2 h/day" :
    days <= 30 ? "1.5 h/day" : "1 h/day";

  const progressPct = Math.min(100, Math.max(0, Math.round(((120 - days) / 120) * 100)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-xl border border-teal/25 bg-gradient-to-br from-teal/[0.07] to-teal/[0.02] p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-teal/70 mb-1">Exam Countdown</p>
          <p className={`font-display text-5xl font-bold leading-none ${color}`}>
            {days < 0 ? "—" : days}
          </p>
          <p className="text-sm text-cream-dim mt-2">{label}</p>

          {days > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-cream-dim/50 mb-1.5">
                <span>Prep timeline</span>
                <span className="font-mono">{progressPct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-teal/50 to-teal"
                />
              </div>
            </div>
          )}
        </div>

        {dailySuggestion && (
          <div className="shrink-0 rounded-xl border border-teal/20 bg-teal/[0.05] px-4 py-3 text-center">
            <CalendarDays className="h-4 w-4 text-teal/40 mx-auto mb-1" />
            <p className="font-mono text-[0.6rem] text-cream-dim/50 mb-0.5">Study target</p>
            <p className="font-display text-xl font-bold text-teal">{dailySuggestion}</p>
          </div>
        )}
      </div>

      {days > 0 && days <= 7 && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber/20 bg-amber/5 px-3 py-2">
          <AlertCircle className="h-3.5 w-3.5 text-amber shrink-0" />
          <p className="text-xs text-amber/90">
            Final stretch — prioritize Doppler &amp; Pulse-Echo (47% of exam). Review artifacts &amp; bioeffects last.
          </p>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Set-date Nudge ─────────────────────────────────────────────── */
function ExamDateNudge() {
  return (
    <div className="rounded-xl border border-dashed border-teal/20 bg-teal/[0.02] p-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <CalendarDays className="h-5 w-5 text-teal/40 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-cream">Set your SPI exam date</p>
          <p className="text-xs text-cream-dim/50">Get a live countdown, daily targets, and last-minute focus tips.</p>
        </div>
      </div>
      <Button size="sm" variant="outline" asChild className="shrink-0 text-teal border-teal/30 hover:border-teal/60">
        <Link href="/account">Set Date →</Link>
      </Button>
    </div>
  );
}

/* ─── Progress Bar ───────────────────────────────────────────────── */
function PersonalStats({ streak, lastScore, cardsSeen }: {
  streak: number; lastScore: number | null; cardsSeen: number;
}) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Streak */}
      <div className="rounded-xl border border-border/50 bg-white/[0.02] p-4 text-center hover:border-amber/20 transition-colors">
        <Flame className={`h-5 w-5 mx-auto mb-2 ${streak > 0 ? "text-amber" : "text-cream-dim/25"}`} />
        <p className="font-display text-2xl font-bold text-cream">{streak}</p>
        <p className="text-[0.65rem] text-cream-dim/50 mt-0.5">Day Streak</p>
        {streak === 0 && (
          <p className="text-[0.6rem] text-cream-dim/30 mt-1">Study today!</p>
        )}
      </div>
      {/* Last Score */}
      <div className="rounded-xl border border-border/50 bg-white/[0.02] p-4 text-center hover:border-teal/20 transition-colors">
        <Trophy className={`h-5 w-5 mx-auto mb-2 ${lastScore !== null ? "text-teal" : "text-cream-dim/25"}`} />
        <p className="font-display text-2xl font-bold text-cream">
          {lastScore !== null ? `${lastScore}%` : "—"}
        </p>
        <p className="text-[0.65rem] text-cream-dim/50 mt-0.5">Last Score</p>
        {lastScore === null && (
          <p className="text-[0.6rem] text-cream-dim/30 mt-1">Take a practice exam</p>
        )}
      </div>
      {/* Cards seen */}
      <div className="rounded-xl border border-border/50 bg-white/[0.02] p-4 text-center hover:border-teal/20 transition-colors">
        <BookOpen className={`h-5 w-5 mx-auto mb-2 ${cardsSeen > 0 ? "text-teal" : "text-cream-dim/25"}`} />
        <p className="font-display text-2xl font-bold text-cream">{cardsSeen}</p>
        <p className="text-[0.65rem] text-cream-dim/50 mt-0.5">Cards Reviewed</p>
        {cardsSeen === 0 && (
          <p className="text-[0.6rem] text-cream-dim/30 mt-1">Start flashcards</p>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────────────── */
export default function DashboardPage() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";
  const tip = TIPS[new Date().getDate() % TIPS.length];

  const [examDate,  setExamDate]  = useState<string | null>(null);
  const [streak,    setStreak]    = useState(0);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [cardsSeen, setCardsSeen] = useState(0);
  const [mounted,   setMounted]   = useState(false);

  useEffect(() => {
    setMounted(true);
    setExamDate(localStorage.getItem(LS_EXAM_DATE));
    setStreak(refreshStreak());
    setLastScore(getLastScore());
    setCardsSeen(getCardsSeen());
  }, []);

  return (
    <div className="space-y-8">

      {/* Greeting ────────────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <p className="font-mono text-xs uppercase tracking-widest text-teal mb-1">Study Portal</p>
        <h1 className="font-display text-3xl font-bold text-cream">Welcome back, {firstName}.</h1>
        <p className="mt-1 text-cream-dim/60 text-sm">Your SPI exam prep continues here.</p>
      </motion.div>

      {/* Countdown / Set-date nudge ──────────────────────────────── */}
      {mounted && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}>
          {examDate ? <CountdownWidget examDate={examDate} /> : <ExamDateNudge />}
        </motion.div>
      )}

      {/* Personal stats ──────────────────────────────────────────── */}
      {mounted && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-mono text-[0.65rem] uppercase tracking-wider text-cream-dim/50">Your Progress</h2>
          </div>
          <PersonalStats streak={streak} lastScore={lastScore} cardsSeen={cardsSeen} />
        </motion.div>
      )}

      {/* Daily Pearl ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }}
        className="rounded-xl border border-teal/20 bg-teal/[0.04] p-5 flex gap-4"
      >
        <div className="rounded-lg bg-teal/10 p-2 ring-1 ring-teal/20 shrink-0 h-fit">
          <Zap className="h-4 w-4 text-teal" />
        </div>
        <div>
          <p className="font-mono text-[0.6rem] uppercase tracking-widest text-teal mb-1">Daily Pearl</p>
          <p className="text-sm text-cream leading-relaxed">{tip}</p>
        </div>
      </motion.div>

      {/* Content inventory ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {[
          { icon: Target,    label: "Practice questions", value: "110", sub: "Exam"    },
          { icon: BookOpen,  label: "Spaced-rep cards",   value: "200", sub: "Cards"   },
          { icon: Lightbulb, label: "Physics Pearls",     value: "50",  sub: "Pearls"  },
          { icon: Flame,     label: "Exam domains",       value: "6",   sub: "Domains" },
        ].map(({ icon: Icon, label, value, sub }) => (
          <div key={sub} className="rounded-xl border border-border/50 bg-white/[0.02] p-5 hover:border-teal/20 transition-colors">
            <div className="flex items-start justify-between">
              <div className="rounded-lg bg-teal/10 p-2 ring-1 ring-teal/20">
                <Icon className="h-4 w-4 text-teal" />
              </div>
              <span className="font-mono text-xs text-cream-dim/40">{sub}</span>
            </div>
            <p className="mt-4 font-display text-2xl font-bold text-cream">{value}</p>
            <p className="mt-1 text-xs text-cream-dim/60">{label}</p>
          </div>
        ))}
      </motion.div>

      {/* Study Tools ─────────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.25 }}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-cream">Study Tools</h2>
          <span className="font-mono text-xs text-cream-dim/40">4 available</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {STUDY_TOOLS.map((tool, i) => (
            <motion.div key={tool.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}>
              <Link
                href={tool.href}
                className="group flex items-center gap-4 rounded-xl border border-border/50 bg-white/[0.02] p-5 transition-all duration-300 hover:border-teal/30 hover:bg-teal/[0.03] hover:shadow-[0_0_24px_rgba(13,148,136,0.06)]"
              >
                <div className="rounded-xl bg-teal/10 p-3 ring-1 ring-teal/20 transition-all group-hover:bg-teal/15 group-hover:ring-teal/30">
                  <tool.icon className="h-5 w-5 text-teal" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-display font-semibold text-cream group-hover:text-teal transition-colors">{tool.title}</p>
                    <Badge variant="outline" className="text-[0.55rem] px-1.5 py-0">{tool.badge}</Badge>
                  </div>
                  <p className="text-xs text-cream-dim/60 mt-0.5">{tool.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-cream-dim/30 shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-teal" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Exam Blueprint ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.35 }}
        className="rounded-xl border border-border/50 bg-white/[0.02] p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-cream">Exam Blueprint</h2>
            <p className="text-xs text-cream-dim/50 mt-0.5">ARDMS SPI domain weights</p>
          </div>
          <TrendingUp className="h-4 w-4 text-cream-dim/30" />
        </div>
        <div className="space-y-4">
          {DOMAINS.map((d) => (
            <div key={d.name}>
              <div className="mb-1.5 flex justify-between text-xs">
                <span className="text-cream/80">{d.name}</span>
                <span className="font-mono text-cream-dim/50">{d.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${d.pct}%` }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-teal/60 to-teal"
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 font-mono text-[0.6rem] text-cream-dim/30">
          Pulse-Echo + Doppler = 47% of the exam. Start here if time is short.
        </p>
      </motion.div>

    </div>
  );
}
