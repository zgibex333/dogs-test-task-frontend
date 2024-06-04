'use client';
import { type ChangeEvent, useState, type TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.scss';
import { Text } from '@/components/Text/Text';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  validationErrorText?: string;
  onValueChange?: (value: string) => void;
}

export const Textarea = ({
  validationErrorText,
  onValueChange,
  ...rest
}: Props) => {
  const [value, setValue] = useState('');
  const onTexareaChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onValueChange?.(e.target.value);
  };
  return (
    <div className={styles.container}>
      <textarea
        value={value}
        className={styles.textArea}
        onChange={onTexareaChangeHandler}
        {...rest}
      />
      {validationErrorText && (
        <Text
          as="span"
          fontFamily="cormorant"
          classname={styles.errorText}
          data-testid="textarea-validation-error"
        >
          {validationErrorText}
        </Text>
      )}
    </div>
  );
};
