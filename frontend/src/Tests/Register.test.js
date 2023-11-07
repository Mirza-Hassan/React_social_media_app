import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../components/Register';
import { UserProvider } from '../contexts/UserContext';

// Mock Axios for testing
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ status: 200 })),
}));

// Describe the Register component test
describe('Register Component', () => {
  // Test if it renders without errors
  it('renders without errors', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Router>
        <UserProvider>
          <Register />
        </UserProvider>
      </Router>
    );

    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const registerButton = getByTestId('register-button');
    const loginLink = getByTestId('login-link');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });
});
