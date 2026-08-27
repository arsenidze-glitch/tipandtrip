import { Check } from 'lucide-react'

import { amenityGroups } from '@/lib/data/hotel-detail'

export function Amenities() {
  return (
    <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
      {amenityGroups.map((group) => (
        <div key={group.title}>
          <h3 className="font-heading text-[15px] font-bold">{group.title}</h3>
          <ul className="mt-2 flex flex-col gap-1.5">
            {group.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
