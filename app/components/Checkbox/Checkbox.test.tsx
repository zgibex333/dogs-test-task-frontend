import { Checkbox } from './Checkbox';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Checkbox', () => {
  it('exists in document', () => {
    render(<Checkbox labelText="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('works with check/uncheck actions', async () => {
    render(<Checkbox labelText="test" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    await act(async () => {
      await userEvent.click(screen.getByRole('checkbox'));
    });
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
