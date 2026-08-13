import Image from "next/image";
import { urlFor, type Logo } from "@/lib/sanity";

// Pure CSS animation (no JS marquee library) — the track is duplicated and
// scrolled -50% so the loop is seamless.
export function LogoMarquee({ logos }: { logos: Logo[] }) {
  const track = [...logos, ...logos];

  return (
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee items-center gap-16">
        {track.map((logo, i) => (
          <div
            key={`${logo._key}-${i}`}
            className="flex h-12 w-[140px] shrink-0 items-center justify-center"
          >
            <Image
              src={urlFor(logo.svg).width(280).height(96).url()}
              alt={logo.name}
              width={140}
              height={48}
              className="h-full w-auto object-contain opacity-60 grayscale transition-opacity hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
