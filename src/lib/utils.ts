import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function acronym(value: string) {
  const array = value?.match(/\b(\w)/g);
  const arrayFirt = array!.slice(0, 1);
  const arrayLast = array!.slice(-1);

  if (array!.length > 1) {
    return [...arrayFirt, ...arrayLast].join('');
  }

  return [...arrayFirt].join('');
}

export function dateFormatter(
  value: string | number | Date,
  locales: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
): string {
  return new Intl.DateTimeFormat(locales, options).format(new Date(value));
}
