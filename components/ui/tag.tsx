import { ButtonHTMLAttributes, forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const tagVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 rounded-full py-1',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline:
          'hover:bg-blue-250 border border-blue-500 click:bg-blue-300 text-blue-800',
      },
      size: {
        default: 'px-2 data-[close=true]:pr-2',
        sm: 'px-3 data-[close=true]:pr-2 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface TagProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tagVariants> {
  asChild?: boolean;
  close?: boolean;
}

const Tag = forwardRef<HTMLButtonElement, TagProps>(
  (
    { className, size, asChild = false, variant, close = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(tagVariants({ size, className, variant }))}
        ref={ref}
        data-close={close}
        {...props}
      />
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
