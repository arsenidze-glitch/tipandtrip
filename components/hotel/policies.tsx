import { policies } from '@/lib/data/hotel-detail'

export function Policies() {
  return (
    <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
      {policies.map((policy) => (
        <li key={policy.title} className="grid gap-2 p-4 sm:grid-cols-[220px_1fr] sm:gap-6">
          <div>
            <h3 className="font-heading text-[15px] font-bold">{policy.title}</h3>
            <p className="mt-0.5 text-[13px] text-muted-foreground">{policy.summary}</p>
          </div>
          <ul className="flex flex-col gap-1.5">
            {policy.items.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-secondary-foreground">
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
