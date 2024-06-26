import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import {defineConfig} from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      gray: {
        4: '#F6F7F30A',
        10: '#F6F7F319',
        20: '#F6F7F333',
        40: '#F6F7F366',
        60: '#F6F7F399',
        80: '#ffffff14',
        200: '#FFFFFF33',
        400: '#ffffff66',
        500: '#F6F7F3',
        600: '#ffffff99',
      },
      green: {
        80: '#41FFAF14',
        400: '#b7ffe114',
        500: '#14F195',
        600: '#14F19599',
      },
      blue: {
        500: '#5ECFFF',
      },
      red: {
        500: '#F8506F',
      },
      lime: {
        10: '#8DCC2F19',
        60: '#8DCC2F99',
        500: '#8DCC2F',
      },
    },
    extend: {
      gridTemplateColumns: {
        'auto-fill': 'repeat(5, auto)',
      },
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  rules: [
    [
      /^grid-cols-auto-(\d+)$/,
      ([, d]) => {
        return {'grid-template-columns': `repeat(${d}, auto)`};
      },
    ],
  ],
});
