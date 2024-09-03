import React from 'react';
import './style/style.css';
import Table from './components/Table';

const data = [
  {
    account: '10000000',
    operation: 'buy',
    symbol: 'NA',
    description: 'national bank of cda',
    qty: '11',
    filledQty: '1',
    price: '135.00',
    status: 'Waiting',
    date: '2023/01/04 03:05:43',
    expiration: '2022/12/22',
    peroid: 'transmission',
    noRef: '95749207',
    extRef: '2-XXXXXXXX-0',
    userName: 'FIRST-NAME LAST-NAME',
    marginShort: '10103ZA - US Margin',
    netAmount: '1152.95',
    currency: 'usd',
    exchangeRate: '1.3357',
    osLimit: '140.0',
    referenceNumber: '1234567890',
    telephone: '0000-0000-0000',
    userId: '12344321'
  },
  {
    account: '20000000',
    operation: 'Buy',
    symbol: 'NA',
    description: 'NATIONAL BANK OF CDA',
    qty: 11,
    filledQty: 1,
    price: 135.00,
    status: 'Waiting',
    date: '2023/01/04 03:05:43',
    expiration: '2022/12/22',
    peroid: 'transmission',
    noRef: '95749207',
    extRef: '2-XXXXXXXX-0',
    userName: 'FIRST-NAME LAST-NAME (10103ZA - US Margin)',
    marginShort: '10103ZA - US Margin',
    netAmount: '1152.95',
    currency: 'usd',
    exchangeRate: '1.3357',
    osLimit: '140.0',
    referenceNumber: '1234567890',
    telephone: '0000-0000-0000',
    userId: '12344321'
  },
];

function App() {
  return (
    <div className="App">
      <h1>Search Results</h1>
      <Table />
    </div>
  );
}

export default App;
