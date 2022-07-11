/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import '../App.css';
import * as XLSX from 'xlsx';

type XLSOpenerProps = {
  setSheet: React.Dispatch<any>;
  setError: React.Dispatch<any>;
};
const XLSOpener = ({ setSheet, setError }: XLSOpenerProps) => {
  // HANDLES
  const handleFile = (event: any) => {
    try {
      event?.preventDefault();
      // Open File
      const file = event.target.files[0];
      const reader = new FileReader();
      // Read File
      reader.readAsBinaryString(file);
      reader.onload = () => {
        // Handle Data
        const data = reader.result;
        const wb = XLSX.read(data, { type: 'binary' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const ws_json = XLSX.utils.sheet_to_json(ws);
        // Add Ids
        // eslint-disable-next-line no-return-assign
        ws_json.forEach((o: any, i: number) => (o.id = i + 1));
        // Set State
        setSheet(ws_json);
      };
    } catch (e) {
      setError(true);
      console.error(e);
    }
  };

  // COMPONENT
  return (
    <div id="XLSOpener">
      <p>Load File:</p>
      <input type="file" onChange={handleFile} />
    </div>
  );
};

type ErrorReporterProps = {
  setError: React.Dispatch<any>;
};
const ErrorReporter = ({ setError }: ErrorReporterProps) => {
  // HANDLES
  const handleBtn = (event: React.SyntheticEvent) => {
    event?.preventDefault();
    setError(false);
  };

  // COMPONENT
  return (
    <div id="ErrorReporter">
      <p className="error" data-testid="error-txt">
        Error!
      </p>
      <div>
        <button
          type="button"
          onClick={handleBtn}
          className="error"
          data-testid="error-btn"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const HeaderBanner = () => {
  // COMPONENT
  return (
    <div id="HeaderBanner">
      <h1>Budget Manager</h1>
      <hr />
      <p>
        <span>
          Learn about
          <a
            href="https://github.com/zskelton/Budget_Manager"
            target="_blank"
            rel="noreferrer"
          >
            this project
          </a>
          on-line.
        </span>
      </p>
    </div>
  );
};

type BudgetTableProps = {
  sheet: any[];
};
const BudgetTable = ({ sheet }: BudgetTableProps) => {
  // COMPONENT
  return (
    <div id="BudgetTable">
      {sheet?.length > 0 && (
        <div>
          <h3>Table:</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Debit</th>
                <th>Credit</th>
              </tr>
            </thead>
            <tbody>
              {sheet.map((row: any) => (
                <tr key={row.id}>
                  <td>{row['Post Date']}</td>
                  <td>{row.Description}</td>
                  <td>{row.Debit}</td>
                  <td>{row.Credit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const Main = () => {
  // STATE
  const [sheet, setSheet] = useState<any | React.Dispatch<any>>(null);
  const [error, setError] = useState<boolean | React.Dispatch<any>>(true);

  // COMPONENT
  return (
    <div id="page">
      <div id="header">
        <HeaderBanner />
      </div>
      <div id="body">
        {error && <ErrorReporter setError={setError} />}
        <XLSOpener setSheet={setSheet} setError={setError} />
      </div>
      <div id="footer">
        <BudgetTable sheet={sheet} />
      </div>
    </div>
  );
};

export default Main;
