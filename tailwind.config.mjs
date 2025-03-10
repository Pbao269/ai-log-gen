/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "hsl(var(--color-background))",
          foreground: "hsl(var(--color-foreground))",
          card: {
            DEFAULT: "hsl(var(--color-card))",
            foreground: "hsl(var(--color-card-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--color-popover))",
            foreground: "hsl(var(--color-popover-foreground))",
          },
          primary: {
            DEFAULT: "hsl(var(--color-primary))",
            foreground: "hsl(var(--color-primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--color-secondary))",
            foreground: "hsl(var(--color-secondary-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--color-muted))",
            foreground: "hsl(var(--color-muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--color-accent))",
            foreground: "hsl(var(--color-accent-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--color-destructive))",
            foreground: "hsl(var(--color-destructive-foreground))",
          },
          border: "hsl(var(--color-border))",
          input: "hsl(var(--color-input))",
          ring: "hsl(var(--color-ring))",
          sidebar: {
            DEFAULT: "hsl(var(--color-sidebar))",
            foreground: "hsl(var(--color-sidebar-foreground))",
            primary: "hsl(var(--color-sidebar-primary))",
            "primary-foreground": "hsl(var(--color-sidebar-primary-foreground))",
            accent: "hsl(var(--color-sidebar-accent))",
            "accent-foreground": "hsl(var(--color-sidebar-accent-foreground))",
            border: "hsl(var(--color-sidebar-border))",
            ring: "hsl(var(--color-sidebar-ring))",
          },
          chart: {
            1: "hsl(var(--color-chart-1))",
            2: "hsl(var(--color-chart-2))",
            3: "hsl(var(--color-chart-3))",
            4: "hsl(var(--color-chart-4))",
            5: "hsl(var(--color-chart-5))",
          },
        },
        borderRadius: {
          sm: "var(--radius-sm)",
          md: "var(--radius-md)",
          lg: "var(--radius-lg)",
          xl: "var(--radius-xl)",
        },
        fontFamily: {
          sans: "var(--font-sans)",
          mono: "var(--font-mono)",
        },
      },
    },
    plugins: [],
  };
  