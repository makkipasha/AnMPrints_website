import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CouponForm = () => {
  const [form, setForm] = useState({
    code: '',
    type: 'fixed',
    value: '',
    min_cart_value: '',
    description: ''
  });
  const [coupons, setCoupons] = useState([]);
  const [success, setSuccess] = useState('');
  const [editId, setEditId] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5005/api/coupons/${editId}`, form);
        setSuccess('Coupon updated successfully!');
      } else {
        await axios.post('http://localhost:5005/api/coupons', form);
        setSuccess('Coupon created successfully!');
      }
      setForm({
        code: '',
        type: 'fixed',
        value: '',
        min_cart_value: '',
        description: ''
      });
      setEditId(null);
      fetchCoupons();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error saving coupon:', err);
    }
  };

  const fetchCoupons = async () => {
    try {
      const res = await axios.get('http://localhost:5005/api/coupons');
      setCoupons(res.data);
    } catch (err) {
      console.error('Error fetching coupons:', err);
    }
  };

  const handleEdit = (coupon) => {
    setForm({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      min_cart_value: coupon.min_cart_value,
      description: coupon.description
    });
    setEditId(coupon._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/api/coupons/${id}`);
      fetchCoupons();
      setSuccess('Coupon deleted!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting coupon:', err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="container-fluid mt-4 col-11 mx-auto">
      <h2 className="mb-4 text-center">Coupon Management</h2>

      {success && <div className="alert alert-success">{success}</div>}

      <form className="card p-4 shadow-sm mb-4" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <input name="code" className="form-control" placeholder="Coupon Code" value={form.code} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <select name="type" className="form-select" value={form.type} onChange={handleChange}>
              <option value="fixed">Fixed</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
          <div className="col-md-6">
            <input name="value" type="number" className="form-control" placeholder="Value" value={form.value} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <input name="min_cart_value" type="number" className="form-control" placeholder="Minimum Cart Value" value={form.min_cart_value} onChange={handleChange} required />
          </div>
          <div className="col-12">
            <textarea name="description" className="form-control" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-warning">{editId ? 'Update Coupon' : 'Create Coupon'}</button>
          </div>
        </div>
      </form>

      <h4>All Coupons</h4>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Code</th>
              <th>Type</th>
              <th>Value</th>
              <th>Min Cart Value</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length > 0 ? (
              coupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td>{coupon.code}</td>
                  <td>{coupon.type}</td>
                  <td>{coupon.value}</td>
                  <td>{coupon.min_cart_value}</td>
                  <td>{coupon.description}</td>
                  <td>
                    <button onClick={() => handleEdit(coupon)} className="btn btn-sm btn-warning me-2">Edit</button>
                    <button onClick={() => handleDelete(coupon._id)} className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No coupons available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponForm;
