import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'danger'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-sci-accent)] disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 uppercase tracking-wider"
    
    const variants = {
      default: "bg-[var(--color-sci-surface)] text-[var(--color-sci-accent)] border border-[var(--color-sci-accent)] hover:bg-[var(--color-sci-accent)] hover:text-black shadow-[0_0_10px_rgba(0,229,255,0.2)] hover:shadow-[0_0_15px_rgba(0,229,255,0.6)]",
      outline: "border border-[var(--color-sci-border)] text-[var(--color-sci-text)] hover:border-[var(--color-sci-accent)] hover:text-[var(--color-sci-accent)]",
      ghost: "hover:bg-[var(--color-sci-surface)] text-[var(--color-sci-text-muted)] hover:text-[var(--color-sci-text)]",
      danger: "bg-[var(--color-sci-surface)] text-[var(--color-sci-error)] border border-[var(--color-sci-error)] hover:bg-[var(--color-sci-error)] hover:text-white shadow-[0_0_10px_rgba(255,0,60,0.2)] hover:shadow-[0_0_15px_rgba(255,0,60,0.6)]",
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
