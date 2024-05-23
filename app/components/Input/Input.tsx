import { type InputHTMLAttributes } from 'react';
import cx from 'classnames';
import styles from './Input.module.scss';
import Image from 'next/image';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  iconPath?: string;
}

export const Input = ({ className, iconPath, ...props }: Props) => {
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
    </div>
  );
};
