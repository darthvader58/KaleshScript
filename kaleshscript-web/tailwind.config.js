/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Delhi street vibes - vibrant but modern
        'delhi-orange': '#FF6B35',
        'delhi-saffron': '#FF9933',
        'delhi-green': '#138808',
        'delhi-blue': '#000080',
        'neon-orange': '#FF5722',
        'neon-yellow': '#FFC107',
        'street-purple': '#9C27B0',
        
        // Modern dark theme (LeetCode inspired)
        'dark-bg': '#1a1a1a',
        'dark-surface': '#262626',
        'dark-elevated': '#2d2d2d',
        'dark-border': '#3d3d3d',
        'dark-hover': '#333333',
        'text-primary': '#e8e8e8',
        'text-secondary': '#a0a0a0',
        'text-tertiary': '#6b6b6b',
      },
    },
  },
  plugins: [],
}
