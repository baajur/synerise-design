import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Button from '../index';

describe('Button', () => {
  const onClick = jest.fn();
  it('should render', function() {
    // ARRANGE
    const { getByText } = renderWithProvider(<Button onClick={onClick}>Click ME!</Button>);
    // ACT

    // ASSERT
    expect(getByText('Click ME!')).toBeTruthy();
  });
  it('should onClick be called', function() {
    // ARRANGE
    const { getByText } = renderWithProvider(<Button onClick={onClick}>Click ME!</Button>);

    // ACT
    fireEvent.click(getByText('Click ME!'));

    // ASSERT
    expect(onClick).toBeCalled();
  });
  it('should show spinner animation', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(<Button loading>Click ME!</Button>);
    // ASSERT
    expect(getByTestId('button-spinner')).toBeTruthy();
  });
});
