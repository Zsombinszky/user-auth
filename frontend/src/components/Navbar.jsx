import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white h-16 shadow p-4 flex justify-between items-center w-full">
      <Link to="/" className="text-xl font-bold text-blue-600">
        MyApp
      </Link>

      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-gray-700">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
