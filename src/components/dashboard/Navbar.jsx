import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center h-[88px] px-6 bg-blue-400 text-white shadow-md">
      <p className="text-2xl font-bold">Welcome, {user.name}</p>
      <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
