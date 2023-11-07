import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/Login';
import { UserProvider } from '../contexts/UserContext';

// Mock Axios for testing
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ status: 200 })),
}));

// Describe the Login component test
describe('Login Component', () => {
  // Test if it renders without errors
  it('renders without errors', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Router>
        <UserProvider>
          <Login />
        </UserProvider>
      </Router>
    );

    getByPlaceholderText('Username');
    getByPlaceholderText('Password');

    getByTestId('register-link');
  });
});
