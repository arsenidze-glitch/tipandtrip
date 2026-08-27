'use client'

import { CalendarDays, MapPin, Pencil, Users } from 'lucide-react'
import { useState } from 'react'

import { SearchForm } from '@/components/search/search-form'
import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { formatGuests, formatShortRange, type SearchContext } from '@/lib/search'

/**
 * Шапка страниц поиска и отеля: показывает текущие параметры поиска
 * и раскрывает полную форму для изменения.
 */
export function SearchHeader({ search }: { search: SearchContext }) {
  const [editing, setEditing] = useState(false)

  return (
    <div className="sticky top-0 z-40">
      <SiteHeader className="border-b-0" />
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-[1240px] px-4 py-3 lg:px-6">
          {editing ? (
            <div className="flex flex-col gap-2">
              <SearchForm initial={search} variant="compact" />
              <div>
                <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
                  Свернуть
                </Button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5 text-left transition-colors hover:border-[color:var(--border-strong)] hover:bg-muted/50"
            >
              <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <span className="flex min-w-0 items-center gap-1.5 font-semibold">
                  <MapPin className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="truncate">{search.destination}</span>
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
                  {formatShortRange(search.checkIn, search.checkOut)}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="size-4 shrink-0" aria-hidden="true" />
                  {formatGuests(search)}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary">
                <Pencil className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">Изменить</span>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
