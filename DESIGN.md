---
name: Architectural Silence
colors:
  surface: '#fbf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#fbf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f0'
  surface-container: '#efeeeb'
  surface-container-high: '#eae8e5'
  surface-container-highest: '#e4e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#444748'
  inverse-surface: '#30312f'
  inverse-on-surface: '#f2f0ed'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e4e2e1'
  on-secondary-container: '#656464'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1f1b14'
  on-tertiary-container: '#898379'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e4e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#eae1d6'
  tertiary-fixed-dim: '#cdc5bb'
  on-tertiary-fixed: '#1f1b14'
  on-tertiary-fixed-variant: '#4b463e'
  background: '#fbf9f6'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2df'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 84px
    fontWeight: '400'
    lineHeight: 92px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 54px
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Bodoni Moda
    fontSize: 60px
    fontWeight: '400'
    lineHeight: 68px
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.15em
spacing:
  unit: 8px
  gutter: 32px
  margin-desktop: 80px
  margin-tablet: 40px
  margin-mobile: 24px
  section-gap: 160px
---

## Brand & Style

This design system is rooted in the philosophy of **Warm Minimalism** and **Architectural Editorial**. It prioritizes the "space between" as much as the content itself, drawing inspiration from the tactile and atmospheric qualities of modern brutalist and modernist architecture. The emotional response is one of calm, authority, and curated luxury.

The style avoids ephemeral trends in favor of timeless structural integrity. It utilizes heavy whitespace to create a gallery-like experience, where every image and text block feels intentional and permanent. The aesthetic is cinematic, treating the screen as a canvas for light, shadow, and materiality.

## Colors

The palette is a collection of natural, architectural tones designed to recede and allow photography to lead. 

- **Carbon (#111111):** Used for primary typography and structural lines. It provides the "weight" of the design.
- **Bone (#F7F5F2):** The primary canvas color. It is warmer than pure white, evoking natural plaster or light-washed limestone.
- **Stone (#D6CEC3):** Used for subtle UI demarcations, dividers, and secondary backgrounds to create soft depth.
- **Charcoal (#2B2B2B):** Reserved for high-contrast moments, such as footer backgrounds or primary call-to-action surfaces.

Maintain a low-saturation environment. Functional colors (success/error) should be used sparingly and desaturated to fit the palette.

## Typography

The typography strategy relies on the tension between a high-contrast, artistic Serif and a precise, modern Sans-Serif.

- **Headlines (Bodoni Moda):** Should be used with generous leading. The high contrast of the strokes mirrors architectural silhouettes. Large display sizes should use negative letter-spacing to feel "locked in."
- **Body (Hanken Grotesk):** Provides a technical, clean counterpoint. It should be set with wide line-heights to ensure the reading experience feels airy and unhurried.
- **Labels:** Use "label-caps" for navigation, metadata, and overlines. The increased letter spacing is essential for an editorial, high-end feel.

## Layout & Spacing

This design system utilizes an **Asymmetrical Editorial Grid**. While built on a standard 12-column foundation, elements should often be offset to create a sense of movement and architectural rhythm.

- **Negative Space:** Whitespace is treated as a physical material. Section gaps are intentionally oversized (160px+) to allow the eye to rest between projects.
- **Alignment:** Use "staggered" layouts for image galleries—where one column might be empty to break the vertical flow.
- **Reflow:** On mobile, the asymmetry collapses into a single-column stack, but large margins are preserved to maintain the premium feel.

## Elevation & Depth

Depth is achieved through **Material Layering** and **Tonal Shifts** rather than traditional shadows. 

- **The Stack:** Elements are layered with slight overlaps to suggest physical depth, similar to architectural blueprints or stacked stone.
- **Tonal Tiers:** Use the #E8E2DA (Beige) and #D6CEC3 (Stone) colors to define different planes. A drawer or modal should appear as a solid, flat surface sliding over another, without a drop shadow.
- **Lines:** Use 1px solid dividers in #2B2B2B (at low opacity) or #D6CEC3 to define boundaries. These lines should feel like "drafting lines"—sharp, thin, and purposeful.

## Shapes

The shape language is **Strictly Geometric and Sharp**. 

To reflect the precision of architectural design, a 0px border radius is applied to all components (buttons, inputs, cards, and images). This creates a sense of permanence and structural strength. Avoid any rounded corners, as they soften the professional, high-end "studio" aesthetic.

## Components

### Buttons
Buttons are understated. The "Primary" button is a solid #111111 block with white text, or a text-only link with a 1px underline that animates from left to right on hover. No rounded corners.

### Cards
Project cards should be borderless. The image is the hero, with the title and category appearing in "label-caps" either directly below or slightly overlapping the image in a small, offset box.

### Input Fields
Inputs are minimalist, consisting only of a bottom border (1px). The label sits above in small caps. On focus, the border color shifts from Stone to Carbon.

### Navigation
The navigation should be sparse. Use a hidden "Menu" toggle for complex structures, or a simple horizontal list with high tracking. The logo should always have ample "breathing room" (safe area).

### Imagery
Images should be treated with cinematic crop ratios (16:9 or 4:3). Use a slight desaturation or warm-tint filter to ensure all photography feels like it belongs to the same architectural series.