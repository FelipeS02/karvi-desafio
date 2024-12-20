import { FC, ReactNode } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'px-2 gap-1 inline-flex text-semibold whitespace-nowrap bg-gray-500 rounded-full text-primary h-fit',
  {
    variants: {
      size: {
        lg: 'text-[16px] leading-[24px]',
        default: 'text-[14px] leading-[20px]',
        sm: 'text-[12px] leading-[18px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  RightIcon?: LucideIcon;
  children: ReactNode;
  LeftIcon?: LucideIcon;
  className?: string;
}

const Badge: FC<BadgeProps> = ({
  size,
  LeftIcon,
  RightIcon,
  children,
  className = '',
}) => {
  return (
    <div className={cn(badgeVariants({ size, className }))}>
      {LeftIcon ? <LeftIcon /> : null}
      <span>{children}</span>
      {RightIcon ? <RightIcon /> : null}
    </div>
  );
};

export default Badge;
