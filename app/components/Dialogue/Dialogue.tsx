'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';
import styles from './Dialogue.module.scss';
import { Text } from '../Text/Text';
import { Button } from '@/components/Button/Button';

interface Props {
  title: string;
  children: ReactNode;
  onClose?: () => void;
  onOk?: () => void;
}

export const Dialogue = ({ title, onOk, onClose, children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get('showDialog');

  useEffect(() => {
    if (showDialog === 'y') {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const onCloseDialog = () => {
    onClose?.();
    router.replace(pathname);
  };

  const onOkDialog = () => {
    onOk?.();
    router.replace(pathname);
  };

  return (
    <dialog ref={dialogRef} className={styles.dialogue} onClose={onCloseDialog}>
      <header className={styles.header}>
        <Text as="h2" fontFamily="cormorant">
          {title}
        </Text>
      </header>
      <div className={styles.content}>{children}</div>
      <div className={styles.controls}>
        <Button onClick={onOkDialog}>Ok</Button>
        <Button colorType="transparent" onClick={onCloseDialog}>
          Close
        </Button>
      </div>
    </dialog>
  );
};
