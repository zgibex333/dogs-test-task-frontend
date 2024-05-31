'use client';

import { Dialogue } from '@/components/Dialogue/Dialogue';
import {
  PayPalButtons,
  type PayPalButtonsComponentProps,
  PayPalScriptProvider,
  type ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';
import { useSearchParams } from 'next/navigation';

const initialOptions: ReactPayPalScriptOptions = {
  clientId:
    'AZSfvd5a3vP058lduSW7Zeq5dOJdfva2wcqa0ZBaLdnEIGIKME3cCCAWG9e3WmZDS6l8ddHrQl2vtJJj',

  // Add other options as needed
};

const createOrder: PayPalButtonsComponentProps['createOrder'] = async () => {
  try {
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cart: [{ id: 'YOUR_PRODUCT_ID', quantity: 'YOUR_PRODUCT_QUANTITY' }],
      }),
    });

    const data: any = await response.json();
    console.log(data);
    if (!data.order.id) {
      const errorDetail = data.order?.details?.[0];
      const errorMessage = errorDetail
        ? `${errorDetail.issue} ${errorDetail.description} (${data.order.debug_id})`
        : 'Unexpected error occurred, please try again.';

      throw new Error(errorMessage);
    }
    console.log('return works');
    return data.order.id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const FormSubmittedDialogue = () => {
  const searchParams = useSearchParams();

  return (
    <Dialogue title="Successfully submitted">
      <ul>
        <li>Firstname: {searchParams.get('name')}</li>
        <li>Lastname: {searchParams.get('lastname')}</li>
        <li>Email: {searchParams.get('email')}</li>
        <li>Phone: {searchParams.get('phoneNumber')}</li>
        <li>Date: {searchParams.get('date')}</li>
        <li>Time: {searchParams.get('timeslot')}</li>
      </ul>

      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons createOrder={createOrder} />
      </PayPalScriptProvider>
    </Dialogue>
  );
};
