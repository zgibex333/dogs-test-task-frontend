export async function POST() {
  const order = await createOrder();
  console.log(order);
  return Response.json({ order });
}

// use the orders api to create an order
async function createOrder() {
  // create accessToken using your clientID and clientSecret
  // for the full stack example, please see the Standard Integration guide
  // https://developer.paypal.com/docs/multiparty/checkout/standard/integrate/
  const accessToken =
    'A21AAKyIHOtnK_uLBo5yrOVyNGBmviLpyAzue0RAL2nuNEDJTkvxgjmnsauLdp-0urH5kwJNMVphvHr20FzTbekqb8m7GeFmw';
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
            description: 'Greatest properly off ham exercise all.',
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
}
