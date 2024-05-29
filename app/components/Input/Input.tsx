import { type InputHTMLAttributes } from 'react';
import cx from 'classnames';
import styles from './Input.module.scss';
import Image from 'next/image';
import { Text } from '../Text/Text';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  iconPath?: string;
  validationErrorText?: string;
}

export const Input = ({
  className,
  iconPath,
  validationErrorText,
  ...props
}: Props) => {
  return (
    <div className={cx(styles.inputContainer, className)}>
      <input
        className={cx(styles.input, { [styles.hasIcon]: !!iconPath })}
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
