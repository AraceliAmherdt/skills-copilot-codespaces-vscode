// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Store comments
const commentsByPostId = {};

// Get comments
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Post comments
app.post('/posts/:id/comments', (req, res) => {
  // Generate random id
  const commentId = randomBytes(4).toString('hex');
  // Extract content from request body
  const { content } = req.body;
  // Get comments of post with id
  const comments = commentsByPostId[req.params.id] || [];
  // Push new comment to array
  comments.push({ id: commentId, content });
  // Update comments
  commentsByPostId[req.params.id] = comments;
  // Send new comment to user
  res.status(201).send(comments);
});

// Listen to port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});
