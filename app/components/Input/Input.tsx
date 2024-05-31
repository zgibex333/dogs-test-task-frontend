'use client';
import { type ChangeEvent, useState, type InputHTMLAttributes } from 'react';
import cx from 'classnames';
import styles from './Input.module.scss';
import Image from 'next/image';
import { Text } from '../Text/Text';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  iconPath?: string;
  validationErrorText?: string;
  onValueChange?: (value: string) => void;
}

export const Input = ({
  className,
  iconPath,
  validationErrorText,
  onValueChange,
  ...props
}: Props) => {
  const [value, setValue] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onValueChange?.(e.target.value);
  };

  return (
    <div className={cx(styles.inputContainer, className)}>
      <input
        className={cx(styles.input, { [styles.hasIcon]: !!iconPath })}
        onChange={onChangeHandler}
        value={value}
        {...props}
      />
      {iconPath && (
        <button className={styles.iconButton}>
          <Image src={iconPath} alt="icon" width={40} height={40} />
        </button>
      )}
      {validationErrorText && (
        <Text as="span" fontFamily="cormorant" classname={styles.errorText}>
          {validationErrorText}
        </Text>
      )}
    </div>
  );
};
