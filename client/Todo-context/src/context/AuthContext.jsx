import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/Loader.jsx";
import { loginUser, signupUser } from "../api/index.js";
import { LocalStorage } from "../utils/index.js";
import { useNavigate } from "react-router-dom";

// Create context for manage authentication related data and functions
const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
});

// create a hook to access AuthContext
const useAuth = () => {
  return useContext(AuthContext);
};

// create a component that provide authentication related data and functions
const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Function to handle user Login
  const login = async (data) => {
    setError(null);
    setIsLoading(true);
    setUser(null);

    try {
      const response = await loginUser(data);
      setUser(response.data);
      LocalStorage.set("user", response.data);
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    setUser(null);
    setError(null);
    setIsLoading(false);
    LocalStorage.removeItem("user"); // remove token from localhost for logout action
    navigate("/login"); // redirect user to the login page after logged out
  };

  // Function to handle register user
  const signup = async (data) => {
    setError(null);
    setIsLoading(true);
    setUser(null);

    try {
      const response = await signupUser(data);
      console.log(response);
      setUser(response.data);
      LocalStorage.set("user", response.data);
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };

  // check for saved user in local storage during component initialization
  useEffect(() => {
    setIsLoading(true);
    const _user = LocalStorage.get("user");
    if (_user) {
      setUser(_user);
    }
    setIsLoading(false);
  }, []);

  // Provide authentication related data and functions through the context
  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        login,
        logout,
        signup,
      }}
    >
      {isLoading ? <Loader /> : children} {/* Display a loader while loading */}
    </AuthContext.Provider>
  );
};

/**
 * export custom hook to access auth context
 * export Auth context
 * export provider component
 */
export { useAuth, AuthContext, AuthProvider };
