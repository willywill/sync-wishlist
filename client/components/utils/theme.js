import pipe from 'ramda/src/pipe';
import split from 'ramda/src/split';
import map from 'ramda/src/map';
import replace from 'ramda/src/replace';

/**
 * Colors - Primary, Secondary, Success, Danger, Warning, Info, Light, Dark
 */
export const PRIMARY_COLOR = 'hsl(264, 73%, 58%)';
export const SECONDARY_COLOR = 'hsl(645, 71%, 51%)';
export const SUCCESS_COLOR = 'hsl(143, 73%, 58%)';
export const DANGER_COLOR = 'hsl(24, 73%, 58%)';
export const WARNING_COLOR = 'hsl(40, 73%, 58%)';
export const INFO_COLOR = 'hsl(215, 71%, 51%)';
export const LIGHT_COLOR = 'hsl(198, 17%, 70%)';
export const DARK_COLOR = 'hsl(230, 27%, 17%)';
export const DARK_COLOR_TRANSPARENT = 'hsla(230, 27%, 17%, 0.05)';
export const WHITE = 'hsl(0, 0%, 100%)';

/**
 * Fonts
 */
export const PRIMARY_FONT = "'Nunito', sans-serif";
export const SECONDARY_FONT = "'Rubik', sans-serif";

/**
 * Font Sizes
 */
export const SMALL_SIZE = '0.75em';
export const MEDIUM_SIZE = '1.75em';
export const LARGE_SIZE = '2.75em';

/**
 * Utils
 */
const splitHSL = pipe(
  split(', '),
  map(replace(/hsl|\(|\)|%/g, '')),
  map(Number),
);

export const shiftHSL = ({ hue = 0, saturation = 0, lightness = 0 }, hsl) => {
  const [h, s, l] = splitHSL(hsl);
  return `hsl(${h + hue}, ${s + saturation}%, ${l + lightness}%)`;
};

const standardColors = {
  primary: PRIMARY_COLOR,
  secondary: SECONDARY_COLOR,
  success: SUCCESS_COLOR,
  danger: DANGER_COLOR,
  warning: WARNING_COLOR,
  info: INFO_COLOR,
  light: LIGHT_COLOR,
  dark: DARK_COLOR,
};

export const getStandardColors = (colorProp) => standardColors[colorProp] || PRIMARY_COLOR;
