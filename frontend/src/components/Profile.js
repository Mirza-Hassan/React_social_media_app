import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import PostForm from './PostForm';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const { user, posts, setPosts } = useUser();
  const [editingPost, setEditingPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch posts from the server when the component mounts
    axios.get('http://localhost:5000/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        // error
      });
  }, []);

  // Function to handle changes to posts
  const handlePostChange = (changedPost, action) => {
  setPosts((prevPosts) => {
    if (action === 'create') return [...prevPosts, changedPost];
    if (action === 'update') return prevPosts.map(post => post.id === changedPost.id ? changedPost : post);
    return prevPosts;
  });
};

  // Function to reset the editing state
  const resetEditingPost = () => {
    setEditingPost(null);
  };

  return (
    <div>
    <h1 className="profile-title" data-testid="profile-title">
      {user ? `Welcome, ${user.username}` : 'Guest'}
    </h1>
    <h2>Your Posts</h2>
    <ul>
      {posts.map((post, index) => (
        <li key={index} className="post-item">
          {post.content}
          <button className="edit-button" onClick={() => setEditingPost(post)}>Edit</button>
        </li>
      ))}
    </ul>
    <h3 className="post-heading">{editingPost ? 'Edit Post' : 'Create a New Post'}</h3>
    <PostForm
      existingPost={editingPost}
      onPostChange={handlePostChange}
      resetEditingPost={resetEditingPost}
      className="PostForm"
    />
    <h2 className="community-feed-heading">Community Feed</h2>
    <button className="view-feed-button" onClick={() => navigate('/feed')}>View New Feeds</button>
  </div>
  );
};

export default Profile;
