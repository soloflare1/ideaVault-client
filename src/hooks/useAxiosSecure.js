import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
 
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://ideavault-server-nqa7.onrender.com",
  withCredentials: true,
});

const useAxiosSecure = () => 
{
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;