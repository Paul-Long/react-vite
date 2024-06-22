import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import {defineConfig} from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      gray: {
        40: '#F6F7F30A',
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
        500: '#8DCC2F',
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
