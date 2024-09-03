export interface BankAccountModel {
  account?: string,
  operation?: string,
  symbol?: string,
  description?: string,
  qty?: number,
  filledQty?: number,
  price?: number,
  status?: string,
  expiration?: Date,
  period?: string,
  noRef?: string,
  extRef?: string,
  userName?: string,
  marginShort?: string,
  netAmount?: number,
  currency?: string,
  exchangeRate?: number,
  osLimit?: number,
  referenceNumber?: string,
  dateTime?: Date,
  telephone?: string,
  userId?: string
}

function mapToNumber(item: any): number | undefined {
  if (item === undefined) return undefined
  else if (item === '') return 0;
  else if (item === 'null') return undefined;
  else if (item === 'undefined') return undefined;
  else return item as number;
}

function mapToString(item: any): string | undefined {
  if (item === undefined) return ''
  else return item as string;
}

function mapToDate(item: any): Date | undefined {
  try {
    if (item === undefined) return undefined;
    else return new Date(item);
  } catch {
    return undefined;
  }
  
}
export function mapToBankAccountModel(item: any): BankAccountModel {
  return {
    account: mapToString(item.account),
    operation: mapToString(item.operation),
    symbol: mapToString(item.symbol),
    description: mapToString(item.description),
    qty: mapToNumber(item.qty),
    filledQty: mapToNumber(item.filledQty),
    price: mapToNumber(item.price),
    status: mapToString(item.status),
    expiration: mapToDate(item.expiration),
    period: mapToString(item.period),
    noRef: mapToString(item.noRef),
    extRef: mapToString(item.extRef),
    userName: mapToString(item.userName),
    marginShort: mapToString(item.marginShort),
    netAmount: mapToNumber(item.netAmount),
    currency: mapToString(item.currency),
    exchangeRate: mapToNumber(item.exchangeRate),
    osLimit: mapToNumber(item.osLimit),
    referenceNumber: mapToString(item.referenceNumber),
    dateTime: mapToDate(item.dateTime),
    telephone: mapToString(item.telephone),
    userId: mapToString(item.userId)
  }
  
}