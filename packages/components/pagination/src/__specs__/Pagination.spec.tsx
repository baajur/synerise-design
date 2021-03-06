import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import Pagination from '../index';
import renderWithProvider from '@synerise/ds-utils/dist/testing/renderWithProvider/renderWithProvider';

describe('Pagination', () => {
  const onChange = jest.fn();
  it('should set active prop', async function() {
    // ARRANGE
    const { getByText, container, debug } = renderWithProvider(<Pagination onChange={onChange} defaultCurrent={1} total={50} />);
    debug();
    // ACT
    const fifth = getByText('5');
    fireEvent.click(fifth);

    // ASSERT
    expect(onChange).toHaveBeenCalled();
    const activeItem = container.querySelector('.ant-pagination-item-active');
    expect(activeItem && activeItem.textContent).toBe('5');
  });
});
