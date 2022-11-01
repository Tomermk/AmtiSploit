import {useState,useContext} from 'react'
import {Button} from 'antd'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import {AuthContext} from './context/AuthContext';

function StatisticsPage() {
  const [data, setData] = useState("");
  const {token, reToken, setToken, setReToken} = useContext(AuthContext);


  const axiosAuth = axios.create();
  
  const refreshToken = async  () => {
    try {
      console.log("Im in function")
      const res = await axios.post("http://localhost:3000/login/refresh", 
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

  axiosAuth.interceptors.request.use(async (config) => {
    let currentDate = new Date();
    const decodedToken = jwt_decode(token);
    if(decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("I'm in refresh before function")
      const data = await refreshToken();
      config.headers["Authorization"] = "Bearer " + data.accessToken;
    }
    return config;
  },(error) => {
    return Promise.reject(error);
  });

  const handleButtonClick = async() => {
    try{
      const res = await axiosAuth.get("http://localhost:3000/api",{
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log(res.data);
      setData(res.data);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
        <h1>This is statistic page</h1>
        <Button type="primary" onClick={handleButtonClick}>Primary Button</Button>
        {data && <p>{JSON.stringify(data)}</p>}
    </div>
  )
}

export default StatisticsPage