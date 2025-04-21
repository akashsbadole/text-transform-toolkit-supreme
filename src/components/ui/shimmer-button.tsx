import * as React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  ({ className, children, shimmerColor = "#ffffff", shimmerSize = "md", icon, variant = "primary", ...props }, ref) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg"
    };

    const variantClasses = {
      primary: "bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800",
      secondary: "bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700",
      ghost: "bg-slate-800/30 hover:bg-slate-700/40"
    };

    return (
      <button
        ref={ref}
        className={cn(
          "relative group overflow-hidden rounded-lg transition-all duration-300",
          "backdrop-blur-sm border border-white/10",
          "hover:border-white/20 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
          "active:scale-100",
          sizeClasses[shimmerSize],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {/* Shimmer effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${shimmerColor}40, transparent)`,
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite ease-in-out"
          }}
        />

        {/* Content wrapper */}
        <div className="relative flex items-center justify-center gap-2 z-10">
          {icon && <span className="text-lg transform group-hover:scale-110 transition-transform duration-300">{icon}</span>}
          <span className="transform group-hover:scale-105 transition-transform duration-300">{children}</span>
        </div>

        {/* Inner glow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-all duration-500 blur-md"
          style={{
            background: `radial-gradient(circle at center, ${shimmerColor}20 0%, transparent 70%)`
          }}
        />

        {/* Border glow effect */}
        <div
          className="absolute -inset-px opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-sm rounded-lg"
          style={{
            background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`
          }}
        />
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };

// Add the shimmer animation to your global CSS
const shimmerStyles = document.createElement("style");
shimmerStyles.textContent = `
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
document.head.appendChild(shimmerStyles); 