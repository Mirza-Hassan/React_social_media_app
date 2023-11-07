  import React, { useState } from 'react';
  import axios from 'axios';
  import { useUser } from '../contexts/UserContext';
  import '../styles/PostForm.css';

  const PostForm = ({ existingPost, onPostChange, resetEditingPost  }) => {
    const { user } = useUser();
    const [content, setContent] = useState(existingPost ? existingPost.content : '');
    const [error, setError] = useState('');

    // Handles the form submission when creating or updating a post
    const handleSubmit = async (e) => {
      e.preventDefault();

      const baseUrl = 'http://localhost:5000/posts';
      let result;

      if (content.trim() === '') {
        setError('Content cannot be empty.');
        return;
      } else {
        setError('');
      }

      try {
        if (existingPost?.id) {
          result = await axios.put(`${baseUrl}/${existingPost.id}`, { content });
        }
        else {
          result = await axios.post(baseUrl, { username: user.username, content });
        }      
        onPostChange(result.data, existingPost ? 'update' : 'create');
        setContent('');
        resetEditingPost?.();
        setError('');
      } catch (error) {
        // error
      }
    };
    
    return (
      <form onSubmit={handleSubmit}>
      <textarea
        className="post-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post here..."
      />
      <button type="submit" className="post-button">
        {existingPost ? 'Update' : 'Create'} Post
      </button>
      {error && <p className="error-message">{error}</p>}
      </form>
    );
  };

  export default PostForm;
