import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          LinkedInClone
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              {/* <Link to="/profile" className="flex items-center gap-2 text-gray-600"> */}
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span>{user.name}</span>
              {/* </Link> */}
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600">
                Login
              </Link>
              <Link to="/register" className="text-gray-600">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
