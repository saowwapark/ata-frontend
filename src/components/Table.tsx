import React, { useEffect, useState } from "react";
import "./Table.css";
import mockData from './../data.mock.json';
import { BankAccountModel, mapToBankAccountModel } from "../models/bank.account.model";

export interface SearchInput {
  period: string;
  status: string;
  fromDate: Date;
  toDate: Date;
}

const Table = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [expandedRows, setExpandedRows] = useState([]);
  const [countRow, setCountRow] = useState(data.length);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [period, setPeriod] = useState("tranmission");
  const [status, setStatus] = useState("waiting");
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
    { id: 'date', view: 'Date'},
    { id: 'expiration', view: 'Expiration'},
    { id: 'noRef', view: 'No. Ref.'},
    { id: 'extTef', view: 'Ext. Ref.'}
  ]
  useEffect(() => {
    const mappedData: BankAccountModel[] = mockData.data.map( field => mapToBankAccountModel(field))
    setData(mappedData);
    setFilteredData(data)
    setSortedData(data)
  },[])


  const handleSearch = () => {
    const searchInput: SearchInput = {
      period,
      status,
      fromDate,
      toDate,
    };
    const filtered = data.filter((item) => {
      
      const matchesPeriod =
        searchInput.period === "" || item.period.includes(searchInput.period);
      const matchesStatus =
        searchInput.status === "" || item.status === searchInput.status;
      const matchesFromDate =
        !searchInput.fromDate || item.dateTime >= searchInput.fromDate;
      const matchesToDate =
        !searchInput.toDate || item.dateTime <= searchInput.toDate;

      return matchesPeriod && matchesStatus && matchesFromDate && matchesToDate;
    });

    setFilteredData(filtered);
  };
    
  const toggleRowExpansion = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((id) => id !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    sortData();
  };

  const sortData = () => {
    console.log('call sort Data');
    console.log(filteredData);
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setSortedData(sortedData);
  }

  
  return (
    <>
      <div className="overview">
        <div className="overview__left-column">
          <div>
            <div>Search</div>
            <div className="field-value">
              <span className="field-value__field">Search result:</span>
              {' '}
              <span className="field-value__value">{countRow}</span>
            </div>
          </div>
        </div>
        <div className="overview__right-column">
          <div className="field-value">
            <span>Period</span>
            <select>
              <option value="transmission">Transmission</option>
            </select>
          </div>
          <div className="field-value">
            <span>Status</span>
            <select>
              <option value="waiting">Waiting</option>
            </select>
          </div>
          <div className="field-value">
            <span>From</span>
            <input
              type="date"
              id="fromDate"
              value={fromDate.toISOString().split("T")[0]}
              onChange={(event) => setFromDate(new Date(event.target.value))}
            ></input>
          </div>
          <div className="field-value">
            <span>To</span>
            <input
              type="date"
              id="toDate"
              value={toDate.toISOString().split("T")[0]}
              onChange={(event) => setToDate(new Date(event.target.value))}
            ></input>
          </div>
          <div className="wrap--center">
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th></th> {/* Column for expand button */}
            {headerColumns.map((item, index) => (
              <React.Fragment key={index}>
                <th
                  onClick={() => requestSort(item.id)}
                  className={
                    sortConfig.key === item.id
                      ? `sorted-${sortConfig.direction}`
                      : ""
                  }
                >
                  {item.view}
                  {sortConfig.key === item.id && (
                  <span
                    className={
                      sortConfig.direction === "ascending"
                        ? "chevron-up"
                        : "chevron-down"
                    }
                  ></span>
                )}
                </th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item: BankAccountModel, index) => {
            return (
              <React.Fragment key={index}>
                <tr>
                  <td>
                    <button onClick={() => toggleRowExpansion(index)}>
                      {expandedRows.includes(index) ? "-" : "+"}
                    </button>
                  </td>
                  <td>{item.account}</td>
                  <td>{item.operation}</td>
                  <td>{item.symbol}</td>
                  <td>{item.description}</td>
                  <td>{item.qty}</td>
                  <td>{item.filledQty}</td>
                  <td>{item.price}</td>
                  <td>{item.status}</td>
                  <td>{item.dateTime.toString()}</td>
                  <td>{item.expiration.toDateString()}</td>
                  <td>{item.noRef}</td>
                  <td>{item.extRef}</td>
                </tr>
                {expandedRows.includes(index) && (
                  <tr className="expanded-row">
                    <td></td>
                    <td colSpan={12}>
                      <div className="first-row">
                        <div>
                          <span>{item.userName}</span>
                          <span>({item.marginShort})</span>
                        </div>
                        <div>
                          <button>ACCEPT</button>
                          <button>Reject</button>
                        </div>
                      </div>
                      <hr className="horizontal-line"></hr>
                      <div className="second-row">
                        <div className="field-value">
                          <span> Net Amount:</span>
                          {' '}
                          <span>{item.netAmount} </span>
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
                          <span>Date Time:</span>
                          {' '}
                          <span>Date Time</span>
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
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
