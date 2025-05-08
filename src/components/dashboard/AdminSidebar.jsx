import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaClipboardList,
  FaMoneyBillWave,
  FaCog,
} from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <div className="min-h-screen w-64 bg-gradient-to-b from-purple-500 via-pink-500 to-red-500 text-white flex flex-col shadow-lg">
      {/* Sidebar Header */}
      <div className="p-6 shadow-md">
        <h2 className="text-4xl font-bold text-center tracking-wide">EMS</h2>
      </div>

      {/* Navigation Links */}
      <div className="flex-grow mt-8">
        <NavLink
          to="/admin-dashboard"
          end
          className={({ isActive }) =>
            `flex items-center px-6 py-4 mb-3 ${
              isActive ? "bg-purple-700" : "hover:bg-purple-600"
            } transition-all duration-300 rounded-lg`
          }
        >
          <FaTachometerAlt className="mr-4 text-xl" />
          <span className="text-lg font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin-employees"
          end
          className={({ isActive }) =>
            `flex items-center px-6 py-4 mb-3 ${
              isActive ? "bg-purple-700" : "hover:bg-purple-600"
            } transition-all duration-300 rounded-lg`
          }
        >
          <FaUsers className="mr-4 text-xl" />
          <span className="text-lg font-medium">Employees</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/departments"
          end
          className={({ isActive }) =>
            `flex items-center px-6 py-4 mb-3 ${
              isActive ? "bg-purple-700" : "hover:bg-purple-600"
            } transition-all duration-300 rounded-lg`
          }
        >
          <FaBuilding className="mr-4 text-xl" />
          <span className="text-lg font-medium">Departments</span>
        </NavLink>

        <NavLink
          to="/admin-leaves"
          end
          className={({ isActive }) =>
            `flex items-center px-6 py-4 mb-3 ${
              isActive ? "bg-purple-700" : "hover:bg-purple-600"
            } transition-all duration-300 rounded-lg`
          }
        >
          <FaClipboardList className="mr-4 text-xl" />
          <span className="text-lg font-medium">Leaves</span>
        </NavLink>

        <NavLink
          to="/admin-salary"
          end
          className={({ isActive }) =>
            `flex items-center px-6 py-4 mb-3 ${
              isActive ? "bg-purple-700" : "hover:bg-purple-600"
            } transition-all duration-300 rounded-lg`
          }
        >
          <FaMoneyBillWave className="mr-4 text-xl" />
          <span className="text-lg font-medium">Salary</span>
        </NavLink>

        <NavLink
          to="/admin-settings"
          end
          className={({ isActive }) =>
            `flex items-center px-6 py-4 mb-3 ${
              isActive ? "bg-purple-700" : "hover:bg-purple-600"
            } transition-all duration-300 rounded-lg`
          }
        >
          <FaCog className="mr-4 text-xl" />
          <span className="text-lg font-medium">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
