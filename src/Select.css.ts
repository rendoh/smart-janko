import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'inline-block',
  position: 'relative',
});

export const select = style({
  background: '#e8e8e8',
  borderRadius: 4,
  padding: '5px 25px 5px 10px',
  cursor: 'pointer',
});

export const icon = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: '5px',
  margin: 'auto',
  pointerEvents: 'none',
});
