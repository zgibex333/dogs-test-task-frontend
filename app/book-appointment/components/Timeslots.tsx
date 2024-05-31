'use client';
import { Text } from '@/components/Text/Text';
import styles from './Timeslots.module.scss';
import { Radio } from '@/components/Radio/Radio';
import { TIMESLOTS } from '@/constants/timeslots';

interface Props {
  validationError?: string;
  onValueChange?: (value: string) => void;
  value?: string;
}

export const Timeslots = ({ validationError, onValueChange, value }: Props) => {
  const onRadioButtonClickHandler = (value: string) => () => {
    onValueChange?.(value);
  };

  return (
    <fieldset className={styles.container}>
      <legend>
        <Text as="h3" fontFamily="cormorant" classname={styles.title}>
          Choose a timeslot on Dec. 11th, 2021:
        </Text>
      </legend>
      <fieldset className={styles.optionsContainer}>
        {TIMESLOTS.map((slot) => (
          <Radio
            key={slot}
            labelText={slot}
            name="timeslot"
            value={slot}
            checked={slot === value}
            onChange={onRadioButtonClickHandler(slot)}
          />
        ))}
      </fieldset>
      {validationError && (
        <Text as="span" fontFamily="cormorant" classname={styles.errorText}>
          {validationError}
        </Text>
      )}
    </fieldset>
  );
};
