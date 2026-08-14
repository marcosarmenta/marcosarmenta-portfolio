/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    // Logo marquee assets are SVGs from our own Sanity project (trusted,
    // editor-uploaded) — sandboxed via CSP since Next blocks SVG by default.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Next only serves widths from this list — 140 covers the logo marquee
    // (width={140}), 280 its 2x-density srcset entry.
    imageSizes: [16, 32, 48, 64, 96, 128, 140, 256, 280, 384],
  },
};

export default nextConfig;
