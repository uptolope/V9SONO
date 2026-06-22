interface BadgeProps {
  variant?: "default" | "secondary" | "outline" | "error";
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = "default", className = "", children }: BadgeProps) {
  const variants = {
    default: "bg-[#c85b3a]/15 text-[#c85b3a] border-[#c85b3a]/30",
    secondary: "bg-white/5 text-[#8a8279] border-white/10",
    outline: "bg-transparent text-[#8a8279] border-white/10",
    error: "bg-red-500/15 text-red-400 border-red-500/30",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
