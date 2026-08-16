/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: 'var(--bg-canvas)',
          surface: 'var(--bg-elevated)',
          card: 'var(--bg-surface-1)',
          elevated: 'var(--bg-surface-2)',
          border: 'var(--border-default)',
          'border-subtle': 'var(--border-subtle)',
          'border-hover': 'var(--border-hover)',
          primary: 'var(--brand-primary)',
          'primary-hover': 'var(--brand-primary-hover)',
          accent: 'var(--brand-accent)',
        },
        status: {
          open: 'var(--status-open)',
          'open-bg': 'var(--status-open-bg)',
          inprogress: 'var(--status-in-progress)',
          'inprogress-bg': 'var(--status-in-progress-bg)',
          resolved: 'var(--status-resolved)',
          'resolved-bg': 'var(--status-resolved-bg)',
          urgent: 'var(--status-urgent)',
          'urgent-bg': 'var(--status-urgent-bg)',
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
