/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
// colors.js
export const colors = {
  // Colores principales
  lightest: '#F0E9F2',
  light: '#B9A3D9',
  primary: '#5B38A6',
  dark: '#4F328C',
  darkest: '#392A59',
};

// Gradientes predefinidos
export const gradients = {
  // Gradiente principal (de más claro a más oscuro)
  primary: [colors.light, colors.primary, colors.dark],
  
  // Gradiente suave
  soft: [colors.lightest, colors.light],
  
  // Gradiente medio
  medium: [colors.primary, colors.dark],
  
  // Gradiente intenso
  intense: [colors.dark, colors.darkest],
  
  // Gradiente completo
  full: [colors.lightest, colors.light, colors.primary, colors.dark, colors.darkest],
  
  // Gradiente vertical suave
  verticalSoft: [colors.lightest, colors.primary],
  
  // Gradiente purple dream
  dream: [colors.light, colors.primary, colors.darkest],
};
export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
