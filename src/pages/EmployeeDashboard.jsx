import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-gray-800">
            <h1 className="text-xl font-bold text-white">EMS Employee</h1>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-2">
            <Link
              to="/employee-dashboard"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === "dashboard"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </Link>
            <Link
              to="/employee-dashboard/profile"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === "profile"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              My Profile
            </Link>
            <Link
              to="/employee-dashboard/attendance"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === "attendance"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("attendance")}
            >
              Attendance
            </Link>
            <Link
              to="/employee-dashboard/leaves"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === "leaves"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("leaves")}
            >
              Leave Requests
            </Link>
            <Link
              to="/employee-dashboard/payslips"
              className={`flex items-center px-4 py-2 rounded-lg ${
                activeTab === "payslips"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("payslips")}
            >
              Payslips
            </Link>
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
