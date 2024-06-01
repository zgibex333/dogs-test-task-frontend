'use client';

import { useState } from 'react';
import { Dialogue } from '@/components/Dialogue/Dialogue';
import { Text } from '@/components/Text/Text';
import { type BookingFormState } from '@/constants/types';
import { createClientOrder } from '@/lib/paypal';
import {
  PayPalButtons,
  PayPalScriptProvider,
  type ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';
import { useSearchParams } from 'next/navigation';
import styles from './FormSubmittedDialogue.module.scss';

const initialOptions: ReactPayPalScriptOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
};

export const FormSubmittedDialogue = () => {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState('');

  const name = searchParams.get('name')?.toString() ?? '';
  const lastname = searchParams.get('lastname')?.toString() ?? '';
  const email = searchParams.get('email')?.toString() ?? '';
  const phoneNumber = searchParams.get('phoneNumber')?.toString() ?? '';
  const date = searchParams.get('date')?.toString() ?? '';
  const timeslot = searchParams.get('timeslot')?.toString() ?? '';
  const message = searchParams.get('message')?.toString() ?? '';

  if (
    [name, lastname, email, phoneNumber, date, timeslot].some((val) => !val)
  ) {
    return null;
  }

  const orderBody: BookingFormState = {
    name,
    date: new Date(date),
    email,
    lastname,
    message,
    phoneNumber,
    timeslot,
  };
  console.log(date);
  return (
    <Dialogue title="Successfully submitted">
      {errorMessage && (
        <Text as="p" fontFamily="cormorant" classname={styles.error}>
          {errorMessage}
        </Text>
      )}
      <ul className={styles.list}>
        <li>Firstname: {name}</li>
        <li>Lastname: {lastname}</li>
        <li>Email: {email}</li>
        <li>Phone: {phoneNumber}</li>
        <li>Date: {new Date(date).toISOString().split('T')[0]}</li>
        <li>Time: {timeslot}</li>
      </ul>

      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={createClientOrder(orderBody)}
          onError={() => {
            setErrorMessage('Unexpected error occured');
          }}
        />
      </PayPalScriptProvider>
    </Dialogue>
  );
};
