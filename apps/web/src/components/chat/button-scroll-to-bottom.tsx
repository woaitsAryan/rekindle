'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { useAtBottom } from '@/lib/hooks/use-at-bottom';
import { Button, type ButtonProps } from '../ui/button';
import { ArrowDownIcon } from 'lucide-react';

export function ButtonScrollToBottom({ className, ...props }: ButtonProps) {
  const isAtBottom = useAtBottom();

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'bg-background absolute right-4 top-1 z-10 transition-opacity duration-300 sm:right-8 md:top-2',
        isAtBottom ? 'opacity-0' : 'opacity-100',
        className,
      )}
      onClick={() =>
        window.scrollTo({
          top: document.body.offsetHeight,
          behavior: 'smooth',
        })
      }
      {...props}
    >
      <ArrowDownIcon />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  );
}
