import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Button } from './Button';

describe('Button', () => {
  it('exists in document', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('works with children and colorType props', () => {
    const { container } = render(<Button colorType="transparent">Test</Button>);
    const button = screen.getByText('Test');
    expect(button).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('transparent');
  });
});
