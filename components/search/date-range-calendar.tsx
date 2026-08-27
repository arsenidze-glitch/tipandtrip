'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { nightsLabel } from '@/lib/format'
import {
  MONTHS_NOMINATIVE,
  WEEKDAYS_SHORT,
  nightsBetween,
  parseIsoDate,
  toIsoDate,
} from '@/lib/search'
import { cn } from '@/lib/utils'

type Cell = { iso: string; day: number } | null

function buildMonth(year: number, month: number): Cell[] {
  const first = new Date(Date.UTC(year, month, 1))
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
  // Смещение под неделю с понедельника
  const offset = (first.getUTCDay() + 6) % 7
  const cells: Cell[] = Array.from({ length: offset }, () => null)
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ iso: toIsoDate(new Date(Date.UTC(year, month, day))), day })
  }
  return cells
}

/** Начало дня «сегодня» — прошлые даты выбрать нельзя. */
function todayIso() {
  const now = new Date()
  return toIsoDate(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())))
}

export function DateRangeCalendar({
  checkIn,
  checkOut,
  onChange,
}: {
  checkIn: string
  checkOut: string
  onChange: (range: { checkIn: string; checkOut: string }) => void
}) {
  const [cursor, setCursor] = useState(() => {
    const date = parseIsoDate(checkIn)
    return { year: date.getUTCFullYear(), month: date.getUTCMonth() }
  })
  /** Когда выбрана только дата заезда, ждём второй клик. */
  const [pendingStart, setPendingStart] = useState<string | null>(null)
  const today = todayIso()

  const months = [
    cursor,
    cursor.month === 11 ? { year: cursor.year + 1, month: 0 } : { year: cursor.year, month: cursor.month + 1 },
  ]

  function shift(direction: -1 | 1) {
    setCursor((current) => {
      const next = current.month + direction
      if (next < 0) return { year: current.year - 1, month: 11 }
      if (next > 11) return { year: current.year + 1, month: 0 }
      return { year: current.year, month: next }
    })
  }

  function handleSelect(iso: string) {
    if (pendingStart) {
      if (iso <= pendingStart) {
        setPendingStart(iso)
        return
      }
      onChange({ checkIn: pendingStart, checkOut: iso })
      setPendingStart(null)
      return
    }
    setPendingStart(iso)
  }

  const rangeStart = pendingStart ?? checkIn
  const rangeEnd = pendingStart ? null : checkOut

  return (
    <div className="p-2">
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => shift(-1)}
          className="grid size-9 place-items-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted"
          aria-label="Предыдущий месяц"
        >
          <ChevronLeft className="size-4" />
        </button>
        <p className="text-sm font-semibold" aria-live="polite">
          {pendingStart
            ? 'Выберите дату выезда'
            : `${nightsLabel(nightsBetween(checkIn, checkOut))} · заезд и выезд выбраны`}
        </p>
        <button
          type="button"
          onClick={() => shift(1)}
          className="grid size-9 place-items-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted"
          aria-label="Следующий месяц"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
        {months.map(({ year, month }) => (
          <div key={`${year}-${month}`} className="min-w-0 flex-1">
            <p className="mb-2 text-center text-sm font-semibold">
              {MONTHS_NOMINATIVE[month]} {year}
            </p>
            <div className="mb-1 grid grid-cols-7 gap-y-1">
              {WEEKDAYS_SHORT.map((day) => (
                <span key={day} className="text-center text-[11px] text-muted-foreground">
                  {day}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
              {buildMonth(year, month).map((cell, index) => {
                if (!cell) return <span key={`empty-${index}`} />
                const disabled = cell.iso < today
                const isStart = cell.iso === rangeStart
                const isEnd = rangeEnd != null && cell.iso === rangeEnd
                const inRange =
                  rangeEnd != null && cell.iso > rangeStart && cell.iso < rangeEnd
                return (
                  <button
                    key={cell.iso}
                    type="button"
                    disabled={disabled}
                    onClick={() => handleSelect(cell.iso)}
                    aria-pressed={isStart || isEnd}
                    className={cn(
                      'tabular mx-auto grid size-9 place-items-center rounded-lg text-[13px] transition-colors',
                      disabled && 'cursor-not-allowed text-muted-foreground/50',
                      !disabled && 'hover:bg-brand-soft',
                      inRange && 'bg-brand-soft text-foreground',
                      (isStart || isEnd) && 'bg-primary font-semibold text-primary-foreground hover:bg-primary',
                    )}
                  >
                    {cell.day}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
