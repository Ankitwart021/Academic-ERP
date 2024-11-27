import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import axiosInstance from '../api/axiosInstance';

export default function AddDomain() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    program: '',
    batch: '',
    capacity: '',
    qualification: '',
  });

  // Destructure state
  const { program, batch, capacity, qualification } = user;

  // Input change handler
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Form submit handler
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting: ", user);
      await axiosInstance.post('/domains-post', user, { requiresAuth: true });
      navigate('/home');
    } catch (error) {
      console.error("Error adding domain:", error);
      alert('Failed to add domain. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h3 className="text-center m-4">Add New Domain</h3>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="program" className="form-label">
                  Program Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Program Name"
                  name="program"
                  value={program}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="batch" className="form-label">
                  Batch
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Program Batch"
                  name="batch"
                  min="2019"
                  max="2100"
                  value={batch}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="capacity" className="form-label">
                  Capacity
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Program Capacity"
                  name="capacity"
                  value={capacity}
                  onChange={onInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="qualification" className="form-label">
                  Qualification
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter required Qualifications"
                  name="qualification"
                  value={qualification}
                  onChange={onInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/home">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
