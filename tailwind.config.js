/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

const colors = {
  slate: {
    50: 'rgb(248 250 252)',
    100: 'rgb(241 245 249)',
    150: 'rgb(235 240 247)',
    200: 'rgb(226 232 240)',
    250: 'rgb(217 225 233)',
    300: 'rgb(203 213 225)',
    350: 'rgb(179 191 204)',
    400: 'rgb(148 163 184)',
    450: 'rgb(128 147 169)',
    500: 'rgb(100 116 139)',
    550: 'rgb(82 95 114)',
    600: 'rgb(71 85 105)',
    650: 'rgb(61 74 94)',
    700: 'rgb(51 65 85)',
    750: 'rgb(40 53 70)',
    800: 'rgb(30 41 59)',
    850: 'rgb(23 31 43)',
    900: 'rgb(15 23 42)',
    950: 'rgb(2 6 23)',
    1000: 'rgb(0 0 0)',
  },
  mono: {
    DEFAULT: 'rgb(255, 255, 255)',
    50: 'rgb(255, 255, 255)',
    100: 'rgb(240, 240, 240)',
    150: 'rgb(225, 225, 225)',
    200: 'rgb(210, 210, 210)',
    250: 'rgb(195, 195, 195)',
    300: 'rgb(181, 181, 181)',
    350: 'rgb(167, 167, 167)',
    400: 'rgb(153, 153, 153)',
    450: 'rgb(139, 139, 139)',
    500: 'rgb(126, 126, 126)',
    550: 'rgb(112, 112, 112)',
    600: 'rgb(99, 99, 99)',
    650: 'rgb(87, 87, 87)',
    700: 'rgb(74, 74, 74)',
    750: 'rgb(62, 62, 62)',
    800: 'rgb(51, 51, 51)',
    850: 'rgb(39, 39, 39)',
    900: 'rgb(29, 29, 29)',
    950: 'rgb(18, 18, 18)',
    1000: 'rgb(0, 0, 0)',
  }
}


module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}",],
  darkMode: 'class',
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        },
      })
    }),
    require('tailwind-scrollbar')({ nocompatible: true })
  ],
  safelist: [
    {
      pattern: /^(bg|text|border|ring)-.+-(50|100|150|200|250|300|350|400|450|500|550|600|650|700|750|800|850|900|950|1000)$/,
    },
  ],
}