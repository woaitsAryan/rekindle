'use client';

import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { useRouter } from 'next/navigation';

export function NewChatButton() {
  const router = useRouter();

  return (
    <button
      onClick={e => {
        e.preventDefault();
        router.refresh();
        router.push('/');
      }}
      className={cn(buttonVariants({ size: 'sm', variant: 'outline' }), 'flex gap-2')}
			type='button'
    >
      Reset Chat
    </button>
  );
}
