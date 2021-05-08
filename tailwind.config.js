module.exports = {
  purge: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'mobile': { 'max': '950px'}
    }
  
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
