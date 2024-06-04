'use client';

import { Dialogue } from '@/components/Dialogue/Dialogue';
import styles from './BookingDialog.module.scss';

interface Props {
  name: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  date: Date;
  timeslot: string;
  message: string;
  resetForm: () => void;
}

export const BookingDialog = ({
  date,
  email,
  lastname,
  message,
  name,
  phoneNumber,
  timeslot,
  resetForm,
}: Props) => {
  if (
    [name, lastname, email, phoneNumber, date, timeslot].some((val) => !val)
  ) {
    return null;
  }

  const intl = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit',
  });

  const formattedDate = intl.format(date);

  const onOk = () => {
    localStorage.setItem(
      'bookingState',
      JSON.stringify({
        date,
        email,
        lastname,
        message,
        name,
        phoneNumber,
        timeslot,
      })
    );
    resetForm();
  };

  const onClose = () => {
    resetForm();
  };

  return (
    <Dialogue
      title="Successfully submitted"
      name="booking"
      onOk={onOk}
      onClose={onClose}
    >
      <ul className={styles.list}>
        <li>Firstname: {name}</li>
        <li>Lastname: {lastname}</li>
        <li>Email: {email}</li>
        <li>Phone: {phoneNumber}</li>
        <li>Date: {formattedDate}</li>
        <li>Time: {timeslot}</li>
        <li>Message: {message}</li>
      </ul>
    </Dialogue>
  );
};
