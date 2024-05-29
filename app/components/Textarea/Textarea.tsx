import { type TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.scss';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = ({ children, ...rest }: Props) => {
  return (
    <textarea {...rest} className={styles.textArea}>
      {children}
    </textarea>
  );
};
