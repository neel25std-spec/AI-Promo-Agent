/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
          "on-background": "#181445",
          "inverse-primary": "#d0bcff",
          "on-error": "#ffffff",
          "inverse-surface": "#2d2a5b",
          "primary-fixed-dim": "#d0bcff",
          "on-secondary-container": "#646274",
          "on-surface-variant": "#494454",
          "surface-bright": "#fcf8ff",
          "on-primary-fixed-variant": "#5516be",
          "tertiary-fixed": "#e7deff",
          "primary": "#6b38d4",
          "on-primary": "#ffffff",
          "on-secondary-fixed": "#1b1a29",
          "surface": "#fcf8ff",
          "on-secondary-fixed-variant": "#464555",
          "outline-variant": "#cbc3d7",
          "surface-dim": "#dad6ff",
          "primary-container": "#8455ef",
          "on-tertiary": "#ffffff",
          "primary-fixed": "#e9ddff",
          "surface-tint": "#6d3bd7",
          "inverse-on-surface": "#f3eeff",
          "tertiary-container": "#786bad",
          "surface-variant": "#e3dfff",
          "on-error-container": "#93000a",
          "secondary": "#5e5c6e",
          "secondary-fixed": "#e4e0f5",
          "on-tertiary-container": "#fffbff",
          "outline": "#7b7486",
          "surface-container-high": "#e9e5ff",
          "surface-container-highest": "#e3dfff",
          "on-tertiary-fixed": "#1e0e4e",
          "on-primary-fixed": "#23005c",
          "on-tertiary-fixed-variant": "#4a3d7c",
          "tertiary-fixed-dim": "#ccbeff",
          "surface-container-low": "#f6f2ff",
          "secondary-container": "#e4e0f5",
          "on-surface": "#181445",
          "on-secondary": "#ffffff",
          "background": "#fcf8ff",
          "tertiary": "#5f5293",
          "surface-container-lowest": "#ffffff",
          "surface-container": "#efebff",
          "error-container": "#ffdad6",
          "on-primary-container": "#fffbff",
          "error": "#ba1a1a",
          "secondary-fixed-dim": "#c7c4d8"
      },
      "borderRadius": {
          "DEFAULT": "1rem",
          "lg": "2rem",
          "xl": "3rem",
          "full": "9999px"
      },
      "spacing": {
          "section-gap": "120px",
          "container-padding": "64px",
          "unit": "8px",
          "element-gap": "16px",
          "gutter": "24px"
      },
      "fontFamily": {
          "plus-jakarta": ["Plus Jakarta Sans", "sans-serif"],
          "headline-lg": ["Plus Jakarta Sans"],
          "headline-xl": ["Plus Jakarta Sans"],
          "body-md": ["Plus Jakarta Sans"],
          "headline-md": ["Plus Jakarta Sans"],
          "label-sm": ["Plus Jakarta Sans"],
          "body-lg": ["Plus Jakarta Sans"]
      },
      "fontSize": {
          "headline-lg": ["36px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700"}],
          "headline-xl": ["48px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
          "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
          "headline-md": ["24px", {"lineHeight": "1.3", "fontWeight": "600"}],
          "label-sm": ["14px", {"lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600"}],
          "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}]
      },
      animation: {
        'progress-flow': 'progress-flow 2s linear infinite',
      },
      keyframes: {
        'progress-flow': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
