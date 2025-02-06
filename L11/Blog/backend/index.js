const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Assignment-2')
  .then(() => console.log('DB Connected!'))
  .catch(error => console.error('DB not connected:', error));

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);

app.get("/blogs", async (req, res) => {
    const blogs = await Blog.find();
    res.json(blogs);
});

app.post("/blogs", async (req, res) => {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json(newBlog);
});

app.put("/blogs/:id", async (req, res) => {
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Blog updated" });
});

app.delete("/blogs/:id", async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));