import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_API_BASE_URL + '/blogs');
      const data = await res.json();

      // Enhance blog content with embedded YouTube links
      const enhancedData = data.map(blog => ({
        ...blog,
        description: convertYouTubeLinks(blog.description) // Convert YouTube links in the description
      }));

      setBlogs(enhancedData);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  const convertYouTubeLinks = (html) => {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[^\s<]*)?/g;

    // Replace YouTube links with embedded iframe
    return html.replace(youtubeRegex, (match, videoId) => {
      return `
        <div class="ratio ratio-16x9 mt-3">
          <iframe 
            src="https://www.youtube.com/embed/${videoId}" 
            allowfullscreen
          ></iframe>
        </div>`;
    });
  };

  return (
    <div className="container py-5 bg-light">
      <h2 className="text-center mb-5 fw-bold display-5 text-dark">Our Blogs</h2>

      {blogs.length === 0 ? (
        <p className="text-center">Loading blogs...</p>
      ) : (
        <div className="row g-4">
          {blogs.map(blog => (
            <div key={blog.id} className="col-lg-12 col-sm-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary fw-semibold">{blog.title}</h5>
                  {/* Render the description with YouTube embedded */}
                  <div
                    className="card-text text-secondary"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
