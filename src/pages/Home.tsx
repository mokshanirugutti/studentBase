import Sidebar from "@/components/SideBar";
import UserBadge from "@/components/userBadge";
import { useUser } from "../context/UserContext";
import StudentForm from "@/components/students/StudentForm";
import Dashboard from "./Dashboard";
import { Routes, Route } from "react-router-dom";

const Home = () => {
  const { user } = useUser();

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 w-full px-8 py-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome, {user?.firstName}</h1>
          <UserBadge />
        </div>

        {/* Nested Routes */}
        <div className="mt-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/student-form" element={<StudentForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
