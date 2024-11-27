import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../layout/Navbar";
import axiosInstance from "../api/axiosInstance";
export default function Home() {
  //const [users, setUsers] = useState([]);

  const { domain_id } = useParams();
  const [students, setStudents] = useState([]);
  console.log(domain_id);
  useEffect(() => {
    fetchStudentbyDomain();
   }, [domain_id]);

   console.log("students",students);
  const fetchStudentbyDomain = async()=>{
    console.log("Hello");
    console.log(
     domain_id 
    );
    const studentDetailsResponse = await axiosInstance.get(`/students/${domain_id}`, {requiresAuth: true});
          console.log(studentDetailsResponse.data);
          setStudents(studentDetailsResponse.data);
        

  }
  

  return (
    <div><Navbar/>
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Student ID</th>
              <th scope="col">Roll Number</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">CGPA</th>
              <th scope="col">Total Credits</th>
              <th scope="col">Graduation Year</th>
              <th scope="col">Specialization</th>
              <th scope="col">Placement ID</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr>
                <th scope="row" key={student.student_id}>
                  {student.student_id}
                </th>
                <td>{student.roll_number}</td>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>{student.email}</td>
                <td>{student.cgpa}</td>
                <td>{student.total_credits}</td>
                <td>{student.graduation_year}</td>
                <td>{student.specialisation}</td>
                <td>{student.placement_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container">
      <Link className="btn btn-danger mx-2" to="/home">
        Back to Home
      </Link>
      </div>
    </div>
    </div>
  );
}
