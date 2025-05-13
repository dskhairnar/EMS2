import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Profile</CardTitle>
          <User className="text-primary-600 dark:text-primary-400" size={32} />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">John Doe</div>
          <CardDescription>Software Engineer</CardDescription>
          <Button
            className="mt-4 w-full"
            variant="outline"
            size="sm"
            onClick={() => navigate("/employee-dashboard/profile")}
          >
            View Profile
          </Button>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Attendance</CardTitle>
          <Clock className="text-primary-600 dark:text-primary-400" size={32} />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">98%</div>
          <CardDescription>This Month</CardDescription>
          <Button
            className="mt-4 w-full"
            variant="outline"
            size="sm"
            onClick={() => navigate("/employee-dashboard/attendance")}
          >
            View History
          </Button>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Leave Balance</CardTitle>
          <Calendar
            className="text-primary-600 dark:text-primary-400"
            size={32}
          />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">15</div>
          <CardDescription>Days Remaining</CardDescription>
          <Button
            className="mt-4 w-full"
            variant="outline"
            size="sm"
            onClick={() => navigate("/employee-dashboard/leaves")}
          >
            Apply Leave
          </Button>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Documents</CardTitle>
          <FileText
            className="text-primary-600 dark:text-primary-400"
            size={32}
          />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">5</div>
          <CardDescription>Active Documents</CardDescription>
          <Button
            className="mt-4 w-full"
            variant="outline"
            size="sm"
            onClick={() => navigate("/employee-dashboard/payslips")}
          >
            View All
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeSummary;
