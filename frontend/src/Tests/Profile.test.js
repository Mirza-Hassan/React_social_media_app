import React from 'react';
import { render, act } from '@testing-library/react';
import Profile from '../components/Profile';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';
import axios from 'axios';

// Mock Axios for testing
jest.mock('axios', () => ({
  get: jest.fn(),
}));

// Describe the Profile component test
describe('Profile Component', () => {
  // Test if it renders without errors
  it('renders without errors', async () => {
    const customMockData = [
      { id: 1, content: 'Custom Mock Post 1' },
      { id: 2, content: 'Custom Mock Post 2' },
    ];

    const setPosts = jest.fn();
    await act(async () => {
      axios.get.mockResolvedValue({ data: customMockData });

      const { getByTestId } = render(
        <Router>
          <UserProvider value={{ user: { username: 'TestUser' }, posts: [], setPosts }}>
            <Profile />
          </UserProvider>
        </Router>
      );

      await new Promise(resolve => setTimeout(resolve, 0));
    });
  });
});
