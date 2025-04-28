import React, { useEffect, useRef, useState } from "react";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);  // State to hold blogs
  const [editingBlog, setEditingBlog] = useState(null); // State for editing blog
  const editorRef = useRef();

  useEffect(() => {
    // Fetch existing blogs on component mount
    fetchBlogs();

    if (window.ClassicEditor) {
      window.ClassicEditor
        .create(editorRef.current)
        .then((editor) => {
          editor.model.document.on("change:data", () => {
            setDescription(editor.getData());
          });
        })
        .catch((error) => {
          console.error("CKEditor error:", error);
        });
    }
  }, []);

  const fetchBlogs = () => {
    fetch(process.env.REACT_APP_API_BASE_URL + "/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => {
        console.error("Error fetching blogs:", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = {
      title,
      description,
    };
  
    const url = editingBlog
      ? `http://localhost:5005/api/blogs/${editingBlog.id}`
      : process.env.REACT_APP_API_BASE_URL + "/blogs";
    const method = editingBlog ? "PUT" : "POST";
  
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json", // Sending JSON data
      },
      body: JSON.stringify(data), // Sending data as JSON
    })
      .then((res) => res.json())
      .then((data) => {
        alert("🎉 Blog Published/Updated Successfully!");
        setTitle("");
        setDescription("");
        setImage(null);
        setEditingBlog(null);
        fetchBlogs();
        if (editorRef.current) {
          editorRef.current.innerHTML = "";
        }
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Something went wrong!");
      });
  };
  

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setDescription(blog.description);
    if (editorRef.current) {
      editorRef.current.innerHTML = blog.description;
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5005/api/blogs/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("❌ Blog Deleted Successfully!");
        fetchBlogs();
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Something went wrong!");
      });
  };

  return (
    <div className="container-fluid mt-4 col-11 mx-auto">
      <div className="card shadow-lg p-4 rounded-4">
        <h2 className="text-center fs-2 fw-bold mb-4 text-warning">
          ✍️ Add/Update Blog
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Blog Title */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control form-control-lg"
              placeholder="Enter your blog title..."
              required
            />
          </div>

          {/* Blog Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">
              Blog Description
            </label>
            <div
              ref={editorRef}
              className="form-control p-2"
              style={{ minHeight: "200px" }}
            ></div>
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-warning btn-lg">
              🚀 {editingBlog ? "Update Blog" : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>

      {/* Display Blogs List */}
      <div className="mt-4">
        <h3 className="text-center fs-3 fw-semibold text-warning">Existing Blogs</h3>
        {blogs.length > 0 ? (
          <div className="list-group mt-3">
            {blogs.map((blog) => (
              <div key={blog.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{blog.title}</h5>
                  <p className="mb-1" dangerouslySetInnerHTML={{ __html: blog.description }}></p>
                </div>
                <div>
                  <button
                    className="btn btn-warning btn-sm mx-2"
                    onClick={() => handleEdit(blog)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(blog.id)}
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default AddBlog;
