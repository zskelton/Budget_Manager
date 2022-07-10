import '@testing-library/jest-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from '..';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('Error Button Removes after Click', () => {
  const { queryByTestId, getByTestId } = render(
    <Router>
      <Main />
    </Router>
  );

  expect(queryByTestId('error-txt')).toBeTruthy();

  fireEvent.click(getByTestId('error-btn'));

  expect(queryByTestId('error-txt')).toBeFalsy();
});
