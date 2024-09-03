export function formatDate(date: Date) {
  if(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }
  return '';
}

export function mapToNumber(item: any): number | undefined {
  if (item === undefined) return undefined
  else if (item === '') return 0;
  else if (item === 'null') return undefined;
  else if (item === 'undefined') return undefined;
  else return item as number;
}

export function mapToString(item: any): string | undefined {
  if (item === undefined) return ''
  else return item as string;
}

export function mapToDate(item: any): Date | undefined {
  try {
    if (item === undefined) return undefined;
    else return new Date(item);
  } catch {
    return undefined;
  }
}