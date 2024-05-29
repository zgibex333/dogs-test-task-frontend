'use client';
import { Text } from '@/components/Text/Text';
import styles from './Timeslots.module.scss';
import { Radio } from '@/components/Radio/Radio';

const TIMESLOTS = [
  '11 am - 12 pm',
  '12 pm - 1 pm',
  '1 pm - 2 pm',
  '3 pm - 4 pm',
  '4 pm - 5pm',
];

interface Props {
  validationError?: string;
}

export const Timeslots = ({ validationError }: Props) => {
  return (
    <fieldset className={styles.container}>
      <legend>
        <Text as="h3" fontFamily="cormorant" classname={styles.title}>
          Choose a timeslot on Dec. 11th, 2021:
        </Text>
      </legend>
      <fieldset className={styles.optionsContainer}>
        {TIMESLOTS.map((slot) => (
          <Radio key={slot} labelText={slot} name="timeslot" value={slot} />
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
