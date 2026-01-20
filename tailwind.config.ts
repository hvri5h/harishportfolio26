/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: 'var(--color-bg)',
                'bg-alt': 'var(--color-bg-alt)',
                text: 'var(--color-text)',
                'text-secondary': 'var(--color-text-secondary)',
                'text-tertiary': 'var(--color-text-tertiary)',
                border: 'var(--color-border)',
                'border-light': 'var(--color-border-light)',
                accent: 'var(--color-accent)',
                'accent-hover': 'var(--color-accent-hover)',
                surface: 'var(--color-surface)',
                'surface-hover': 'var(--color-surface-hover)',
            },
            fontFamily: {
                sans: ['Saans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                serif: ['Source Serif 4', 'Georgia', 'Times New Roman', 'serif'],
                display: ['Saans', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '12px',
                lg: '20px',
            },
            transitionDuration: {
                fast: '150ms',
                base: '250ms',
                slow: '400ms',
            },
        },
    },
    plugins: [],
}
