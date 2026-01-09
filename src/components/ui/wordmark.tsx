import { cn } from "@/lib/utils";

export const Wordmark = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 180 40"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-auto h-8", className)}
      aria-labelledby="wordmarkTitle"
      role="img"
    >
      <title id="wordmarkTitle">CareSRE Logotype</title>
      <defs>
        <linearGradient id="wordmarkGradient" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
      <text
        fontFamily='"Lexend Deca", sans-serif'
        fontSize="32"
        fontWeight="bold"
        fill="url(#wordmarkGradient)"
        x="0"
        y="30"
      >
        CareSRE
      </text>
    </svg>
  );
};
