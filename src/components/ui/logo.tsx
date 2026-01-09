import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-auto h-8", className)}
      aria-labelledby="logoTitle"
      role="img"
    >
        <title id="logoTitle">CareSRE Logo</title>
        <defs>
            <linearGradient id="arcGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--accent))" />
                <stop offset="100%" stopColor="hsl(180, 60%, 45%)" />
            </linearGradient>
        </defs>

        {/* Arcs */}
        <path d="M28 2 C 10 12, 2 32, 10 54" stroke="url(#arcGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="28" cy="2" r="2" fill="hsl(180, 60%, 45%)" />
        <circle cx="22" cy="12" r="1.5" fill="hsl(180, 60%, 45%)" />
        <circle cx="15" cy="25" r="1.5" fill="hsl(var(--accent))" />
        <circle cx="10" cy="54" r="2" fill="hsl(var(--accent))" />
        
        {/* Green swoosh */}
        <path d="M18 58 C 30 64, 50 62, 60 52" stroke="hsl(var(--accent))" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="18" cy="58" r="2" fill="hsl(var(--accent))" />


        {/* Shield */}
        <path d="M32 8 C 54 8, 58 18, 58 32 C 58 46, 54 56, 32 56 C 10 56, 6 46, 6 32 C 6 18, 10 8, 32 8 Z" fill="hsl(var(--primary))" transform="translate(4, 0)" />
        
        {/* Plus icon */}
        <path d="M36 22 L 36 42" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <path d="M26 32 L 46 32" stroke="white" strokeWidth="5" strokeLinecap="round" />

    </svg>
  );
};
