import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import axiosInstance from '../api/axiosInstance';

export default function ModifyDomain() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    program: "",
    batch: "",
    capacity: "",
    qualification: ""
  });

  const { program, batch, capacity, qualification } = user;
  const [capacityError, setCapacityError] = useState('');

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });

    if (e.target.name === 'capacity' && e.target.value > 300) {
      setCapacityError('Value must be less than or equal to 300');
    } else {
      setCapacityError('');
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axiosInstance.put(`/domains/${id}`, user, { requiresAuth: true });
    navigate("/home");
  };

  const loadUser = async () => {
    const result = await axiosInstance.get(`/domains/${id}`, { requiresAuth: true });
    setUser(result.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (capacity > 300) {
      setCapacityError('Value must be less than or equal to 300');
      return;
    }
    onSubmit(e);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h3 className='text-center m-4'>Modify Existing Domain</h3>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>
                  Program Name
                </label>
                <input type={"text"} className="form-control" placeholder="Enter Program Name" name="program" value={program} onChange={(e) => onInputChange(e)} />
              </div>
              <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>
                  Batch
                </label>
                <input type={"number"} className="form-control" placeholder="Enter Program Batch" name="batch" min="2019" max="2100" value={batch} onChange={(e) => onInputChange(e)} />
              </div>
              <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>
                  Capacity
                </label>
                <input type={"number"} className="form-control" placeholder="Enter Program Capacity" name="capacity" value={capacity} onChange={(e) => onInputChange(e)} />
                {capacityError && <p style={{ color: 'red' }}>{capacityError}</p>}
              </div>
              <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>
                  Qualification
                </label>
                <input type={"text"} className="form-control" placeholder="Enter required Qualifications" name="qualification" value={qualification} onChange={(e) => onInputChange(e)} />
              </div>
              <button type="submit" className="btn btn-outline-primary" to="/home">
                Submit
              </button>
              <Link type="submit" className="btn btn-outline-danger mx-2" to="/home">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
