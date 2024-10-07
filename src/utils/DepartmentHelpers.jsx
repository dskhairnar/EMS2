import axios from 'axios';

// DepartmentColumns.jsx
export const columns = [
    {
        name: "SNo.",
        selector: (row) => row.sno,
        sortable: true
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
    }
];


export const DepartmentButtons = ({ id }) => {
    const handleEdit = () => {
        // Implement edit functionality
        console.log("Edit department with ID:", id);
        // You can navigate to an edit page or show a modal here
    };

    const handleDelete = async () => {
        // Implement delete functionality
        if (window.confirm("Are you sure you want to delete this department?")) {
            try {
                const response = await axios.delete(`https://ems-rnvg.onrender.com/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    alert("Department deleted successfully.");
                    // Optionally trigger a refetch of departments in the parent component
                }
            } catch (err) {
                alert("Failed to delete department. Please try again."); // Using a generic alert message
            }
            
        }
    };

    return (
        <div className="flex space-x-2">
            <button onClick={handleEdit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Edit
            </button>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
            </button>
        </div>
    );
};
