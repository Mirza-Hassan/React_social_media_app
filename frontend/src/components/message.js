import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/message.css';

function Messages({ userId1, userId2 }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch messages from the server on component mount
  useEffect(() => {
    axios.get(`http://localhost:5000/messages/${userId1}/${userId2}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));
  }, [userId1, userId2]);

  // Function to send a new message
  const sendMessage = () => {
    axios.post('http://localhost:5000/messages', { senderId: userId1, receiverId: userId2, text: newMessage })
      .then(res => setMessages([...messages, res.data]))
      .catch(err => console.error(err));
      setNewMessage('');
  };

  return (
    <div className="messages-container">
      <h1 className="messages-heading">Private Messages</h1>
      {messages.map((message, index) => (
        <p key={index} className="message">{message.text}</p>
      ))}
      <input className="message-input" value={newMessage} onChange={e => setNewMessage(e.target.value)} />
      <button className="send-button" onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Messages;