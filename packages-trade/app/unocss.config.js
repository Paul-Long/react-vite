import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import {defineConfig} from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      gray: {
        400: '#ffffff66',
        500: '#ffffff99',
      },
      green: {
        400: '#b7ffe114',
        500: '#14F195',
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
