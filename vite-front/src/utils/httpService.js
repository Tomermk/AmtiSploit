import axios from 'axios'

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