---
version: 2.0.0
name: pinnacle-ai-receptionist-voltron-mtp
description: Design system and conversion architecture for Pinnacle AI Receptionist, synthesized from the Voltron MTP Professional Website Framework (VoltAgent-inspired developer-grade design). Built on an unrelenting near-black canvas (#0B0C0E), elevated obsidian panels (#14161C, #1A1D25), electric emerald conversion accents (#00D992), technical cyan and amber telemetry indicators, SF Mono/JetBrains Mono data chips, and hairline borders.

colors:
  # Base Canvas & Obsidian Surfaces
  canvas: "#0B0C0E"
  canvas-soft: "#14161C"
  surface-card: "#1A1D25"
  surface-card-hover: "#222631"
  surface-glass: "rgba(255, 255, 255, 0.04)"
  surface-subtle: "rgba(255, 255, 255, 0.02)"

  # Hairline Borders & Shadows
  hairline: "rgba(255, 255, 255, 0.09)"
  hairline-strong: "rgba(255, 255, 255, 0.18)"
  hairline-primary: "rgba(0, 217, 146, 0.35)"
  hairline-dashed: "1px dashed rgba(255, 255, 255, 0.12)"
  shadow-card: "0 6px 24px rgba(0, 0, 0, 0.45)"
  shadow-card-hover: "0 14px 40px rgba(0, 0, 0, 0.65), 0 0 24px rgba(0, 217, 146, 0.12)"

  # Voltron Electric Brand Accents
  primary: "#00D992"         # Electric Emerald Green
  primary-soft: "#2FD6A1"    # Soft mint green
  primary-deep: "#10B981"    # Deep emerald
  primary-glow: "rgba(0, 217, 146, 0.25)"
  on-primary: "#0B0C0E"      # Contrast ink on primary

  # High-Contrast Telemetry Accents
  telemetry-cyan: "#00E5FF"  # Latency, real-time voice synthesis
  telemetry-cyan-glow: "rgba(0, 229, 255, 0.2)"
  telemetry-amber: "#FFB800" # ROI metrics, revenue protection
  telemetry-rose: "#FF4D6D"  # Spam filtering, emergency warm transfers

  # Clean Typographic Scale
  text-primary: "#FFFFFF"
  text-secondary: "#C2C7D0"
  text-muted: "#848A98"
  text-mono: "#9AE6B4"

typography:
  font-primary: "'Inter', system-ui, -apple-system, sans-serif"
  font-display: "'Outfit', 'Inter', system-ui, sans-serif"
  font-mono: "'JetBrains Mono', 'SFMono-Regular', Menlo, Monaco, Consolas, monospace"

  display-hero:
    fontFamily: "'Outfit', sans-serif"
    fontSize: "clamp(2.5rem, 6.4vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  h2-section:
    fontFamily: "'Outfit', sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 2.85rem)"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.025em"
  h3-card:
    fontFamily: "'Inter', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
  mono-telemetry:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "0.8rem"
    fontWeight: 600
    letterSpacing: "0.08em"
    textTransform: "uppercase"

rounded:
  none: 0px
  xs: 4px
  sm: 6px
  btn: 8px
  card: 14px
  card-lg: 20px
  pill: 9999px

components:
  # Primary Conversion Button (Voltron Electric Green)
  button-primary:
    background: "#00D992"
    color: "#0B0C0E"
    fontWeight: 600
    borderRadius: "8px"
    padding: "13px 26px"
    border: "1px solid #00D992"
    boxShadow: "0 2px 10px rgba(0, 217, 146, 0.35), 0 0 20px rgba(0, 217, 146, 0.2)"
    hover:
      background: "#2FD6A1"
      transform: "translateY(-2px)"
      boxShadow: "0 6px 20px rgba(0, 217, 146, 0.5), 0 0 30px rgba(0, 217, 146, 0.3)"

  # Secondary Outline Button (Hairline Dark)
  button-secondary:
    background: "rgba(255, 255, 255, 0.03)"
    color: "#FFFFFF"
    fontWeight: 500
    borderRadius: "8px"
    padding: "13px 26px"
    border: "1px solid rgba(255, 255, 255, 0.12)"
    hover:
      background: "rgba(255, 255, 255, 0.08)"
      borderColor: "rgba(255, 255, 255, 0.25)"
      transform: "translateY(-2px)"

  # Telemetry Live Eyebrow
  eyebrow-pill:
    background: "rgba(0, 217, 146, 0.08)"
    border: "1px solid rgba(0, 217, 146, 0.25)"
    borderRadius: "9999px"
    padding: "6px 16px"
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "0.78rem"
    fontWeight: 600
    color: "#00D992"
    beaconDot: "#00D992"
    beaconPulse: "radarPing 2s infinite"

  # Bento Feature Cards
  bento-card:
    surface: "#1A1D25"
    border: "1px solid rgba(255, 255, 255, 0.09)"
    borderRadius: "14px"
    padding: "30px"
    hover:
      borderColor: "rgba(0, 217, 146, 0.4)"
      boxShadow: "0 12px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 217, 146, 0.1)"

conversion_rules:
  - "Frictionless Hero CTA: Never hide primary action; offer instant Live Demo trigger alongside microcopy risk reducers (zero hardware, keep number, 2-min setup)."
  - "Live Proof Before Pitch: Place interactive audio studio and real call scenario simulator above standard marketing prose."
  - "Concrete Telemetry Over Fluff: Explicitly state latency (<140ms), uptime (99.98%), and average saved payroll (,500/mo) in high-contrast monospace chips."
  - "Continuous Dark Canvas: Ground all modules on deep #0B0C0E background broken only by hairline outlines and electric green conversion anchors."
---