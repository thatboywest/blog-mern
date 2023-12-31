// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors('*'));
// Connect to MongoDB (Make sure to have a running MongoDB instance)
mongoose.connect('mongodb+srv://morgingairaz:user254@cluster0.c0xuoua.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a schema for the Blog model
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
});

// Create the Blog model
const Blog = mongoose.model('Blog', blogSchema);

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to the root of the server!');
  });

app.post('/create-blog', async (req, res) => {
  try {
    const { title, author, content } = req.body;

    const newBlog = new Blog({
      title,
      author,
      content,
    });

    const savedBlog = await newBlog.save();

    res.json(savedBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/get-blogs', async (req, res) => {
    try {
      // Retrieve all blogs from the database
      const allBlogs = await Blog.find();
  
      res.json(allBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
