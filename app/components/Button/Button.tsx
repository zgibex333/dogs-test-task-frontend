import { type ReactNode } from 'react';
import cx from 'classnames';
import styles from './Button.module.scss';
import { Text } from '@/components/Text/Text';

interface Props {
  children: ReactNode;
  classname?: string;
}

export const Button = ({ children, classname }: Props) => {
  return (
    <button className={cx(styles.button, classname)}>
      <Text as="span" fontFamily="cormorant">
        {children}
      </Text>
    </button>
  );
};
