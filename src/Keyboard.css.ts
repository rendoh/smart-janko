import { style } from '@vanilla-extract/css';

export const keyboard = style({
  display: 'grid',
  gap: 10,
  padding: 10,
  background: '#e1e1e1',
  width: '100%',
  WebkitUserSelect: 'none',
  userSelect: 'none',
  WebkitTouchCallout: 'none',
  WebkitTapHighlightColor: 'rgba(255, 255, 255, 0)',
});
