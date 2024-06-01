import { type BookingFormState } from '@/constants/types';
import { type PayPalButtonsComponentProps } from '@paypal/react-paypal-js';

export const createClientOrder =
  (body: BookingFormState): PayPalButtonsComponentProps['createOrder'] =>
  async () => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data: any = await response.json();

      if (!data.order.id) {
        const errorDetail = data.order?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${data.order.debug_id})`
          : 'Unexpected error occurred, please try again.';

        throw new Error(errorMessage);
      }
      return data.order.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const getAccessToken = async () => {
  try {
    const response = await fetch(
      'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'en_US',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            btoa(
              `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.NEXT_PRIVATE_PAYPAL_KEY}`
            ),
        },
        body: 'grant_type=client_credentials',
      }
    );
    const { access_token: accessToken }: { access_token: string } =
      await response.json();
    return accessToken;
  } catch (e) {
    throw new Error('Unable to get access token');
  }
};

export const createBackendOrder = async ({
  date,
  email,
  timeslot,
}: BookingFormState) => {
  const accessToken = await getAccessToken();
  const response = await fetch(
    'https://api-m.sandbox.paypal.com/v2/checkout/orders',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        purchase_units: [
          {
            items: [
              {
                name: 'Visit',
                quantity: '1',
                unit_amount: {
                  currency_code: 'USD',
                  value: '100.00',
                },
              },
            ],
            description: `Email: ${email}: Visit on ${date.toString().split('T')[0]} : ${timeslot}`,
            amount: {
              currency_code: 'USD',
              value: '100.00',
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: '100.00',
                },
              },
            },
            reference_id: 'd9f80740-38f0-11e8-b467-0ed5f89f718b',
          },
        ],
        intent: 'CAPTURE',
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
              payment_method_selected: 'PAYPAL',
              brand_name: 'EXAMPLE INC',
              locale: 'en-US',
              landing_page: 'LOGIN',
              shipping_preference: 'GET_FROM_FILE',
              user_action: 'PAY_NOW',
              return_url: 'https://example.com/returnUrl',
              cancel_url: 'https://example.com/cancelUrl',
            },
          },
        },
      }),
    }
  );

  return await response.json();
};
