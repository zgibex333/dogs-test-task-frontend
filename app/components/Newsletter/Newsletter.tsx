'use client';

import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { sendLetter } from './Newsletter.action';
import { useState, useTransition } from 'react';

interface Props {
  className?: string;
  placeholder?: string;
}

export const Newsletter = ({ className, placeholder }: Props) => {
  const [value, setValue] = useState('');
  const [isPending, startTransition] = useTransition();
  const subscribeToNewsletter = () => {
    startTransition(async () => {
      const response = await sendLetter(value);
      setValue(response ?? '');
    });
  };

  return (
    <>
      <Input
        value={value}
        onValueChange={(val: string) => {
          setValue(val);
        }}
        className={className}
        placeholder={placeholder}
      />
      <Button onClick={subscribeToNewsletter} disabled={isPending}>
        Send
      </Button>
    </>
  );
};
