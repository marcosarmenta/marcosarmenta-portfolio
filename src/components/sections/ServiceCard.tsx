import type { Service } from "@/lib/sanity";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex h-full flex-col justify-between gap-8 rounded-lg border border-border-subtle bg-bg-surface p-6">
      <span className="font-mono text-small text-text-secondary">{service.number}</span>
      <div className="flex flex-col gap-3">
        <h3 className="text-h2 text-text-primary">{service.title}</h3>
        {service.tags && service.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-border-subtle px-2 py-1 font-mono text-small text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
