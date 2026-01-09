import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 248 58"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-auto h-8", className)}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" style={{ stopColor: "hsl(200, 85%, 50%)" }} />
          <stop offset="100%" style={{ stopColor: "hsl(140, 65%, 55%)" }} />
        </linearGradient>
      </defs>
      
      {/* Icon */}
      <g transform="translate(0, 4)">
        <path
          d="M48.5,23.5 C48.5,36.91 37.41,48 24.5,48 C11.59,48 0.5,36.91 0.5,23.5 C0.5,10.09 11.59,-1 24.5,-1 C37.41,-1 48.5,10.09 48.5,23.5 Z"
          fill="hsl(200, 85%, 50%)"
          stroke="hsl(200, 85%, 45%)"
          strokeWidth="1"
        />
        <path
          d="M24.5 13.5 L24.5 33.5 M14.5 23.5 L34.5 23.5"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        <path
          d="M10,4.5 C20,1, 40,1, 50,4.5"
          stroke="url(#logo-gradient)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="50" cy="4.5" r="2" fill="hsl(140, 65%, 55%)" />
        <circle cx="9.5" cy="4.5" r="2" fill="hsl(200, 85%, 50%)" />
        
        <path
          d="M4,12 C18,6, 42,6, 56,12"
          stroke="url(#logo-gradient)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
         <circle cx="56" cy="12" r="2" fill="hsl(140, 65%, 55%)" />
         <circle cx="4" cy="12" r="2" fill="hsl(200, 85%, 50%)" />

        <path
          d="M2,23.5 C15,15, 45,15, 60,23.5"
          stroke="url(#logo-gradient)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="60" cy="23.5" r="2" fill="hsl(140, 65%, 55%)" />
        <circle cx="2" cy="23.5" r="2" fill="hsl(200, 85%, 50%)" />
      </g>
      
      {/* Text */}
      <text
        x="70"
        y="38"
        fontFamily="'Lexend Deca', sans-serif"
        fontSize="36"
        fontWeight="700"
        fill="hsl(210, 70%, 45%)"
      >
        Care
      </text>
      <text
        x="165"
        y="38"
        fontFamily="'Lexend Deca', sans-serif"
        fontSize="36"
        fontWeight="700"
        fill="hsl(140, 55%, 50%)"
      >
        SRE
      </text>
    </svg>
  );
};