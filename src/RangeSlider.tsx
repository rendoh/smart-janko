import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';
import * as styles from './RangeSlider.css';

export type RangeSliderProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

export const RangeSlider: FC<RangeSliderProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={clsx(styles.rangeSlider, className)}
      type="range"
    />
  );
};
