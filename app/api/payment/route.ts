import { type BookingFormState } from '@/constants/types';
import { createBackendOrder } from '@/lib/paypal';

export async function POST(request: Request) {
  const body: BookingFormState = await request.json();
  const order = await createBackendOrder(body);
  return Response.json({ order });
}
