import axios from "axios";
import  jwt_decode  from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const baseURL = "http://localhost:3000";

const useAxios = () => {
    const { token, reToken, setToken, setReToken } = useContext(AuthContext);

    const axiosAuth = axios.create({
        headers: {Authorization: `Bearer ${token}`}
    });

    const refreshToken = async  () => {
        try {
          console.log("Im in function")
          const res = await axios.post(`${baseURL}/login/refresh`, 
          {refreshToken: reToken});
          setToken(res.data.accessToken);
          setReToken(res.data.refreshToken);
          return res.data;
        } catch (err) {
          if(err.response) {
            console.log(err.response.data);
          } else {
            console.log(err);
          }
        }
      }

    axiosAuth.interceptors.request.use(async req => {
    console.log("Im in interceptor")
    let currentDate = new Date();
    const decodedToken = jwt_decode(token);
    if(decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("I'm in refresh before function")
        const data = await refreshToken();
        req.headers["Authorization"] = "Bearer " + data.accessToken;
    }
    return req;
    },(error) => {
    return Promise.reject(error);
    });

    return axiosAuth;

}

export default useAxios;