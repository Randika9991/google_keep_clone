/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

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
    text: '#151718',
    background: '#151718',
    background2: '#3d4242',
    tint: tintColorDark,
    icon: '#151718',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  colourFull: {
    pastelBlue: '#A7C7E7',        // Light blue, often used for backgrounds
    pastelGreen: '#B4E197',       // Soft green for calm, success actions
    pastelPink: '#F5A9B8',        // Light pink for friendly UIs
    pastelYellow: '#FFF5BA',      // Soft yellow, ideal for warnings
    pastelPurple: '#C3B1E1',      // Light purple for accenting
  },
  pastelBackgrounds: {
    pastelBlue: '#A7C7E7',                   // Light pastel blue
    pastelGreen: '#B4E197',                  // Soft green, gentle on the eyes
    pastelPink: '#F5A9B8',                   // Friendly pink tone
    pastelYellow: '#ffe200',                 // Soft yellow, good for highlighting without high contrast
    pastelPurple: '#C3B1E1',
    pastelWhite: '#F8F8F8',
  }
};


