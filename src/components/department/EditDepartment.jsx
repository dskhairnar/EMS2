import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Corrected: Using useNavigate hook

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/department/${id}`,
        department,
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.success) {
        navigate("/admin-dashboard/departments"); // Corrected: Using navigate function
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div> Loading.....</div>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Edit Department
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="dep_name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Department Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Dep Name"
                  name="dep_name"
                  onChange={handleChange}
                  value={department.dep_name || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Description"
                  onChange={handleChange}
                  value={department.description || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows="4"
                ></textarea>
              </div>
              <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300">
                Edit Department
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
