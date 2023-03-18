const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      gray: colors.gray,
      red: colors.red,
      purple: colors.purple,
      yellow: colors.yellow,
      orange: colors.orange,
      pink: colors.pink,
      green: colors.green,
      blue: colors.blue,
      brand: {
        lightest: '#a2f6e2',
        lighter: '#79F2D5',
        light: '#4CEDC8',
        DEFAULT: '#2ceabe',
        dark: '#14C99E',
        darker: '#0E9273',
      },
      navy: {
        lighter: '#000C67',
        light: '#000846',
        DEFAULT: '#000424',
      },
    },
    extend: {
      fontFamily: {
        sans: ["'Lato'"],
        header: ["'Montserrat'"],
        mono: [
          "'IBM Plex Mono'",
          'source-code-pro',
          'Menlo',
          'Monaco',
          'Consolas',
          "'Courier New'",
          'monospace',
        ],
      },
      spacing: {
        tableColumnMinWidth: 150,
        tableColumnWidth: 150,
        tableColumnMaxWidth: 350,
      },
    },
  },
}
