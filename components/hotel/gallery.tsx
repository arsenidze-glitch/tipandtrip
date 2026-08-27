'use client'

import { ChevronLeft, ChevronRight, Grid2x2, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { galleryImages, hotel } from '@/lib/hotel'

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null)

  const move = useCallback((dir: number) => {
    setOpen((prev) =>
      prev === null ? prev : (prev + dir + galleryImages.length) % galleryImages.length,
    )
  }, [])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, move])

  return (
    <div className="relative">
      <div className="grid gap-2 md:grid-cols-4 md:grid-rows-2 md:gap-2.5">
        {galleryImages.slice(0, 5).map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpen(i)}
            className={`group relative overflow-hidden rounded-xl bg-muted ${
              i === 0
                ? 'md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto'
                : 'aspect-[4/3]'
            } ${i > 2 ? 'hidden md:block' : ''}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={i === 0 ? '(max-width: 768px) 100vw, 620px' : '(max-width: 768px) 50vw, 310px'}
              priority={i === 0}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span className="absolute left-2.5 top-2.5 rounded-md bg-background/85 px-2 py-1 text-[11px] font-semibold backdrop-blur-sm">
              {img.tag}
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen(0)}
        className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-background/90 px-3.5 py-2.5 text-sm font-semibold shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
      >
        <Grid2x2 className="size-4" aria-hidden="true" />
        Все {hotel.photosCount} фото
      </button>

      {open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Галерея фотографий отеля"
          className="fixed inset-0 z-50 flex flex-col bg-foreground/95 p-4"
        >
          <div className="flex items-center justify-between text-background">
            <p className="text-sm font-medium">
              {open + 1} / {galleryImages.length} · {galleryImages[open].tag}
            </p>
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="grid size-10 place-items-center rounded-lg hover:bg-background/10"
              aria-label="Закрыть галерею"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="relative flex-1">
            <Image
              src={galleryImages[open].src}
              alt={galleryImages[open].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <p className="py-3 text-center text-sm text-background/80">{galleryImages[open].alt}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => move(-1)}
              className="grid size-11 place-items-center rounded-full bg-background text-foreground"
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="grid size-11 place-items-center rounded-full bg-background text-foreground"
              aria-label="Следующее фото"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
