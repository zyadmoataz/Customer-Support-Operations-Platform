/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: 'rgb(var(--bg-canvas) / <alpha-value>)',
          surface: 'rgb(var(--bg-elevated) / <alpha-value>)',
          card: 'rgb(var(--bg-surface-1) / <alpha-value>)',
          elevated: 'rgb(var(--bg-surface-2) / <alpha-value>)',
          border: 'rgb(var(--border-default) / <alpha-value>)',
          'border-subtle': 'rgb(var(--border-subtle) / <alpha-value>)',
          'border-hover': 'rgb(var(--border-hover) / <alpha-value>)',
          primary: 'rgb(var(--brand-primary) / <alpha-value>)',
          'primary-hover': 'rgb(var(--brand-primary-hover) / <alpha-value>)',
          accent: 'rgb(var(--brand-accent) / <alpha-value>)',
        },
        status: {
          open: 'rgb(var(--status-open) / <alpha-value>)',
          'open-bg': 'rgb(var(--status-open-bg) / <alpha-value>)',
          inprogress: 'rgb(var(--status-in-progress) / <alpha-value>)',
          'inprogress-bg': 'rgb(var(--status-in-progress-bg) / <alpha-value>)',
          resolved: 'rgb(var(--status-resolved) / <alpha-value>)',
          'resolved-bg': 'rgb(var(--status-resolved-bg) / <alpha-value>)',
          urgent: 'rgb(var(--status-urgent) / <alpha-value>)',
          'urgent-bg': 'rgb(var(--status-urgent-bg) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--text-tertiary) / <alpha-value>)',
          muted: 'rgb(var(--text-muted) / <alpha-value>)',
        },
        state: {
          success: 'rgb(var(--state-success) / <alpha-value>)',
          'success-bg': 'rgb(var(--state-success-bg) / <alpha-value>)',
          warning: 'rgb(var(--state-warning) / <alpha-value>)',
          'warning-bg': 'rgb(var(--state-warning-bg) / <alpha-value>)',
          danger: 'rgb(var(--state-danger) / <alpha-value>)',
          'danger-bg': 'rgb(var(--state-danger-bg) / <alpha-value>)',
          info: 'rgb(var(--state-info) / <alpha-value>)',
          'info-bg': 'rgb(var(--state-info-bg) / <alpha-value>)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 30px -5px var(--brand-glow)',
        'glow-lg': '0 0 45px -5px var(--brand-glow-lg)',
        card: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'card-elevated': '0 12px 40px 0 rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, var(--brand-glow), transparent 70%)',
      }
    },
  },
  plugins: [],
}
