//config axios to use Authorization header on every request
import axios from "axios";
import { useCookies } from "react-cookie";

const axiosConfig = () => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
export default axiosConfig;
