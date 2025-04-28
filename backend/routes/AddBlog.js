import React, { useEffect, useRef, useState } from "react";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const editorRef = useRef();

  useEffect(() => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
  
    fetch("http://localhost:5005/api/blogs", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("🎉 Blog Added Successfully!");
        setTitle("");
        setDescription("");
        setImage(null);
        if (editorRef.current) {
          editorRef.current.innerHTML = "";
        }
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Something went wrong!");
      });
  };
  

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <div ref={editorRef}></div>
        </div>

        <div>
          <label className="block font-medium">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="block"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
