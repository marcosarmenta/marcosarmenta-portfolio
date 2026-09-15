import Link from "next/link";
import type { Service } from "@/lib/sanity";

const cardClassName =
  "group flex h-full flex-col items-start justify-between rounded-lg bg-bg-surface p-9 transition-colors duration-300 hover:bg-black";

function CardContent({ service }: { service: Service }) {
  return (
    <>
      <p className="text-[36px] font-medium leading-[36px] text-border-subtle transition-colors duration-300 group-hover:text-accent">
        {service.number}
      </p>
      <div className="flex flex-col items-start gap-4">
        <h3 className="text-[20px] font-medium text-text-primary transition-colors duration-300 group-hover:text-white">
          {service.title}
        </h3>
        {service.tags && service.tags.length > 0 && (
          <p className="text-[14px] text-text-secondary transition-colors duration-300 group-hover:text-white/60">
            {service.tags.join(", ")}
          </p>
        )}
      </div>
    </>
  );
}

export function ServiceCard({ service, href }: { service: Service; href?: string }) {
  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        <CardContent service={service} />
      </Link>
    );
  }

  return (
    <div className={cardClassName}>
      <CardContent service={service} />
    </div>
  );
}
