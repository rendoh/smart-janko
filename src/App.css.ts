import { style } from '@vanilla-extract/css';

export const app = style({
  width: '100%',
  height: '100dvh',
  display: 'grid',
  placeItems: 'center',
  background: '#f1f1f1',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  marginBottom: 32,
});

export const heading = style({
  fontWeight: 'bold',
  fontSize: 24,
});

export const content = style({
  width: '100%',
});
