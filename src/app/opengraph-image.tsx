import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Marcos Armenta — Creative Director & Product Designer";

async function loadGoogleFont(weight: number) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=Public+Sans:wght@${weight}`)
  ).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (!match) throw new Error("Could not resolve Public Sans font file");
  const res = await fetch(match[1]);
  return res.arrayBuffer();
}

export default async function OpengraphImage() {
  const markSvg = readFileSync(join(process.cwd(), "public/images/brand_mark.svg"), "utf-8");
  const markDataUri = `data:image/svg+xml;base64,${Buffer.from(markSvg).toString("base64")}`;

  const [regular, semibold] = await Promise.all([loadGoogleFont(400), loadGoogleFont(600)]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#161616",
          padding: "96px",
          fontFamily: "Public Sans",
        }}
      >
        <img src={markDataUri} width={96} height={96} style={{ borderRadius: 20 }} />
        <div style={{ display: "flex", flexDirection: "column", marginTop: 48, gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            Marcos Armenta
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 400, color: "#C10000" }}>
            Creative Director &amp; Product Designer
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Public Sans", data: regular, weight: 400, style: "normal" },
        { name: "Public Sans", data: semibold, weight: 600, style: "normal" },
      ],
    }
  );
}
