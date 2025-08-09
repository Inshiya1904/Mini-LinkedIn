import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          LinkedInClone
        </Link>
        <nav className="relative flex items-center gap-4">
          {user ? (
            <>
              <div
                onClick={toggleDropdown}
                className="flex items-center gap-2 text-gray-600 cursor-pointer select-none"
              >
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span>{user.name}</span>
              </div>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded shadow-lg z-50 w-44"
                >
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate(`/user/${user._id}`);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/update-profile");
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
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
