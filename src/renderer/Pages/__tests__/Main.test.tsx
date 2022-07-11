/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from '..';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('Main Component Tests', () => {
  // Variables
  const { container, getByTestId } = render(
    <Router>
      <Main />
    </Router>
  );
  // const errorButtonStatus = queryByTestId('error-button-status');
  const errorButton = getByTestId('error-btn');
  const errorText = getByTestId('error-txt');

  // Tests
  it('Main Component Renders.', () => {
    expect(container).toBeTruthy();
  });

  // Error Button Goes Away
  it('Error Button Goes Away', () => {
    // Arrange
    // Set State if error is true

    // Act
    fireEvent.click(errorButton);

    // Assert
    expect(errorText).not.toBeVisible();
    expect(errorButton).not.toBeVisible();
  });
});
