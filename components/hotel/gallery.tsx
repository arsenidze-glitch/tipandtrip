'use client'

import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import type { HotelPhoto } from '@/lib/data/hotels'

export function Gallery({ photos, hotelName }: { photos: HotelPhoto[]; hotelName: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const cover = photos[0]
  const side = photos.slice(1, 5)

  useEffect(() => {
    if (openIndex == null) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenIndex(null)
      if (event.key === 'ArrowRight') setOpenIndex((index) => ((index ?? 0) + 1) % photos.length)
      if (event.key === 'ArrowLeft')
        setOpenIndex((index) => ((index ?? 0) - 1 + photos.length) % photos.length)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [openIndex, photos.length])

  return (
    <>
      <div className="grid gap-2 sm:grid-cols-[1.6fr_1fr] lg:grid-cols-[2fr_1fr]">
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className="relative h-64 overflow-hidden rounded-2xl sm:h-[380px]"
        >
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 60vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
          <span className="sr-only">Открыть все фотографии {hotelName}</span>
        </button>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 sm:grid-rows-2 lg:grid-cols-2 lg:grid-rows-2">
          {side.map((photo, index) => (
            <button
              key={photo.src + index}
              type="button"
              onClick={() => setOpenIndex(index + 1)}
              className="relative h-28 overflow-hidden rounded-xl sm:h-full"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, 280px"
                className="object-cover transition-transform duration-500 hover:scale-[1.05]"
              />
              {index === side.length - 1 && (
                <span className="absolute inset-0 grid place-items-center bg-[rgba(16,20,24,0.55)] text-sm font-semibold text-white">
                  <span className="flex items-center gap-1.5">
                    <Images className="size-4" aria-hidden="true" />
                    Все {photos.length} фото
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {openIndex != null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Фотографии ${hotelName}`}
          className="fixed inset-0 z-50 flex flex-col bg-[rgba(8,12,16,0.95)]"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-sm font-medium text-white">
              {openIndex + 1} из {photos.length}
            </p>
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Закрыть галерею"
              className="grid size-10 place-items-center rounded-lg text-white hover:bg-white/15"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="relative flex-1">
            <Image
              src={photos[openIndex].src}
              alt={photos[openIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <button
              type="button"
              onClick={() => setOpenIndex((index) => ((index ?? 0) - 1 + photos.length) % photos.length)}
              aria-label="Предыдущее фото"
              className="grid size-11 place-items-center rounded-lg bg-white/15 text-white hover:bg-white/25"
            >
              <ChevronLeft className="size-5" />
            </button>
            <p className="min-w-0 flex-1 text-center text-sm text-white/80">
              {photos[openIndex].alt}
            </p>
            <button
              type="button"
              onClick={() => setOpenIndex((index) => ((index ?? 0) + 1) % photos.length)}
              aria-label="Следующее фото"
              className="grid size-11 place-items-center rounded-lg bg-white/15 text-white hover:bg-white/25"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
