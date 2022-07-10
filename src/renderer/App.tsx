import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import './App.css';

const Main = () => {
  const navigate = useNavigate();

  const handleBtn = (event: any) => {
    event?.preventDefault();
    navigate('/page1');
  };

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
      </div>
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
