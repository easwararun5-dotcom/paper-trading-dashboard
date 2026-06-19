// third-party
import { presetPalettes } from '@ant-design/colors';

// project imports
import ThemeOption from './theme';
import { extendPaletteWithChannels } from 'utils/colorUtils';

const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];

// ==============================|| GREY COLORS BUILDER ||============================== //

function buildGrey() {
  let greyPrimary = [
    '#ffffff',
    '#fafafa',
    '#f5f5f5',
    '#f0f0f0',
    '#d9d9d9',
    '#bfbfbf',
    '#8c8c8c',
    '#595959',
    '#262626',
    '#141414',
    '#000000'
  ];
  let greyConstant = ['#fafafb', '#e6ebf1'];

  return [...greyPrimary, ...greyAscent, ...greyConstant];
}

// ==============================|| DEFAULT THEME - PALETTE ||============================== //

export function buildPalette(presetColor) {
  const lightColors = { ...presetPalettes, grey: buildGrey() };
  const lightPaletteColor = ThemeOption(lightColors, presetColor);

  const commonColor = { common: { black: '#000', white: '#fff' } };

  const extendedLight = extendPaletteWithChannels(lightPaletteColor);
  const extendedCommon = extendPaletteWithChannels(commonColor);
  const darkPalette = {
    ...extendedLight,
    primary: {
      ...extendedLight.primary,
      lighter: '#111d2c',
      100: '#153450',
      200: '#164c7e',
      light: '#4096ff',
      main: '#1677ff',
      dark: '#0958d9',
      700: '#003eb3',
      darker: '#002c8c'
    },
    secondary: {
      ...extendedLight.secondary,
      lighter: '#1f1f1f',
      100: '#262626',
      200: '#303030',
      light: '#595959',
      main: '#8c8c8c',
      dark: '#bfbfbf',
      800: '#d9d9d9',
      darker: '#f0f0f0',
      A100: '#141414',
      A200: '#434343',
      A300: '#8c8c8c',
      contrastText: '#ffffff'
    },
    success: {
      ...extendedLight.success,
      lighter: '#162312',
      light: '#49aa19',
      main: '#52c41a',
      dark: '#95de64'
    },
    warning: {
      ...extendedLight.warning,
      lighter: '#2b2111',
      light: '#d48806',
      main: '#faad14',
      dark: '#ffd666'
    },
    error: {
      ...extendedLight.error,
      lighter: '#2a1215',
      light: '#dc4446',
      main: '#ff4d4f',
      dark: '#ff7875'
    },
    info: {
      ...extendedLight.info,
      lighter: '#112123',
      light: '#13a8a8',
      main: '#36cfc9',
      dark: '#5cdbd3'
    }
  };

  return {
    light: {
      mode: 'light',
      ...extendedCommon,
      ...extendedLight,
      text: {
        primary: extendedLight.grey[700],
        secondary: extendedLight.grey[500],
        disabled: extendedLight.grey[400]
      },
      action: { disabled: extendedLight.grey[300] },
      divider: extendedLight.grey[200],
      background: {
        paper: extendedLight.grey[0],
        default: extendedLight.grey.A50
      }
    },
    dark: {
      mode: 'dark',
      ...extendedCommon,
      ...darkPalette,
      text: {
        primary: '#f0f0f0',
        secondary: '#bfbfbf',
        disabled: '#595959'
      },
      action: { disabled: '#434343' },
      divider: '#303030',
      background: {
        paper: '#1b1d21',
        default: '#111317'
      }
    }
  };
}
