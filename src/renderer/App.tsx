/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import * as XLSX from 'xlsx';
// import raw from './AccountHistory.xls';

const Main = () => {
  const [sheet, setSheet] = useState<any | React.Dispatch<any>>(null);
  const [error, setError] = useState<boolean | React.Dispatch<any>>(true);

  const navigate = useNavigate();

  const handleBtn = (event: any) => {
    event?.preventDefault();
    navigate('/page1');
  };

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

  console.log(sheet);

  return (
    <div>
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
      <div>
        <button type="button" onClick={handleBtn}>
          Next Page
        </button>
        {error && (
          <div>
            <p className="error">Error Detected!</p>
            <button
              type="button"
              className="error"
              onClick={() => setError(false)}
            >
              Remove Error
            </button>
          </div>
        )}
        <p>Load File:</p>
        <input type="file" onChange={handleFile} />
      </div>
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

const Page1 = () => {
  const navigate = useNavigate();

  const handleBtn = (event: any) => {
    event?.preventDefault();
    navigate('/');
  };

  return (
    <div>
      <h1>Budget Manager</h1>
      <hr />
      <p>
        <span>You changed pages!</span>
      </p>
      <div>
        <button type="button" onClick={handleBtn}>
          Previous Page
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/page1" element={<Page1 />} />
      </Routes>
    </Router>
  );
}
