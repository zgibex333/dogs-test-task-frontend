import { type ButtonHTMLAttributes } from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';
import { Text } from '@/components/Text/Text';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  colorType?: 'transparent' | 'default';
}

export const Button = ({
  children,
  className,
  colorType = 'default',
  ...rest
}: Props) => {
  return (
    <button
      className={cx(styles.button, className, styles[colorType])}
      {...rest}
    >
      <Text as="span" fontFamily="cormorant">
        {children}
      </Text>
    </button>
  );
};
