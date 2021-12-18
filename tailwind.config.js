module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        primary: 'blue',
        secondary: 'purple',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
