'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import { overview } from '@/lib/data/hotel-detail'

export function Overview() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? overview.sections : overview.sections.slice(0, 2)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[15px] leading-relaxed">{overview.lead}</p>

      <div className="flex flex-col gap-4">
        {visible.map((section) => (
          <div key={section.title}>
            <h3 className="font-heading text-base font-bold">{section.title}</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-secondary-foreground">{section.body}</p>
          </div>
        ))}
      </div>

      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="flex w-fit items-center gap-1.5 rounded-lg text-sm font-semibold text-primary hover:underline"
        >
          Читать полное описание
          <ChevronDown className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
