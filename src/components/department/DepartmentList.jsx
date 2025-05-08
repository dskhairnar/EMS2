import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Use `useNavigate`
import DataTable from "react-data-table-component";
import { DepartmentButtons } from "../../utils/DepartmentHelpers";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Correctly use `useNavigate` hook

  useEffect(() => {
    const fetchDepartments = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/department",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentButtons ID={dep._id} />,
          }));
          setDepartments(data);
        } else {
          setError("Failed to load departments. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        setError(error.response?.data.error || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await axios.delete(`/api/departments/${id}`);
        fetchDepartments();
      } catch (err) {
        setError("Failed to delete department");
      }
    }
  };

  return (
    <div className="p-5 bg-gradient-to-b from-purple-500 to-red-500 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-500 text-2xl">{error}</div>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-white">Manage Department</h3>
          </div>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search by Department Name"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 mr-2"
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
            >
              Add New Department
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <DataTable
              columns={[
                {
                  name: "S.No",
                  selector: (row) => row.sno,
                  sortable: true,
                  width: "60px", // Width for serial number column
                },
                {
                  name: "Department Name",
                  selector: (row) => row.dep_name,
                  sortable: true,
                  cell: (row) => (
                    <div className="text-left">{row.dep_name}</div>
                  ), // Align text to the left
                  width: "calc(100% - 200px)", // Calculate remaining space for the buttons
                },
                {
                  name: "Action",
                  selector: (row) => row.action,
                  button: true,
                  width: "140px",
                },
              ]}
              data={departments}
              pagination // Enable pagination if necessary
              noDataComponent={
                <div className="text-center text-gray-500">
                  No departments available
                </div>
              }
              highlightOnHover
              pointerOnHover
              customStyles={{
                table: {
                  style: {
                    borderRadius: "8px",
                    width: "100%",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "#f3f4f6",
                    borderBottomColor: "#e5e7eb",
                    borderBottomWidth: "2px",
                    minHeight: "56px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  },
                },
                rows: {
                  style: {
                    minHeight: "48px",
                    "&:nth-child(odd)": {
                      backgroundColor: "#f9fafb",
                    },
                  },
                },
              }}
              responsive={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DepartmentList;
