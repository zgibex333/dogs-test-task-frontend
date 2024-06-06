'use server';

import { EmailTemplate } from '@/components/EmailTemplate/EmailTemplate';
import { NewsLetterSchema } from '@/constants/validationSchemas';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_RESEND_API);

export const sendLetter = async (email: string) => {
  try {
    await NewsLetterSchema.validate({ email });
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: `From DOGS app`,
      react: EmailTemplate({ message: 'hello' }),
      text: 'Hi, you have a message from your customer',
    });

    if (data && !error) {
      return 'Successfully sent';
    }

    if (error) {
      return 'Server error';
    }
  } catch (e) {
    return 'Invalid email';
  }
};
