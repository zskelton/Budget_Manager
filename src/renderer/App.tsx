import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Page1 from './Pages/Page1';
import Main from './Pages/Main';

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
