module.exports = {
  content: ['./index.html', './src/**/*.{vue,ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          600: '#475569',
          900: '#0f172a'
        },
        'brand-indigo': '#2E2A5B',
        'brand-teal': '#34DCCC',
        'brand-sand': '#F4DBA0'
      }
    }
  },
  plugins: []
};
