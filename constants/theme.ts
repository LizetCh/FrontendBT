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

// Paleta de colores personalizada
export const colors = {
  // Colores principales
  lightest: '#F0E9F2',
  light: '#B9A3D9',
  primary: '#5B38A6',
  dark: '#4F328C',
  darkest: '#392A59',
  yellow :'#ecb605',
  
  // Colores complementarios
  white: '#FFFFFF',
  black: '#000000',
  
  // Colores semánticos
  background: '#F0E9F2',
  surface: '#FFFFFF',
  text: '#392A59',
  textLight: '#5B38A6',
  border: '#B9A3D9',
};

// Gradientes predefinidos
export const gradients = {
  // Gradiente principal (de más claro a más oscuro)
  primary: [colors.light, colors.primary, colors.dark],
  
  // Gradiente suave
  soft: [ colors.yellow, colors.darkest],
  
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
  
  // Gradientes adicionales útiles
  subtle: [colors.lightest, colors.light, colors.primary],
  darkMode: [colors.darkest, colors.dark],
  vibrant: [colors.light, colors.primary],
};

// Direcciones de gradientes
export const gradientDirections = {
  vertical: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
  horizontal: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
  diagonal: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  diagonalReverse: { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } },
};

// Espaciado consistente
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Bordes redondeados
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  round: 9999,
};

// Sombras
export const shadows = {
  sm: {
    shadowColor: colors.darkest,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: colors.darkest,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.darkest,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
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