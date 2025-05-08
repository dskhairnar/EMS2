import { useState, useEffect } from "react";
import axios from "axios";

const EmployeeSummary = () => {
  const [stats, setStats] = useState({
    attendance: {
      present: 0,
      absent: 0,
      late: 0,
    },
    leaves: {
      total: 0,
      used: 0,
      remaining: 0,
    },
    recentActivity: [],
  });

  useEffect(() => {
    // TODO: Fetch actual stats from API
    setStats({
      attendance: {
        present: 18,
        absent: 2,
        late: 1,
      },
      leaves: {
        total: 20,
        used: 5,
        remaining: 15,
      },
      recentActivity: [
        { type: "attendance", date: "2024-03-15", status: "Present" },
        { type: "leave", date: "2024-03-10", status: "Approved" },
      ],
    });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Attendance Summary */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Attendance Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Present Days</span>
              <span className="font-semibold text-green-600">
                {stats.attendance.present}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Absent Days</span>
              <span className="font-semibold text-red-600">
                {stats.attendance.absent}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Late Days</span>
              <span className="font-semibold text-yellow-600">
                {stats.attendance.late}
              </span>
            </div>
          </div>
        </div>

        {/* Leave Summary */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Leave Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Leaves</span>
              <span className="font-semibold">{stats.leaves.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Leaves Used</span>
              <span className="font-semibold text-red-600">
                {stats.leaves.used}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Leaves Remaining</span>
              <span className="font-semibold text-green-600">
                {stats.leaves.remaining}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Mark Attendance
            </button>
            <button className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
              Apply Leave
            </button>
            <button className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700">
              View Payslip
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {stats.recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-800">{activity.type}</p>
                <p className="text-sm text-gray-600">{activity.date}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  activity.status === "Present" ||
                  activity.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeSummary;
