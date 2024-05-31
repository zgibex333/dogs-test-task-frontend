'use client';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './AppCalendar.module.scss';
import './AppCalendar.scss';
import { Text } from '../Text/Text';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  validationError?: string;
  onChange: (date: Date) => void;
  value: Date;
}

export const AppCalendar = ({ validationError, onChange, value }: Props) => {
  const onDateChangeHandler = (date: Value) => {
    onChange(date as Date);
  };

  return (
    <div className={styles.calendarWrapper}>
      <Calendar
        calendarType="gregory"
        view="month"
        next2Label={null}
        prev2Label={null}
        formatShortWeekday={(_, date) =>
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]
        }
        value={value}
        onChange={onDateChangeHandler}
        showFixedNumberOfWeeks
      />
      {/* <Text as="span" fontFamily="cormorant" classname={styles.calendarTitle}>
        Select date
      </Text> */}
      {validationError && (
        <Text as="span" fontFamily="cormorant" classname={styles.errorText}>
          {validationError}
        </Text>
      )}
    </div>
  );
};
