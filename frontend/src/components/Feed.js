import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../styles/Feed.css';
import Messages from './message';

const Feed = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [commentError, setCommentError] = useState('');
  const [followedUsers, setFollowedUsers] = useState({});

  // Effect to fetch all users on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/allUsers')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        // error
      });
  }, []);

  // Function to handle following/unfollowing a user
  const handleFollowUnfollow = (followUsername) => {
    const shouldFollow = !followedUsers[followUsername];
  
    axios.post('http://localhost:5000/followUnfollow', { username: 'Alice', followUsername })
      .then(response => {
        if (response.data.message) {
          setFollowedUsers(prev => ({
            ...prev,
            [followUsername]: shouldFollow,
          }));
        }
      })
      .catch(error => {
        // error
      });
  };
  
  // Function to handle liking a user's content
  const handleLike = (userId) => {
    setLikes(prev => ({ ...prev, [userId]: (prev[userId] || 0) + 1 }));
  };

  // Function to add a comment for a user's content
  const addComment = (userId) => {
    const comment = newComment[userId];  
    if (comment && comment.trim() !== '') {
      setComments((prev) => ({ ...prev, [userId]: [...(prev[userId] || []), { text: comment }] }));
      setNewComment((prev) => ({ ...prev, [userId]: '' }));
      setCommentError('');
    } else {
      setCommentError('Please enter a comment.');
    }
  };
  
  // Function to handle comment input change
  const handleCommentChange = (userId, comment) => {
    setNewComment(prev => ({ ...prev, [userId]: comment }));
  };

  // Function to handle image upload
  const handleUploadImage = (userId, imageFile) => {
    console.log(`Image uploaded for user ID: ${userId}, File: ${imageFile.name}`);
  };

  // Function to navigate back
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="feed-container">
      <h2>Users New Feed</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li className="user-card" key={user.id}>
            <strong>{user.username}</strong>
            <button className="follow-button" onClick={() => handleFollowUnfollow(user.username)}>
              {followedUsers[user.username] ? 'Unfollow' : 'Follow'}
            </button><br/>
            {followedUsers[user.username] && <div>
              <p>{user.content}</p>
              <span className="likes-count">{likes[user.id] || 0} Likes           
              <button className="like-button" onClick={() => handleLike(user.id)}>Like</button><br/>
              </span>
              <input 
                type="text"
                className="comment-input"
                placeholder="Add a comment"
                value={newComment[user.id] || ''}
                onChange={e => handleCommentChange(user.id, e.target.value)}
              />
              <button className="add-comment-button" onClick={() => addComment(user.id)}>Add Comment</button>
              {commentError && <p className="error-message">{commentError}</p>}
              <br/>
              <ul className="comment-list">
                {(comments[user.id] || []).map((comment, cIndex) => (
                  <li key={cIndex}>{comment.text}</li>
                ))}
              </ul>
              <input 
                type="file"
                className="file-input"
                onChange={e => handleUploadImage(user.id, e.target.files[0])}
              />
            </div>}
          </li>
        ))}
      </ul>
      <Messages userId1={'user1'} userId2={'user2'} />
      <button className="back-button" onClick={goBack}>Back</button>

    </div>
  );
};

export default Feed;
