'use client';

import { Dialogue } from '@/components/Dialogue/Dialogue';
import { Text } from '@/components/Text/Text';
import { createClientOrder } from '@/lib/paypal';
import {
  PayPalButtons,
  PayPalScriptProvider,
  type ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';
import { useState } from 'react';

interface Props {
  cardNumber: string;
  cardHolder: string;
  cvc: string;
  expiration: string;
  resetForm: () => void;
}

const initialOptions: ReactPayPalScriptOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
};

export default function PaymentDialog({ resetForm }: Props) {
  const [errorMessage, setErrorMessage] = useState('');

  const onOk = () => {
    resetForm();
  };

  const onClose = () => {
    resetForm();
  };

  return (
    <>
      <Dialogue name="payment" title="Payment" onOk={onOk} onClose={onClose}>
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            createOrder={createClientOrder()}
            onError={() => {
              setErrorMessage('Unexpected error occured');
            }}
          />
        </PayPalScriptProvider>
      </Dialogue>
      <Text as="h3" fontFamily="cormorant">
        {errorMessage}
      </Text>
    </>
  );
}
