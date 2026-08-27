import { formatScore, ratingLabel, reviewsLabel } from '@/lib/format'
import { cn } from '@/lib/utils'

export function RatingBadge({
  score,
  reviews,
  size = 'md',
  className,
}: {
  score: number
  reviews?: number
  size?: 'sm' | 'md'
  className?: string
}) {
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <span
        className={cn(
          'tabular grid shrink-0 place-items-center rounded-lg bg-primary font-bold text-primary-foreground',
          size === 'sm' ? 'h-7 min-w-9 px-1.5 text-[13px]' : 'h-9 min-w-11 px-2 text-sm',
        )}
      >
        {formatScore(score)}
      </span>
      <span className="min-w-0 leading-tight">
        <span className={cn('block font-semibold', size === 'sm' ? 'text-[13px]' : 'text-sm')}>
          {ratingLabel(score)}
        </span>
        {reviews != null && (
          <span className="block text-xs text-muted-foreground">{reviewsLabel(reviews)}</span>
        )}
      </span>
    </span>
  )
}

export function Stars({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${count} звёзды`}>
      {Array.from({ length: count }, (_, index) => (
        <svg key={index} viewBox="0 0 24 24" className="size-3.5 fill-[#f0a92b]" aria-hidden="true">
          <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6l-5.9 3.1 1.2-6.6L2.5 9.5l6.6-.9z" />
        </svg>
      ))}
    </span>
  )
}
