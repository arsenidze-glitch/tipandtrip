import {
  BedDouble,
  Check,
  Eye,
  Maximize2,
  ShieldCheck,
  Users,
  Wallet,
  XCircle,
} from 'lucide-react'
import Image from 'next/image'
import { hotel, roomOptions } from '@/lib/hotel'
import { Section } from './section'

export function Rooms() {
  return (
    <Section
      id="rooms"
      eyebrow="Наличие на 12–19 июня"
      title="Номера, тарифы и цены"
      action={
        <p className="text-xs text-muted-foreground">
          Цены за {hotel.nights} ночей для {hotel.guests.toLowerCase()}, включая налоги
        </p>
      }
    >
      <div className="flex flex-col gap-4">
        {roomOptions.map((room) => (
          <article
            key={room.id}
            className="overflow-hidden rounded-xl border border-border bg-background"
          >
            <div className="grid md:grid-cols-[240px_1fr]">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <Image
                  src={room.image}
                  alt={`Интерьер номера ${room.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 240px"
                  className="object-cover"
                />
                {room.badge ? (
                  <span className="absolute left-3 top-3 rounded-md bg-accent px-2 py-1 text-[11px] font-bold text-accent-foreground">
                    {room.badge}
                  </span>
                ) : null}
              </div>

              <div className="min-w-0 p-4 md:p-5">
                <h3 className="text-base font-bold md:text-lg">{room.name}</h3>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-1.5">
                    <Maximize2 className="size-4 text-primary" aria-hidden="true" />
                    {room.area} м²
                  </li>
                  <li className="flex items-center gap-1.5">
                    <BedDouble className="size-4 text-primary" aria-hidden="true" />
                    {room.beds}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Eye className="size-4 text-primary" aria-hidden="true" />
                    {room.view}
                  </li>
                </ul>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {room.features.map((f) => (
                    <li
                      key={f}
                      className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-col divide-y divide-border border-t border-border">
                  {room.rates.map((rate, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-3 py-4 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <ul className="flex min-w-0 flex-col gap-1.5 text-sm">
                        <li className="flex items-center gap-1.5 font-semibold">
                          <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                          {rate.meal}
                        </li>
                        <li
                          className={`flex items-center gap-1.5 ${rate.cancel.startsWith('Бесплатная') ? 'text-primary' : 'text-muted-foreground'}`}
                        >
                          {rate.cancel.startsWith('Бесплатная') ? (
                            <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
                          ) : (
                            <XCircle className="size-4 shrink-0" aria-hidden="true" />
                          )}
                          {rate.cancel}
                        </li>
                        <li className="flex items-center gap-1.5 text-muted-foreground">
                          <Wallet className="size-4 shrink-0" aria-hidden="true" />
                          {rate.prepay}
                          <span aria-hidden="true">·</span>
                          <Users className="size-4 shrink-0" aria-hidden="true" />
                          до {rate.guests} гостей
                        </li>
                      </ul>

                      <div className="flex shrink-0 items-end justify-between gap-4 sm:flex-col sm:items-end">
                        <div className="text-right">
                          {rate.oldPrice ? (
                            <p className="text-xs text-muted-foreground line-through">
                              {rate.oldPrice.toLocaleString('ru-RU')} {hotel.currency}
                            </p>
                          ) : null}
                          <p className="font-heading text-xl font-extrabold">
                            {rate.price.toLocaleString('ru-RU')} {hotel.currency}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            за ночь · {(rate.price * hotel.nights).toLocaleString('ru-RU')}{' '}
                            {hotel.currency} за {hotel.nights} ночей
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <button
                            type="button"
                            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                          >
                            Забронировать
                          </button>
                          {rate.left ? (
                            <span className="text-[11px] font-semibold text-destructive">
                              Осталось {rate.left} номера
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-lg border border-border py-3 text-sm font-semibold transition-colors hover:bg-secondary"
      >
        Показать все 12 вариантов размещения
      </button>
    </Section>
  )
}
