import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import { useEffect } from "react";
import { fetchAuthUser, logoutUser } from "./store/slices/auth-slice";

function App() {
  const dispatch = useDispatch();
  const { authUser, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Test Passport.js - cookie and redux tools kit
        </h1>
        {isLoading && <p className="text-blue-500">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {authUser ? (
          <div>
            <img
              src={authUser.picture}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <p className="text-xl font-semibold mb-2">
              ดึงชื่อ: {authUser.name}
            </p>
            <p className="text-xl font-semibold mb-2">
              ดึง Email: {authUser.email}
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-full mt-4"
            >
              Logout
            </button>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}

export default App;
