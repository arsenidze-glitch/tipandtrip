'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import type { HotelPhoto } from '@/lib/data/hotels'
import { cn } from '@/lib/utils'

const MAX_SLIDES = 4

/**
 * Мини-галерея для карточки в выдаче: до четырёх фото пролистываются
 * стрелками прямо в списке, без перехода на страницу отеля.
 */
export function HotelCardGallery({
  photos,
  photosCount,
  href,
  hotelName,
  badge,
  className,
}: {
  photos: HotelPhoto[]
  photosCount: number
  href: string
  hotelName: string
  badge?: React.ReactNode
  className?: string
}) {
  const slides = photos.slice(0, MAX_SLIDES)
  const [index, setIndex] = useState(0)
  const hasMany = slides.length > 1

  const go = (delta: number) => {
    setIndex((current) => (current + delta + slides.length) % slides.length)
  }

  return (
    <div className={cn('group/gallery relative overflow-hidden bg-muted', className)}>
      <Link href={href} className="absolute inset-0 block" tabIndex={-1} aria-hidden="true">
        <div
          className="flex h-full w-full transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((photo, i) => (
            <div key={photo.src} className="relative h-full w-full shrink-0">
              <Image
                src={photo.src}
                alt={i === 0 ? '' : photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, 340px"
                className="object-cover"
                priority={false}
              />
            </div>
          ))}
        </div>
      </Link>

      {badge}

      <span className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-[rgba(16,20,24,0.72)] px-2 py-1 text-[11px] font-medium text-white">
        {photosCount} фото
      </span>

      {hasMany && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={`Предыдущее фото: ${hotelName}`}
            className="absolute top-1/2 left-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm opacity-0 transition-opacity group-hover/gallery:opacity-100 focus-visible:opacity-100 hover:bg-card"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={`Следующее фото: ${hotelName}`}
            className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm opacity-0 transition-opacity group-hover/gallery:opacity-100 focus-visible:opacity-100 hover:bg-card"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>

          <div
            className="pointer-events-none absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1"
            aria-hidden="true"
          >
            {slides.map((photo, i) => (
              <span
                key={photo.src}
                className={cn(
                  'size-1.5 rounded-full transition-colors',
                  i === index ? 'bg-white' : 'bg-white/50',
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
