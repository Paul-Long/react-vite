import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import {defineConfig} from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      gray: {
        40: '#ffffff0a',
        60: '#FFFFFF99',
        80: '#ffffff14',
        200: '#FFFFFF33',
        400: '#ffffff66',
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
});
