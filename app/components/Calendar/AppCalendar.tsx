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
  name?: string;
}

const formatDate = (date: Date | string) => {
  date = new Date(date);
  const day = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
  const month = `${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}`;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const AppCalendar = ({
  validationError,
  onChange,
  value,
  name,
}: Props) => {
  const onDateChangeHandler = (date: Value) => {
    onChange(date as Date);
  };

  return (
    <div className={styles.calendarWrapper}>
      <input
        type="date"
        defaultValue={formatDate(value)}
        name={name}
        tabIndex={-1}
        className={styles.nativeDate}
      />
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
        locale="en-US"
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
