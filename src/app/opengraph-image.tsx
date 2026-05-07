import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "SonoPrep — SPI Exam Preparation Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0A0A0F 0%, #141420 40%, #0A0A0F 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Teal glow accent */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(94,234,212,0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(94,234,212,0.05) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            borderRadius: "9999px",
            border: "1px solid rgba(94,234,212,0.3)",
            background: "rgba(94,234,212,0.08)",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              color: "#5EEAD4",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase" as const,
            }}
          >
            ARDMS SPI Exam Preparation
          </span>
        </div>

        {/* Logo / Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#FAF5E8",
              letterSpacing: "-1px",
            }}
          >
            Sono
          </span>
          <span
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#5EEAD4",
              letterSpacing: "-1px",
            }}
          >
            Prep
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: "28px",
            color: "#FAF5E8",
            opacity: 0.8,
            maxWidth: "700px",
            textAlign: "center" as const,
            lineHeight: 1.4,
            margin: "0 0 40px 0",
          }}
        >
          Master Sonographic Physics. Pass Your SPI Exam.
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "48px",
          }}
        >
          {[
            { value: "200+", label: "Flashcards" },
            { value: "110", label: "Exam Questions" },
            { value: "50", label: "Physics Pearls" },
            { value: "159pg", label: "Study Notes" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 700,
                  color: "#5EEAD4",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  color: "#FAF5E8",
                  opacity: 0.6,
                  textTransform: "uppercase" as const,
                  letterSpacing: "2px",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              color: "#FAF5E8",
              opacity: 0.4,
              letterSpacing: "1px",
            }}
          >
            sonoprep.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
