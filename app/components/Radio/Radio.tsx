'use client';
import { Text } from '../Text/Text';
import { type InputHTMLAttributes } from 'react';
import styles from './Radio.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
}

export const Radio = ({ labelText, ...props }: Props) => {
  return (
    <label className={styles.label}>
      <input type="radio" className={styles.input} {...props} />
      <Text as="span" fontFamily="cormorant" classname={styles.labelText}>
        {labelText}
      </Text>
    </label>
  );
};
