import Image from "next/image";

// Signature four-point mark. Sourced from the same icon folder as the social
// icons and pre-colored to the locked accent, since an <img> can't inherit
// currentColor.
export function StarMark({ size = 10, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/images/icons/star.svg"
      alt=""
      aria-hidden
      width={size}
      height={size}
      unoptimized
      className={`inline-block shrink-0 ${className}`}
    />
  );
}
