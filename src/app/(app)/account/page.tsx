"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  User, Mail, Calendar, Building, Save, Loader2,
  CheckCircle2, CalendarDays, Flame, Trophy, BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ─── localStorage Keys (must match dashboard) ───────────────────── */
const LS_EXAM_DATE   = "sonoprep_exam_date";
const LS_STREAK_CNT  = "sonoprep_streak_count";
const LS_CARDS_SEEN  = "sonoprep_cards_seen";
const LS_EXAM_SCORES = "sonoprep_exam_scores";

/* ─── Helpers ────────────────────────────────────────────────────── */
function getDaysUntil(dateStr: string) {
  const exam  = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  exam.setHours(0, 0, 0, 0);
  return Math.ceil((exam.getTime() - today.getTime()) / 86_400_000);
}

function getLastScore(): number | null {
  try {
    const raw: number[] = JSON.parse(localStorage.getItem(LS_EXAM_SCORES) ?? "[]");
    return raw.length ? raw[raw.length - 1] : null;
  } catch { return null; }
}

/* ─── Stats row ──────────────────────────────────────────────────── */
function StudyStatsRow({
  streak, cardsSeen, lastScore,
}: { streak: number; cardsSeen: number; lastScore: number | null }) {
  const stats = [
    { icon: Flame,     value: streak,                           label: "Day streak",       color: streak > 0 ? "text-amber" : "text-cream-dim/30"    },
    { icon: BookOpen,  value: cardsSeen,                        label: "Cards reviewed",   color: cardsSeen > 0 ? "text-teal" : "text-cream-dim/30"   },
    { icon: Trophy,    value: lastScore != null ? `${lastScore}%` : "—", label: "Last exam score",  color: lastScore != null ? "text-teal" : "text-cream-dim/30" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map(({ icon: Icon, value, label, color }) => (
        <div key={label} className="rounded-xl border border-border/50 bg-white/[0.02] p-4 text-center">
          <Icon className={`h-4 w-4 mx-auto mb-2 ${color}`} />
          <p className="font-display text-xl font-bold text-cream">{value}</p>
          <p className="text-[0.65rem] text-cream-dim/50 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────────────── */
export default function AccountPage() {
  const { data: session } = useSession();

  const [name,        setName]        = useState(session?.user?.name ?? "");
  const [institution, setInstitution] = useState("");
  const [examDate,    setExamDate]    = useState("");
  const [saving,      setSaving]      = useState(false);
  const [saved,       setSaved]       = useState(false);

  // local study stats
  const [streak,    setStreak]    = useState(0);
  const [cardsSeen, setCardsSeen] = useState(0);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [mounted,   setMounted]   = useState(false);

  // Load persisted values on mount
  useEffect(() => {
    setMounted(true);
    const savedDate = localStorage.getItem(LS_EXAM_DATE) ?? "";
    setExamDate(savedDate);
    setInstitution(localStorage.getItem("sonoprep_institution") ?? "");
    setStreak(parseInt(localStorage.getItem(LS_STREAK_CNT) ?? "0", 10));
    setCardsSeen(parseInt(localStorage.getItem(LS_CARDS_SEEN) ?? "0", 10));
    setLastScore(getLastScore());
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Persist exam date and institution to localStorage
    if (examDate) {
      localStorage.setItem(LS_EXAM_DATE, examDate);
    } else {
      localStorage.removeItem(LS_EXAM_DATE);
    }
    if (institution) {
      localStorage.setItem("sonoprep_institution", institution);
    }

    // Fire-and-forget API call for name (non-blocking)
    try {
      await fetch("/api/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, institution, examDate }),
      });
    } catch {
      // Graceful degradation — localStorage is the source of truth for countdown
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  // Days-until preview
  const daysUntil = examDate ? getDaysUntil(examDate) : null;
  const countdownColor =
    daysUntil === null   ? ""               :
    daysUntil <= 7       ? "text-red-400"   :
    daysUntil <= 14      ? "text-amber"     :
    daysUntil <= 30      ? "text-amber/70"  : "text-teal";

  return (
    <div className="space-y-8">

      {/* Header ─────────────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-cream">Account Settings</h1>
        <p className="mt-1 text-sm text-cream-dim/60">
          Manage your profile and exam date — your dashboard countdown updates instantly.
        </p>
      </motion.div>

      {/* Study stats ─────────────────────────────────────────────── */}
      {mounted && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-cream-dim/40 mb-3">Your Progress</p>
          <StudyStatsRow streak={streak} cardsSeen={cardsSeen} lastScore={lastScore} />
        </motion.div>
      )}

      {/* Profile card ────────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-5">

              {/* Email (read-only) */}
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-dim/40" />
                  <Input value={session?.user?.email ?? ""} disabled className="pl-10 opacity-50" />
                </div>
                <p className="font-mono text-[0.65rem] text-cream-dim/40">Email cannot be changed. Contact support for help.</p>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-dim/40" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Institution */}
              <div className="space-y-2">
                <Label htmlFor="institution">Institution / Hospital</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-dim/40" />
                  <Input
                    id="institution"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. Houston International Cardiotech Ultrasound School"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Exam date — the key feature */}
              <div className="space-y-2">
                <Label htmlFor="examDate" className="flex items-center gap-2">
                  Target SPI Exam Date
                  <span className="font-mono text-[0.6rem] text-teal/70 border border-teal/20 rounded px-1.5 py-0.5">
                    Powers your countdown
                  </span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-dim/40" />
                  <Input
                    id="examDate"
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    min={new Date().toISOString().slice(0, 10)}
                    className="pl-10"
                  />
                </div>

                {/* Live preview */}
                {daysUntil !== null && (
                  <div className="flex items-center gap-2 rounded-lg border border-teal/15 bg-teal/[0.03] px-3 py-2">
                    <CalendarDays className="h-3.5 w-3.5 text-teal/50 shrink-0" />
                    <p className="text-xs text-cream-dim/70">
                      Dashboard will show{" "}
                      <span className={`font-bold ${countdownColor}`}>
                        {daysUntil <= 0 ? "exam day!" : `${daysUntil} days`}
                      </span>
                      {daysUntil > 0 && " remaining"} with daily study targets.
                    </p>
                  </div>
                )}
                {!examDate && (
                  <p className="font-mono text-[0.65rem] text-cream-dim/40">
                    Set this to activate the live countdown on your dashboard.
                  </p>
                )}
              </div>

              {/* Save button */}
              <div className="flex items-center gap-3 pt-1">
                <Button type="submit" disabled={saving} className="btn-glow">
                  {saving ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving…</>
                  ) : (
                    <><Save className="mr-2 h-4 w-4" />Save Changes</>
                  )}
                </Button>
                {saved && (
                  <div className="flex items-center gap-1.5 text-teal text-sm">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Saved — countdown updated!</span>
                  </div>
                )}
              </div>

            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Account details ──────────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-cream-dim">Account type</span>
              <Badge>{session?.user?.role ?? "STUDENT"}</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-cream-dim">Support</span>
              <a href="mailto:support@sonoprep.com" className="text-teal hover:text-teal-glow transition-colors">
                support@sonoprep.com
              </a>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-cream-dim">Data storage</span>
              <span className="text-cream-dim/50 text-xs font-mono">Local + encrypted cloud</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
}
