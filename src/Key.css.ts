import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const key = recipe({
  base: {
    aspectRatio: '1 / 1',
    boxShadow: '0 3px 3px rgba(0, 0, 0, .08)',
    borderRadius: 5,
    background: 'white',
    display: 'grid',
    placeItems: 'center',
  },
  variants: {
    pressed: {
      true: {
        translate: '0 2px',
        boxShadow: 'none',
      },
    },
  },
});

export const keyChar = style({
  fontSize: '4vw',
  gridArea: '1 / -1',
  color: '#e8e8e8',
  fontWeight: 'bold',
  lineHeight: 1,
  display: 'block',
  textTransform: 'uppercase',
});

export const keyNote = style({
  gridArea: '1 / -1',
  lineHeight: 1,
  display: 'block',
  fontWeight: 'bold',
  color: '#444',
  fontSize: '1.2vw',
});
