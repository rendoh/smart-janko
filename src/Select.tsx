import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import * as styles from './Select.css';

export type SelectProps = ComponentPropsWithoutRef<'select'> & {
  selectClassName?: string;
};

export const Select: FC<SelectProps> = ({
  className,
  selectClassName,
  children,
  ...props
}) => (
  <span className={clsx(styles.wrapper, className)}>
    <select {...props} className={clsx(styles.select, selectClassName)}>
      {children}
    </select>
    <FaCaretDown className={styles.icon} />
  </span>
);
