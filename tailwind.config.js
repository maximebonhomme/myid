module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    colors: {
      black: '#000',
      white: '#fff'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    extend: {
      spacing: {
        10: '10px'
      },
      borderRadius: {
        m: '8px',
        l: '12px',
        xl: '16px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
