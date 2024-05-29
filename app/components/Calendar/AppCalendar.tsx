'use client';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './AppCalendar.module.scss';
import './AppCalendar.scss';
import { Text } from '../Text/Text';
import { useState } from 'react';

const today = new Date();

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props {
  validationError?: string;
}

const formatDate = (date: Value) => {
  if (date instanceof Date) {
    const yyyy = date.getFullYear();
    const mm = `${date.getMonth() + 1}`.padStart(2, '0');
    const dd = `${date.getDate()}`.padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  return '';
};

export const AppCalendar = ({ validationError }: Props) => {
  const [date, setDate] = useState<Value>(() => new Date());
  return (
    <div className={styles.calendarWrapper}>
      <input
        tabIndex={-1}
        type="date"
        name="date"
        defaultValue={formatDate(date)}
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
        value={date}
        onChange={(date) => {
          setDate(date);
        }}
        showFixedNumberOfWeeks
        defaultValue={today}
      />
      <Text as="span" fontFamily="cormorant" classname={styles.calendarTitle}>
        Select date
      </Text>
      {validationError && (
        <Text as="span" fontFamily="cormorant" classname={styles.errorText}>
          {validationError}
        </Text>
      )}
    </div>
  );
};
