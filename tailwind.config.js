/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(220, 13%, 13%)",
        secondary: "hsl(220, 14%, 38%)",
        accent: "hsl(220, 13%, 13%)",
        muted: "hsl(220, 14%, 42%)",
        surface: "hsl(0, 0%, 100%)",
        background: "hsl(220, 14%, 98%)",
        foreground: "hsl(220, 13%, 13%)",
        border: "hsl(220, 13%, 91%)",
        input: "hsl(0, 0%, 100%)",
        ring: "hsl(220, 13%, 13%)",
        success: "hsl(162, 79%, 27%)",
        warning: "hsl(35, 95%, 57%)",
        destructive: "hsl(358, 79%, 60%)",
      },
      borderRadius: {
        lg: "16px",
        md: "10px",
        sm: "6px",
        xl: "24px",
        "2xl": "32px",
      },
      boxShadow: {
        card: "0 8px 24px hsla(220, 13%, 13%, 0.12)",
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
}