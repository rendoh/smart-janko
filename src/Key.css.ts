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
    color: '#444',
  },
  variants: {
    pressed: {
      true: {
        translate: '0 2px',
        boxShadow: 'none',
      },
    },
    outOfScale: {
      true: {
        background: '#333',
        color: 'white',
      },
    },
  },
});

export const keyChar = style({
  fontSize: '4vw',
  gridArea: '1 / -1',
  fontWeight: 'bold',
  lineHeight: 1,
  display: 'block',
  textTransform: 'uppercase',
  opacity: 0.1,
});

export const keyNote = style({
  gridArea: '1 / -1',
  lineHeight: 1,
  display: 'block',
  fontWeight: 'bold',
  fontSize: '1.2vw',
  position: 'relative',
  top: '0.6em',
  opacity: 0.8,
});
