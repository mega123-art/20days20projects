const API_URL = "http://localhost:3000";
let currentBlogId = null;

// DOM Elements
const blogList = document.getElementById("blogList");
const blogForm = document.getElementById("blogForm");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const tagsInput = document.getElementById("tagsInput");
const newBlogBtn = document.getElementById("newBlogBtn");
const submitBlogBtn = document.getElementById("submitBlog");
const cancelBlogBtn = document.getElementById("cancelBlog");
const formTitle = document.getElementById("formTitle");

// Event Listeners
newBlogBtn.addEventListener("click", showCreateForm);
submitBlogBtn.addEventListener("click", handleSubmit);
cancelBlogBtn.addEventListener("click", hideForm);

// Fetch and display blogs
async function fetchBlogs() {
  try {
    const response = await fetch(`${API_URL}/blogs`);
    const blogs = await response.json();
    displayBlogs(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
}

function displayBlogs(blogs) {
  blogList.innerHTML = blogs
    .map(
      (blog) => `
        <div class="blog-card">
            <h2 class="blog-title">${blog.title}</h2>
            <p class="blog-content">${blog.content}</p>
            <div class="blog-meta">
                <div class="tags">
                    ${blog.tags
                      .map((tag) => `<span class="tag">${tag}</span>`)
                      .join("")}
                </div>
                <div class="button-group">
                    <button onclick="editBlog('${blog._id}')">Edit</button>
                    <button onclick="deleteBlog('${blog._id}')">Delete</button>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function showCreateForm() {
  formTitle.textContent = "Create New Blog";
  currentBlogId = null;
  clearForm();
  blogForm.classList.remove("hidden");
}

function hideForm() {
  blogForm.classList.add("hidden");
  clearForm();
}

function clearForm() {
  titleInput.value = "";
  contentInput.value = "";
  tagsInput.value = "";
}

async function handleSubmit() {
  const blogData = {
    title: titleInput.value,
    content: contentInput.value,
    tags: tagsInput.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag),
  };

  try {
    if (currentBlogId) {
      await fetch(`${API_URL}/blogs/${currentBlogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
    } else {
      await fetch(`${API_URL}/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
    }
    hideForm();
    fetchBlogs();
  } catch (error) {
    console.error("Error saving blog:", error);
  }
}

async function editBlog(id) {
  try {
    const response = await fetch(`${API_URL}/blogs/${id}`);
    const blog = await response.json();

    currentBlogId = id;
    formTitle.textContent = "Edit Blog";
    titleInput.value = blog.title;
    contentInput.value = blog.content;
    tagsInput.value = blog.tags.join(", ");
    blogForm.classList.remove("hidden");
  } catch (error) {
    console.error("Error fetching blog for edit:", error);
  }
}

async function deleteBlog(id) {
  if (confirm("Are you sure you want to delete this blog?")) {
    try {
      await fetch(`${API_URL}/blogs/${id}`, { method: "DELETE" });
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  }
}

// Initial load
fetchBlogs();
