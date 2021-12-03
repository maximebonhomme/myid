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
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      'white-lightest': 'rgba(255, 255, 255, 0.03)',
      'white-lighter': 'rgba(255, 255, 255, 0.1)',
      'white-light': 'rgba(255, 255, 255, 0.3)'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    fontSize: {
      14: '14px',
      18: '18px'
    },
    opacity: {
      '03': 0.3
    },
    borderWidth: {
      1: '1px'
    },
    width: {
      auto: 'auto',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%',
      full: '100%',
      screen: '100vw',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content'
    },
    padding: {
      auto: 'auto',
      5: '5px',
      8: '8px',
      10: '10px',
      15: '15px',
      20: '20px',
      25: '25px'
    },
    margin: {
      auto: 'auto',
      5: '5px',
      8: '8px',
      10: '10px',
      15: '15px',
      20: '20px',
      25: '25px'
    },
    zIndex: {
      auto: 'auto',
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
      header: '100',
      search: '90',
      profile: '80'
    },
    extend: {
      spacing: {
        5: '5px',
        8: '8px',
        10: '10px',
        15: '15px',
        20: '20px',
        25: '25px'
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
