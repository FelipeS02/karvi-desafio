import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isFilterMultiple = (filterSelection: unknown) =>
  Array.isArray(filterSelection);

export const timeout = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms));
