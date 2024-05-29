import { type TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.scss';
import { Text } from '@/components/Text/Text';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  validationErrorText?: string;
}

export const Textarea = ({ validationErrorText, ...rest }: Props) => {
  return (
    <div>
      <textarea {...rest} className={styles.textArea} />
      {validationErrorText && (
        <Text as="span" fontFamily="cormorant">
          {validationErrorText}
        </Text>
      )}
    </div>
  );
};
