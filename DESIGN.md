---
version: 1.0.0
name: pinnacle-ai-receptionist-design-system
description: Design system specification for Pinnacle AI Receptionist, synthesized from VoltAgent awesome-design-md patterns (Linear, ElevenLabs, Google Material 3, and Stripe). Built on a focused dark canvas (#121316), elevated obsidian slate card panels (#1E222D), an atmospheric centered AI receptionist hero visual, and a functional Google quad-color accent system.

colors:
  # Canvas & Base Surfaces
  canvas: "#121316"
  canvas-subtle: "#191B22"
  surface-card: "#1E222D"
  surface-card-hover: "#262B38"
  surface-glass: "rgba(255, 255, 255, 0.05)"
  
  # Hairline Borders & Shadows
  hairline: "rgba(255, 255, 255, 0.14)"
  hairline-strong: "rgba(255, 255, 255, 0.28)"
  shadow-card: "0 4px 20px rgba(0, 0, 0, 0.35)"
  shadow-card-hover: "0 16px 36px rgba(0, 0, 0, 0.5)"

  # Google Functional Color Accents
  google-blue: "#1A73E8"
  google-blue-hover: "#1557B0"
  google-blue-light: "#4285F4"
  google-blue-tint: "rgba(66, 133, 244, 0.14)"
  google-green: "#34A853"
  google-green-light: "#81C995"
  google-green-tint: "rgba(52, 168, 83, 0.14)"
  google-yellow: "#FBBC05"
  google-yellow-light: "#FDD663"
  google-yellow-tint: "rgba(251, 188, 5, 0.14)"
  google-red: "#EA4335"
  google-red-light: "#F28B82"
  google-red-tint: "rgba(234, 67, 53, 0.14)"

  # Typography Colors
  text-primary: "#FFFFFF"
  text-secondary: "#BDC1C6"
  text-muted: "#80868B"

typography:
  font-primary: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  font-display: "'Outfit', 'Inter', -apple-system, sans-serif"
  display-hero:
    fontFamily: "'Outfit', sans-serif"
    fontSize: "clamp(2.4rem, 6.2vw, 4.6rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  h2-section:
    fontFamily: "'Outfit', sans-serif"
    fontSize: "clamp(2rem, 4vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  h3-card:
    fontFamily: "'Inter', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "'Inter', sans-serif"
    fontSize: "1rem"
    lineHeight: 1.6
    color: "#BDC1C6"

rounded:
  none: 0px
  sm: 6px
  btn: 8px
  card: 18px
  card-lg: 24px
  pill: 9999px

components:
  # Primary Button (Google Blue Material Standard)
  button-primary:
    background: "#1A73E8"
    color: "#FFFFFF"
    fontWeight: 500
    borderRadius: "8px"
    padding: "13px 26px"
    border: "1px solid #1A73E8"
    boxShadow: "0 1px 3px rgba(26, 115, 232, 0.3), 0 4px 12px rgba(26, 115, 232, 0.25)"
    hover:
      background: "#1557B0"
      transform: "translateY(-2px)"
      boxShadow: "0 4px 16px rgba(26, 115, 232, 0.45)"

  # Secondary Button (Glass Surface)
  button-secondary:
    background: "rgba(255, 255, 255, 0.08)"
    color: "#FFFFFF"
    fontWeight: 500
    borderRadius: "8px"
    padding: "13px 26px"
    border: "1px solid rgba(255, 255, 255, 0.18)"
    hover:
      background: "rgba(255, 255, 255, 0.14)"
      transform: "translateY(-2px)"

  # Status Pill (Active Service Indicator)
  status-pill:
    background: "rgba(15, 23, 42, 0.85)"
    border: "1px solid rgba(255, 255, 255, 0.14)"
    borderRadius: "9999px"
    padding: "7px 18px"
    textTransform: "uppercase"
    fontSize: "0.8rem"
    fontWeight: 600
    dotColor: "#34A853"
    dotAnimation: "statusPulse 2s ease-in-out infinite"

  # Bento Feature Cards (Google Quad-Color Identity)
  cards:
    surface: "#1E222D"
    border: "1px solid rgba(255, 255, 255, 0.14)"
    borderRadius: "18px"
    padding: "32px"
    accents:
      latency-voice:
        color: "#4285F4" # Google Blue
        borderTop: "3px solid #4285F4"
        animation: "pulse-float"
      calendar-booking:
        color: "#34A853" # Google Green
        borderTop: "3px solid #34A853"
        animation: "card-lift"
      knowledge-scraping:
        color: "#FBBC05" # Google Yellow
        borderTop: "3px solid #FBBC05"
        animation: "warm-shimmer"
      emergency-transfer:
        color: "#EA4335" # Google Red
        borderTop: "3px solid #EA4335"
        animation: "alert-pulse"

rules:
  - "Never create invisible boxes: All cards must use elevated surface #1E222D with visible hairline borders against the #121316 background."
  - "Hero visual prominence: The centered AI receptionist image (assets/ai_robot_hero.jpg) must be clearly visible through a calibrated translucent scrim."
  - "No robotic AI palettes: Restrict chromatic moments to Google functional colors (Blue for action, Green for active/calendar, Yellow for revenue/speed, Red for emergency)."
  - "Mobile-first readability: Maintain zero horizontal overflow (overflow-x: clip) with stacked touch targets on viewports under 480px."
---
