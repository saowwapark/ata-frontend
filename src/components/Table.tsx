import React, { useEffect, useState } from "react";
import "./Table.css";
import mockData from './../data.mock.json';
import { BankAccountModel, mapToBankAccountModel } from "../models/bank.account.model";
import { formatDate } from './../utils/formatter'
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6"
export interface SearchInput {
  period: string;
  status: string;
  fromDate: Date;
  toDate: Date;
}

const Table = () => {
  const today = new Date();
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(today.getFullYear() - 3);

  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [expandedRows, setExpandedRows] = useState([]);
  const [countRow, setCountRow] = useState(data.length);
  const [fromDate, setFromDate] = useState(threeYearsAgo);
  const [toDate, setToDate] = useState(today);
  const [selectedPeriod, setSelectedPeriod] = useState("transmission");
  const [selectedStatus, setSelectedStatus] = useState("waiting");
  const [filteredData, setFilteredData] = useState(data);


  const headerColumns = [
    { id: 'account', view: 'Account' },
    { id: 'operation', view: 'Operation'},
    { id: 'symbol', view: 'Symbol'},
    { id: 'description', view: 'Description'},
    { id: 'qty', view: 'Qty.'},
    { id: 'filledQty', view: 'Filled Qty'},
    { id: 'price', view: 'Price'},
    { id: 'status', view: 'Status'},
    { id: 'dateTime', view: 'Date'},
    { id: 'expiration', view: 'Expiration'},
    { id: 'noRef', view: 'No. Ref.'},
    { id: 'extRef', view: 'Ext. Ref.'}
  ]
  const periods = [
    { id: 'transmission', view: 'Transmission'},
    { id: 'hello', view: 'Hello Test'},
    { id: 'wowWow', view: 'Wow Wow'}
  ]
  const statuses = [
    { id: 'waiting', view: 'Waiting'},
    { id: 'pending', view: 'Pending'},
    { id: 'finished', view: 'Finished'}
  ]
  useEffect(() => {
    const mappedData: BankAccountModel[] = mockData.data.map( field => mapToBankAccountModel(field))
    setData(mappedData);
    filterData(mappedData);
    setSortedData(mappedData)
  },[])

  const filterData = (data: BankAccountModel[]) => {
    const searchInput: SearchInput = {
      period: selectedPeriod,
      status: selectedStatus,
      fromDate,
      toDate,
    };
    const newFiltereData = data.filter((item) => {
      const matchesPeriod =
        searchInput.period === "" || item.period === searchInput.period;
      const matchesStatus =
        searchInput.status === "" || item.status === searchInput.status;
      const matchesFromDate =
        !searchInput.fromDate || item.dateTime >= searchInput.fromDate;
      const matchesToDate =
        !searchInput.toDate || item.dateTime <= searchInput.toDate;

      return matchesPeriod && matchesStatus && matchesFromDate && matchesToDate;
    });

    setFilteredData(newFiltereData);
    setCountRow(newFiltereData.length)
    setSortedData(newFiltereData);
  };
    
  const toggleRowExpansion = (index: number) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((id) => id !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    sortData({key, direction});
  };

  const sortData = ({key, direction}) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setSortedData(sortedData);
  }

  return (
    <>
      <h1>Exercise</h1>
      <div className="page__content">
        <div className="overview">
          <div className="overview__left-column">
            <div>
              <div className="overview__left-column__header">Search</div>
              <div className="overview__left-column__content">
                <div className="field-value">
                  <span className="field-value__field">Search result:</span>
                  {' '}
                  <span className="field-value__value">{countRow}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="overview__right-column">
            <div className="field-value">
              <span>Period</span>
              <select 
                value={selectedPeriod}
                onChange={(event) => setSelectedPeriod(event.target.value)}
              >{ 
                  periods.map(item => (
                    <option key={item.id} value="item.id">{item.view}</option>
                ))}
            
              </select>
            </div>
            <div className="field-value">
              <span>Status</span>
              <select 
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
              >{
                  statuses.map(item => (
                    <option  key={item.id} value={item.id}>{item.view}</option>
                  ))
                }
              </select>
            </div>
            <div className="field-value">
              <span>From</span>
              <input
                type="date"
                value={fromDate.toISOString().split("T")[0]}
                onChange={(event) => setFromDate(new Date(event.target.value))}
              ></input>
            </div>
            <div className="field-value">
              <span>To</span>
              <input
                type="date"
                value={toDate.toISOString().split("T")[0]}
                onChange={(event) => setToDate(new Date(event.target.value))}
              ></input>
            </div>
            <div className="wrap--center">
              <button className="button button--primary" onClick={() => filterData(data)}>Search</button>
            </div>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              {/* Column for expand button */}
              <th className="collapse"></th> 
              {/* Column for real header */}
              {headerColumns.map((item) => (
                <th
                  key={item.id}
                  onClick={() => requestSort(item.id)}
                  className={
                    sortConfig.key === item.id
                      ? `sorted-${sortConfig.direction} ${item.id}`
                      : `${item.id}`
                  }
                >
                  {item.view}
                  <FaSort/>
                  {sortConfig.key === item.id && (
                    <>
                      {sortConfig.direction === "ascending" ? <FaSortUp className="chevron-up"/> : <FaSortDown className="chevron-down"/>}
                    </>
                )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item: BankAccountModel, index) => {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td className="collapse">
                      <button onClick={() => toggleRowExpansion(index)}>
                        {expandedRows.includes(index) ? "-" : "+"}
                      </button>
                    </td>
                    <td className="account">{item.account}</td>
                    <td className="operation">{item.operation}</td>
                    <td className="symbol">{item.symbol}</td>
                    <td className="description">{item.description}</td>
                    <td className="qty">{item.qty}</td>
                    <td className="filledQty">{item.filledQty}</td>
                    <td className="price">{item.price}</td>
                    <td className="status">{item.status}</td>
                    <td className="dateTime">{formatDate(item.dateTime)}</td>
                    <td className="expiration">{formatDate(item.expiration)}</td>
                    <td className="noRef">{item.noRef}</td>
                    <td className="extRef">{item.extRef}</td>
                  </tr>
                  {expandedRows.includes(index) && (
                    <tr className="expanded-row">
                      <td colSpan={13}>
                        <div className="expanded-row__header">
                          <div>
                            <span>{item.userName}</span>
                            {' '}
                            <span>({' '}{item.marginShort}{' '})</span>
                          </div>
                          <div className="expanded-row__header--right">
                            <button className="button button--primary">ACCEPT</button>
                            <button className="button button--warn">Reject</button>
                          </div>
                        </div>
                        <hr className="horizontal-line"></hr>
                        <div className="expanded-row__content">
                          <div className="expanded-row__content__data">
                            <div className="field-value">
                              <span> Net Amount:</span>
                              {' '}
                              <span>{item.netAmount} {' '}USD</span>
                            </div>
                            <div className="field-value">
                              <span>Price:</span>
                              {' '}
                              <span>{item.price}</span>
                            </div>
                            <div className="field-value">
                              <span>Exchange Rate:</span>
                              {' '}
                              <span>{item.exchangeRate}</span>
                            </div>
                            <div className="field-value">
                              <span>O/S Limit:</span>
                              {' '}
                              <span>{item.osLimit}</span>
                            </div>
                            <div className="field-value">
                              <span>Reference Number:</span>
                              {' '}
                              <span>{item.referenceNumber}</span>
                            </div>
                            <div className="field-value">
                              <span>Date/Time:</span>
                              {' '}
                              <span>{formatDate(item.dateTime)}</span>
                            </div>
                            <div className="field-value">
                              <span>Telephone:</span>
                              {' '}
                              <span>{item.telephone}</span>
                            </div>
                            <div className="field-value">
                              <span>User ID:</span>
                              {' '}
                              <span>{item.userId}</span>
                            </div>
                          </div>
                          <div className="expanded-row__content__warning">
                            <div className="warning">
                              <div className="warning__header">Warning(s)</div>
                              <ul className="warning__content">
                                <li>To trade this security in this account, a currency conversion will be made at the current rate.</li>
                                <li>A similar order has already been submitted.</li>
                                <li>Your transaction will be processed the following business day</li>
                                <li>It is not possible to calculate the buying power of this order</li>
                                <li>A cancellation will not be possible during business hours on market orders. You can call a representative for more information.</li>
                                <li>For the above-mentioned reason(s), your order will be processed by one of our representatives</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
