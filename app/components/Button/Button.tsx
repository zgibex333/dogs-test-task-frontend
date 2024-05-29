import { type ButtonHTMLAttributes } from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';
import { Text } from '@/components/Text/Text';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, className }: Props) => {
  return (
    <button className={cx(styles.button, className)}>
      <Text as="span" fontFamily="cormorant">
        {children}
      </Text>
    </button>
  );
};
