import { MapPin } from 'lucide-react'
import Image from 'next/image'
import { hotel, similarHotels } from '@/lib/hotel'
import { Section } from './section'

export function SimilarHotels() {
  return (
    <Section
      id="similar"
      eyebrow="Альтернативы"
      title="Похожие отели в Кемере"
      action={
        <a
          href="/hotels/turkey/kemer"
          className="text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-2"
        >
          Все отели Кемера
        </a>
      }
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {similarHotels.map((h) => (
          <li key={h.name}>
            <a
              href="#"
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-border transition-colors hover:border-primary/40"
            >
              <span className="relative block aspect-[16/10]">
                <Image
                  src={h.image}
                  alt={`Отель ${h.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 340px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute right-2.5 top-2.5 rounded-md bg-primary px-2 py-1 font-heading text-sm font-extrabold text-primary-foreground">
                  {h.rating.toLocaleString('ru-RU')}
                </span>
              </span>
              <span className="flex flex-1 flex-col p-4">
                <span className="text-sm font-bold leading-snug">{h.name}</span>
                <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {h.location} · {h.reviews.toLocaleString('ru-RU')} отзывов
                </span>
                <span className="mt-3 block text-xs text-muted-foreground">{h.meal}</span>
                <span className="mt-auto pt-3 text-sm text-muted-foreground">
                  от{' '}
                  <span className="font-heading text-lg font-extrabold text-foreground">
                    {h.price.toLocaleString('ru-RU')} {hotel.currency}
                  </span>{' '}
                  за ночь
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
