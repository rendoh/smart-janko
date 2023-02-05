import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';
import * as styles from './Switch.css';

export type SwitchProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

export const Switch: FC<SwitchProps> = ({ className, ...props }) => (
  <label className={styles.wrapper}>
    <input
      {...props}
      className={clsx(styles.input, className)}
      type="checkbox"
    />
    <span className={styles.icon} />
  </label>
);
