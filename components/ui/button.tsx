import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow] outline-none select-none disabled:pointer-events-none disabled:opacity-55 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-[#0356b8] active:bg-[#02489b]',
        brand: 'bg-brand text-brand-foreground hover:bg-[#00939f] active:bg-[#007f8a]',
        outline: 'border-[color:var(--border-strong)] bg-card text-foreground hover:bg-muted',
        subtle: 'bg-muted text-secondary-foreground hover:bg-[#e3ebf1]',
        ghost: 'text-foreground hover:bg-muted',
        link: 'h-auto rounded-sm p-0 text-primary underline-offset-4 hover:underline',
        danger: 'bg-destructive text-white hover:bg-[#9c1e15]',
      },
      size: {
        sm: 'h-9 px-3 text-[13px]',
        md: 'h-11 px-4 text-sm',
        lg: 'h-12 px-6 text-[15px]',
        icon: 'size-10 rounded-lg',
        'icon-sm': 'size-9 rounded-lg',
      },
      block: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, block, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, block }), className)}
      {...props}
    />
  )
}
