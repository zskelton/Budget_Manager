import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../renderer/App';
import { Main } from '../renderer/Pages';

describe('App Rendering', () => {
  it('App Component Renders.', () => {
    expect(render(<App />)).toBeTruthy();
  });

  it('Main Component Renders.', () => {
    expect(
      render(
        <Router>
          <Main />
        </Router>
      )
    ).toBeTruthy();
  });
});
