import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <h2 className="text-xl font-bold p-4">Student Base</h2>
      <ul className="space-y-4 px-4">
        <li>
          <Link to="/" className="hover:text-gray-400">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/student-form" className="hover:text-gray-400">
            Student Form
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
