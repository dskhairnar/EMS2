import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelpers';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false); // State for loading

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true); // Correctly set loading state
      try {
        const response = await axios.get('https://ems-rnvg.onrender.com/api/department', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++, // Fixed typo here from 'snp' to 'sno'
            dep_name: dep.dep_name,
            action: <DepartmentButtons id={dep._id} /> // Pass the department ID to the buttons if needed
          }));
          setDepartments(data);
        }
      } catch (error) {
        console.error("Error fetching departments:", error); // Log the error for debugging
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false); // Set loading state to false in finally block
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="p-5 bg-gradient-to-b from-purple-500 to-red-500 min-h-screen">
      {depLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-white text-2xl">Loading...</div>
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
                  name: 'S.No',
                  selector: row => row.sno,
                  sortable: true,
                  width: '60px', // Width for serial number column
                },
                {
                  name: 'Department Name',
                  selector: row => row.dep_name,
                  sortable: true,
                  cell: row => <div className="text-left">{row.dep_name}</div>, // Align text to the left
                  width: 'calc(100% - 200px)', // Calculate remaining space for the buttons
                },
                {
                  name: 'Action',
                  selector: row => row.action,
                  button: true,
                  width: '140px', // Adjust width for action buttons
                },
              ]}
              data={departments}
              pagination // Enable pagination if necessary
              noDataComponent={<div className="text-center text-gray-500">No departments available</div>}
              highlightOnHover
              pointerOnHover
              customStyles={{
                table: {
                  style: {
                    borderRadius: '8px',
                    width: '100%', // Ensure the table takes full width
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: '#f3f4f6',
                    borderBottomColor: '#e5e7eb',
                    borderBottomWidth: '2px',
                    minHeight: '56px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                  },
                },
                rows: {
                  style: {
                    minHeight: '48px', // override the row height
                    '&:nth-child(odd)': {
                      backgroundColor: '#f9fafb',
                    },
                  },
                },
              }}
              // Additional styles for responsiveness
              responsive={true}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DepartmentList;
