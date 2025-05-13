import { useEffect } from "react";
import axios from "axios";
import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./AuthContext";

function App() {
  // Token refresh function
  const authToken = useAuth();
  const { login } = useAuth();

  const GetNewToken = async () => {
    try {
      const response = await axios.post(
        "/admin/auth/refresh",
        {},
        {
          headers: { Authorization: `Bearer ${authToken?.authToken}` },
        }
      );
      // console.log(response?.data);
      const token = response?.data?.access_token;
      login(token);
    } catch (error) {
      console.error(error?.response?.data);
    }
  };

  // Call once on mount
  useEffect(() => {
    GetNewToken();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      GetNewToken();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
