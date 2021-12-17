module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    textColor: {
      primary: 'blue',
      secondary: 'purple',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
