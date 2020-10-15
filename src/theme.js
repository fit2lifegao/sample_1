import { createMuiTheme } from '@material-ui/core';

const minSlideOutZIndex = 10000;

export const muiTheme = createMuiTheme({
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Open Sans"',
      '"Graphik"',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#2D3047',
    },
    secondary: {
      main: 'rgb(255, 90, 0)',
    },
  },
});

export const theme = {
  fontStack:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "OpenSans", Graphik, sans-serif',
  fontLight: 300,
  fontNormal: 500,
  fontSemiBold: 600,
  fontBold: 700,
  colors: {
    veryblack: '#000000',
    black: '#1f1f1f',
    grey1: '#333333',
    grey2: '#666666',
    grey3: '#cccccc',
    grey4: '#d7d7d7',
    grey5: '#fafafa',
    grey6: '#f2f2f2',
    grey7: '#f3f3f3',

    white: '#ffffff',

    green1: '#115533',
    green2: '#15653d',
    green3: '#1C8550',
    green4: '#29C677',
    green5: '#2fd481',
    green6: '#91E8BC',
    green7: '#99eac2',
    green8: '#F2FCF7',

    blue1: '#005989',
    blue2: '#00a5ff',
    blue3: '#89d5ff',

    notquiteblack: '#0f0c00',
    yellow1: '#ffcd23',
    yellow2: '#fff5d6',

    red1: '#830800',
    red2: '#AA0B00',
    red3: '#D10D00',
    red4: '#ff1c0d',
    red5: '#FF786F',
    red6: '#ff8a83',
    red7: '#FFC2BE',

    pink: '#ff0066',

    brown: '#622300',

    orange1: '#893000',
    orange2: '#B33F00',
    orange3: '#D84C00',
    orange4: '#ff5a00',
    orange5: '#ffb389',
    orange6: '#ffd9c4',

    // text colors
    greentext1: '#15653d',
    greentext2: '#2fd481',

    bluetext1: '#005989',
    bluetext2: '#00a5ff',

    yellowtext: '#ffcd23',
    blackishtext: '#0f0c00',

    redtext1: '#830800',
    redtext2: '#ff1c0d',

    orangetext1: '#893000',
    orangetext2: '#ff5a00',
    orangetext3: '#ff803b',
    orangetext4: '#ff9623',

    greytext1: '#666666',
    greytext2: '#D6D6D6',

    greyborder: '#a2a2a2',

    transparencyDefault: 'rgba(0,0,0,0.5)',
  },
  scale: {
    // typographic scale
    stepUp6: '2.027em',
    stepUp5: '1.802em',
    stepUp4: '1.602em',
    stepUp3: '1.424em',
    stepUp2: '1.266em',
    stepUp1: '1.125em',
    baseline: '1em',
    stepDown1: '0.889em',
    stepDown2: '0.79em',
    stepDown3: '0.702em',
    stepDown4: '0.624em',
    stepDown5: '0.555em',
    stepDown6: '0.493em',
  },
  slideOutZIndex: prevTheme =>
    (prevTheme.slideOutZIndex || minSlideOutZIndex) + 1,
};
