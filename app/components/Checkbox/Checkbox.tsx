import { useState } from 'react';
import { Text } from '../Text/Text';
import styles from './Checkbox.module.scss';

interface Props {
  labelText: string;
  setValues: (isChecked: boolean) => void;
}

export const Checkbox = ({ labelText, setValues }: Props) => {
  const [checked, setChecked] = useState(false);

  const checkboxClickHandler = () => {
    setChecked(!checked);
    setValues(!checked);
  };

  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={checkboxClickHandler}
      />
      <Text as="span" fontFamily="cormorant">
        {labelText}
      </Text>
    </label>
  );
};
