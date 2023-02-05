import { style } from '@vanilla-extract/css';

export const openButton = style({
  fontSize: 25,
  width: 50,
  height: 50,
  display: 'inline-grid',
  placeItems: 'center',
  background: '#e8e8e8',
  borderRadius: '50%',
  ':hover': {
    background: '#e1e1e1',
  },
});

export const dialog = style({
  width: 400,
  maxWidth: '80%',
  maxHeight: '80%',
  border: 'none',
  borderRadius: 5,
  background: '#fff',
  '::backdrop': {
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
});

export const fields = style({
  display: 'grid',
  gap: '10px 20px',
  gridTemplateColumns: 'auto 1fr',
});

export const label = style({
  fontSize: 14,
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  gridColumn: 1,
});

export const value = style({
  display: 'inline-block',
  textAlign: 'right',
  width: '1.5em',
});

export const field = style({
  gridColumn: 2,
});

export const closeButton = style({
  width: 'fit-content',
  display: 'block',
  margin: '10px 0 0 auto',
  background: '#333',
  color: 'white',
  padding: '5px 12px',
  fontSize: 14,
  borderRadius: 4,
  ':hover': {
    background: '#111',
  },
});

export const fieldInline = style({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
});

export const divider = style({
  gridColumn: '1 / -1',
  background: '#e1e1e1',
  height: 1,
  margin: 5,
});

export const caption = style({
  marginTop: 16,
  fontSize: 12,
});
