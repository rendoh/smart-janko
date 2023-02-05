import { CSSProperties, style } from '@vanilla-extract/css';

const sliderThumbStyle: CSSProperties = {
  WebkitAppearance: 'none',
  appearance: 'none',
  background: '#666',
  width: 24,
  height: 18,
  borderRadius: 4,
  border: '1px solid #333',
};

const activeSliderThumbStyle: CSSProperties = {
  cursor: 'grabbing',
  background: '#111',
};

export const rangeSlider = style({
  WebkitAppearance: 'none',
  appearance: 'none',
  cursor: 'grab',
  background: '#e8e8e8',
  height: 10,
  width: '100%',
  borderRadius: 10,
  outline: 'none',
  border: '1px solid transparent',
  ':focus': {
    borderColor: '#808080',
    background: 'white',
  },
  '::-webkit-slider-thumb': sliderThumbStyle,
  '::-moz-range-thumb': sliderThumbStyle,
  selectors: {
    '&::-moz-focus-outer': {
      border: 0,
    },
    '&:active::-webkit-slider-thumb': activeSliderThumbStyle,
    '&:active::-moz-range-thumb': activeSliderThumbStyle,
  },
});
