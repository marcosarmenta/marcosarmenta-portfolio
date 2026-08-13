import { CoffeeIcon } from "@phosphor-icons/react/dist/ssr/Coffee";
import type { Stat } from "@/lib/sanity";

function isEspressoStat(label: string) {
  return /espresso/i.test(label);
}

// Steam wisps on the espresso stat are pure CSS (:hover-driven keyframes,
// no JS state) — see `.steam-rise` usage and the `steam-rise` keyframes in
// globals.css.
export function StatBlock({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-8">
      {stats.map((stat) => {
        const espresso = isEspressoStat(stat.label);
        return (
          <div key={stat._key} className="group">
            <p className="text-stat text-text-primary">{stat.value}</p>
            <p className="mt-1 flex items-center gap-1.5 font-mono text-small text-text-secondary">
              {stat.label}
              {espresso && (
                <span className="relative inline-flex" aria-hidden>
                  <CoffeeIcon size={16} className="text-text-secondary" />
                  <span className="absolute -top-1 left-1 h-2 w-[3px] rounded-full bg-text-secondary opacity-0 group-hover:animate-[steam-rise_1.1s_ease-in-out_infinite]" />
                  <span className="absolute -top-1 left-[9px] h-2 w-[3px] rounded-full bg-text-secondary opacity-0 [animation-delay:0.35s] group-hover:animate-[steam-rise_1.1s_ease-in-out_infinite]" />
                </span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
