import axios from "axios";
import  jwt_decode  from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:3000";

const useAxios = () => {
    const { token, reToken, setToken, setReToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const axiosAuth = axios.create({
        baseURL,
        headers: {Authorization: `Bearer ${token}`}
    });

    const refreshToken = async  () => {
        try {
          const res = await axios.post(`${baseURL}/login/refresh`, 
          {refreshToken: reToken});
          if(res.status === 200) {
            setToken(res.data.accessToken);
            setReToken(res.data.refreshToken);
            return res.data;
          }
          else {
            navigate("/login");
          }
        } catch (err) {
          if(err.response) { 
            console.log(err.response.data);
          } else {
            console.log(err);
          }
        }
      }

    axiosAuth.interceptors.request.use(async req => {
    let currentDate = new Date();
    try{
      const decodedToken = jwt_decode(token);
    if(decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        req.headers["Authorization"] = "Bearer " + data.accessToken;
    }} catch(err) {
        navigate("/login");
    }
      return req;
    },(error) => {
    return Promise.reject(error);
    });

    return axiosAuth;

}

export default useAxios;