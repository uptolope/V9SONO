import Link from "next/link";
import { questionBanks } from "@/lib/products";

export function InternalLinks({ current }: { current: string }) {
  const links = questionBanks.map((p) => ({
    href: `/${p.slug}`,
    label: p.shortName,
  }));

  const filtered = links.filter((l) => l.href !== current);
  if (filtered.length === 0) return null;

  return (
    <div className="mt-14 border-t border-white/5 pt-8">
      <h3 className="meta text-[9px] text-[#4a453f] mb-4">
        RELATED QUESTION BANKS
      </h3>
      <div className="flex gap-5 flex-wrap">
        {filtered.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="body-readable text-sm text-[#8a8279] hover:text-[#c85b3a] transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-[#c85b3a]/40"
          >
            {l.label} Questions →
          </Link>
        ))}
      </div>
    </div>
  );
}
