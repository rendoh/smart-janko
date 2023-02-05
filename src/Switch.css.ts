import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

export const wrapper = style({
  display: 'inline-block',
  position: 'relative',
  borderRadius: '100vmax',
  ':focus-within': {
    outline: '1px solid #808080',
  },
});

export const input = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  opacity: 0,
});

export const icon = style({
  height: '1em',
  width: '2em',
  border: '1px solid #e8e8e8',
  background: '#e8e8e8',
  cursor: 'pointer',
  display: 'block',
  borderRadius: '100vmax',
  position: 'relative',
  '::before': {
    content: '',
    width: calc.subtract('1em', '4px'),
    height: calc.subtract('1em', '4px'),
    background: '#fff',
    display: 'block',
    borderRadius: '50%',
    position: 'absolute',
    left: 1,
    top: 1,
    transition: 'translate 0.3s ease-out',
  },
  selectors: {
    [`${input}:checked + &`]: {
      background: '#666',
    },
    [`${input}:checked + &::before`]: {
      translate: '134% 0',
    },
    [`${input}:disabled + &`]: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
    [`${input}:disabled + &::before`]: {
      background: '#e8e8e8',
    },
  },
});
