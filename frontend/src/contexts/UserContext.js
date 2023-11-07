import React, { createContext, useContext, useState } from 'react';

// Create a user context
const UserContext = createContext();

// Custom hook to access the user context
export const useUser = () => {
  return useContext(UserContext);
};

// User context provider
export const UserProvider = ({ children }) => {
  // State for user, posts, and following
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);

  // Combine state into a value object
  const value = {
    user,
    setUser,
    posts,
    setPosts,
    following,
    setFollowing,
  };

  // Provide the context value to children components
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
