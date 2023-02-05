import { globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
  fontFamily: 'sans-serif',
});

globalStyle('*', {
  outline: 'revert',
});

globalStyle('button', {
  cursor: 'pointer',
});
