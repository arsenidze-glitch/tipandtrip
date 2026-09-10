'use client'

import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import type { HotelPhoto } from '@/lib/data/hotels'

const SIDE_COUNT = 2
const STRIP_COUNT = 5

export function Gallery({
  photos,
  hotelName,
  photosCount,
}: {
  photos: HotelPhoto[]
  hotelName: string
  /** Общее число фото у поставщика — для плашки «+N фотографий» */
  photosCount?: number
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const cover = photos[0]
  const total = photosCount ?? photos.length

  // В моках у отеля 4–5 фото; чтобы сетка не разваливалась, заполняем её по кругу.
  // Индекс в лайтбоксе всегда указывает на реальное фото из массива.
  const tile = (n: number) => ({ photo: photos[n % photos.length], index: n % photos.length })
  const side = Array.from({ length: SIDE_COUNT }, (_, i) => tile(i + 1))
  const strip = Array.from({ length: STRIP_COUNT }, (_, i) => tile(i + 1 + SIDE_COUNT))
  const hiddenCount = Math.max(total - (1 + SIDE_COUNT + STRIP_COUNT), 0)

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
      <div className="flex flex-col gap-2">
        {/* Верх: большое фото + два фото 4:3 справа. Высота колонок задаётся правыми плитками */}
        <div className="grid gap-2 sm:grid-cols-[2fr_1fr]">
          <button
            type="button"
            onClick={() => setOpenIndex(0)}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-auto"
          >
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 66vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
            <span className="sr-only">Открыть все фотографии {hotelName}</span>
          </button>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            {side.map(({ photo, index }, i) => (
              <button
                key={`side-${i}`}
                type="button"
                onClick={() => setOpenIndex(index)}
                className="relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-[3/2]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.05]"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Низ: ряд почти квадратных миниатюр, последняя — с плашкой «+N фотографий» */}
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {strip.map(({ photo, index }, i) => {
            const isLast = i === strip.length - 1
            return (
              <button
                key={`strip-${i}`}
                type="button"
                onClick={() => setOpenIndex(index)}
                className={`relative aspect-[4/3] overflow-hidden rounded-xl ${i >= 3 ? 'hidden sm:block' : ''}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.05]"
                />
                {isLast && (
                  <span className="absolute inset-0 grid place-items-center bg-[rgba(16,20,24,0.55)] px-2 text-center text-sm font-semibold text-white">
                    <span className="flex items-center gap-1.5">
                      <Images className="size-4 shrink-0" aria-hidden="true" />
                      {hiddenCount > 0 ? `+${hiddenCount} фотографий` : `Все ${total} фото`}
                    </span>
                  </span>
                )}
              </button>
            )
          })}
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
