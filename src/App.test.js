import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock('axios');
const repoMock = {name: 'repo name'}

test('loads and displays 3 buttons', () => {
  render(<App />);
  const fetchButton = screen.getByText(/Get top repos/i);
  const favButton = screen.getByText(/Get favourites/i);
  const clearButton = screen.getByText(/Clear all favourites/i);

  expect(fetchButton).toBeEnabled()
  expect(favButton).toBeEnabled()
  expect(clearButton).toBeEnabled()
})


test('loads cards when repo found', async () => {
  const promise = Promise.resolve({ data: {items: [repoMock]} });
  axios.get.mockImplementationOnce(() => promise);

  render(<App />);

  userEvent.click(screen.getByText(/Get top repos/i));
  await act(() => promise);

  await screen.findByText(/repo name/);

  expect(screen.getByText('repo name')).toBeInTheDocument();
})

test('fetches stories from an API and fails', async () => {
  axios.get.mockImplementationOnce(() =>
    Promise.reject(new Error())
  );
  render(<App />);
  
  fireEvent.click(screen.getByText(/Get top repos/i));
  await screen.findByTestId('error');

  const message = screen.getByTestId('error');
  expect(message).toBeInTheDocument();
});

