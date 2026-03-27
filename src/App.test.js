import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./pages/Main', () => () => <div>Main Page</div>);

test('renders login page heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/welcome to game store/i);
  expect(headingElement).toBeInTheDocument();
});
