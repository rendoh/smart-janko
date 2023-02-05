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
    color: '#222',
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
        background: '#222',
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
  opacity: 0.12,
  position: 'relative',
  top: '0.1em',
});

export const keyNote = style({
  gridArea: '1 / -1',
  lineHeight: 1,
  display: 'block',
  fontWeight: 'bold',
  fontSize: '1.3vw',
  position: 'relative',
  top: '-1.1em',
  opacity: 0.8,
  textAlign: 'center',
});

export const keyNoteSmall = style({
  display: 'block',
  fontSize: '75%',
  marginTop: '0.3em',
  marginBottom: '-0.8em',
});
