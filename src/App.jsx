import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";

// Admin Components
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";

// Employee Components
import EmployeeSummary from "./components/dashboard/EmployeeSummary";
import EmployeeProfile from "./components/employee/EmployeeProfile";
import EmployeeAttendance from "./components/employee/EmployeeAttendance";
import EmployeeLeaves from "./components/employee/EmployeeLeaves";
import EmployeePayslips from "./components/employee/EmployeePayslips";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />
        </Route>

        {/* Employee Routes */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <EmployeeDashboard />
            </PrivateRoutes>
          }
        >
          <Route index element={<EmployeeSummary />} />
          <Route path="profile" element={<EmployeeProfile />} />
          <Route path="attendance" element={<EmployeeAttendance />} />
          <Route path="leaves" element={<EmployeeLeaves />} />
          <Route path="payslips" element={<EmployeePayslips />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
