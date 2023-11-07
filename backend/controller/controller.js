const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret = 'secret_key';

const users = [];
const posts = [];
let messages = [];

let usersData = [
  { username: 'Alice', following: [], content: 'This is Alice\'s content.' },
  { username: 'Bob', following: [], content: 'Bob shares his thoughts here.' },
  { username: 'Charlie', following: [], content: 'Charlie\'s content goes here.' },
];

// Register a new user
exports.register = async (req, res) => {
  const { username, password } = req.body;  
  try {
    if (users.some(user => user.username === username)) {
      return res.json({ success: false, message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    users.push(newUser);
    const token = jwt.sign({ username }, jwtSecret);    
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { username, password } = req.body; 
  try {
    const user = users.find(user => user.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json({ success: false, message: 'Invalid username or password' });
    }
    const token = jwt.sign({ username: user.username }, jwtSecret);
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
};

// Create a new post
exports.createPost = (req, res) => {
  const { username, content } = req.body;
  const newId = posts.length ? Math.max(posts.map(p => p.id)) + 1 : 1;
  const newPost = { id: newId, username, content };
  posts.push(newPost);
  res.status(201).json(newPost);
};

// Update an existing post
exports.updatePost = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const post = posts.find(p => p.id === Number(id));
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  post.content = content;
  res.json(post);
};

// Get all posts
exports.getAllPosts = (req, res) => {
  res.json(posts);
};

// Get user profiles
exports.getAllUsers = (req, res) => {
  const userSummaries = usersData.map(user => {
    return {
      username: user.username,
      following: user.following,
      content: user.content
    };
  });
  res.json(userSummaries);
};

// Follow or unfollow another user
exports.followUnfollow = (req, res) => {
  const { username, followUsername } = req.body;
  const user = usersData.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (user.following.includes(followUsername)) {
    user.following = user.following.filter(u => u !== followUsername);
    return res.json({ message: `Unfollowed ${followUsername}` });
  } else {
    user.following.push(followUsername);
    return res.json({ message: `Followed ${followUsername}` });
  }
};

// Send a new message
exports.sendMessage = (req, res) => {
  const { senderId, receiverId, text } = req.body;
  const message = { senderId, receiverId, text, timestamp: new Date() };
  messages.push(message);
  res.send(message);
};

// Get messages between two users
exports.getMessages = (req, res) => {
  const { userId1, userId2 } = req.params;
  const relevantMessages = messages.filter(
    m => (m.senderId === userId1 && m.receiverId === userId2) || (m.senderId === userId2 && m.receiverId === userId1)
  );
  res.send(relevantMessages);
};