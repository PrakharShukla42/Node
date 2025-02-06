const API_URL = "http://localhost:5000/blogs";
const blogsList = document.getElementById("blogs");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const submitBtn = document.getElementById("submitBtn");
let editingId = null;

async function fetchBlogs() {
    const response = await fetch(API_URL);
    const blogs = await response.json();
    blogsList.innerHTML = blogs.map(blog => `
        <li class="blog-item">
            <h2>${blog.title}</h2>
            <p>${blog.content}</p>
            <small>Created at: ${new Date(blog.createdAt).toLocaleString()}</small>
            <button onclick="editBlog('${blog._id}', '${blog.title}', '${blog.content}')">Edit</button>
            <button onclick="deleteBlog('${blog._id}')">Delete</button>
        </li>
    `).join('');
}

async function addOrUpdateBlog() {
    const blogData = { title: titleInput.value, content: contentInput.value };
    if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogData)
        });
        editingId = null;
        submitBtn.textContent = "Add Blog";
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogData)
        });
    }
    titleInput.value = "";
    contentInput.value = "";
    fetchBlogs();
}

function editBlog(id, title, content) {
    titleInput.value = title;
    contentInput.value = content;
    editingId = id;
    submitBtn.textContent = "Update Blog";
}

async function deleteBlog(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchBlogs();
}

fetchBlogs();