import { render, screen } from '@testing-library/react';
import App from './App';
import { getCurrentUser } from './features/auth/api';

beforeAll(() => {
  jest
    .spyOn(HTMLCanvasElement.prototype, 'getContext')
    .mockImplementation(() => null);
});

afterAll(() => {
  jest.restoreAllMocks();
});
jest.mock('./features/auth/api', () => ({
  getCurrentUser: jest.fn(),
  logout: jest.fn(),
}));
const mockedGetCurrentUser =
  getCurrentUser as jest.MockedFunction<typeof getCurrentUser>;


test('renders dashboard for an authenticated user', async () => {

  window.history.pushState({}, '', '/dashboard');

  mockedGetCurrentUser.mockResolvedValue({
    id: 1,
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
  });

  render(<App />);

  expect(
    await screen.findByRole('heading', { name: /dashboard/i }),
  ).toBeInTheDocument();
});