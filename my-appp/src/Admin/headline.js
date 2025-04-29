import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Headline = () => {
  const [headlines, setHeadlines] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const [showHeadlines, setShowHeadlines] = useState(true);

  // const API_BASE = process.env.REACT_APP_API_BASE_URL + '/headlines';
  const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/headlines`;

  useEffect(() => {
    fetchHeadlines();
  }, []);

  const fetchHeadlines = async () => {
    try {
      const res = await axios.get(API_BASE);
      setHeadlines(res.data);
    } catch (err) {
      console.error('Error fetching headlines:', err);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_BASE}/${editId}`, { text });
      } else {
        await axios.post(API_BASE, { text });
      }
      setText('');
      setEditId(null);
      fetchHeadlines();
    } catch (err) {
      console.error('Error saving headline:', err);
    }
  };

  const handleEdit = (headline) => {
    setText(headline.text);
    setEditId(headline._id || headline.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchHeadlines();
    } catch (err) {
      console.error('Error deleting headline:', err);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await axios.put(`${API_BASE}/${id}/status`);
      fetchHeadlines();
    } catch (err) {
      console.error('Error toggling headline status:', err);
    }
  };
  
  
  const toggleHeadlines = () => {
    setShowHeadlines((prev) => !prev);
  };

  return (
    <div className="container-fluid mt-4 col-11 mx-auto">
      <div className="card shadow-sm p-4">
        <h2 className="mb-4 text-center text-warning">📰 Headline Manager</h2>

        <form onSubmit={handleCreateOrUpdate} className="row g-3 mb-4">
          <div className="col-md-10">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a headline..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <div className="col-md-2 d-grid">
            <button type="submit" className="btn btn-success">
              {editId ? 'Update' : 'Add'}
            </button>
          </div>
        </form>

        <div className="text-end mb-3">
          <button className="btn btn-outline-warning btn-sm" onClick={toggleHeadlines}>
            {showHeadlines ? 'Hide All Headlines' : 'Show All Headlines'}
          </button>
        </div>

        <div
          className={`alert alert-info overflow-auto mb-4 ${!showHeadlines ? 'd-none' : ''}`}
          style={{ whiteSpace: 'nowrap' }}
        >
          {headlines
            .filter((h) => h.status === 1)
            .map((h) => (
              <span key={h._id || h.id} className="me-4 fw-bold text-danger">
                {h.text}
              </span>
            ))}
        </div>

        <h4 className="text-secondary">📋 Manage Headlines</h4>
        <ul className="list-group">
          {headlines.map((h) => (
            <li
              key={h._id || h.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                h.status === 0 ? 'list-group-item-light' : ''
              }`}
            >
              <span>
                <strong>{h.text}</strong> —{' '}
                <span className={h.status === 0 ? 'text-muted' : 'text-success'}>
                  {h.status === 0 ? 'Hidden' : 'Visible'}
                </span>
              </span>
              <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(h)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(h._id || h.id)}>
                  Delete
                </button>
                <button
  className={`btn btn-sm ${h.status === 1 ? 'btn-secondary' : 'btn-success'}`}
  onClick={() => handleToggleStatus(h._id || h.id)}
>
  {h.status === 1 ? 'Hide' : 'Show'}
</button>


              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Headline;
