import {createContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import  jwt_decode  from "jwt-decode";


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(() => localStorage.getItem('refresh') ? JSON.parse(localStorage.getItem('refresh')) : "");
    const [reToken, setReToken] = useState("");
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [collapsed, setCollapsed] = useState(false);
    const [current, setCurrent] = useState('/');
    const navigate = useNavigate();

    const loginUser = async (e) => {
        try {
            const res = await axios.post("http://localhost:3000/login", {'username': e.email,'password': e.password});
            const {accessToken, refreshToken} = res.data;
            setToken(accessToken);
            setReToken(refreshToken);
            localStorage.setItem('authorization', JSON.stringify(res.data.accessToken));
            localStorage.setItem('refresh', JSON.stringify(res.data.refreshToken));
            navigate("/");
          } catch (err) {
            setLoading(false);
            if(err.response) {
              console.log(err.response.data);
              setError(err.response.data);
            } else {
              console.log(err);
            }
          }
    }

    const logoutUser =() => {
        const {role, userid, username, ...rest} = user;
        setUser({...rest});
        localStorage.removeItem('authorization');
        localStorage.removeItem('refresh');
        setReToken("");
        setToken("");
        navigate("/login");
    }


    useEffect(() => {
        if(token) {
          const decodedToken = jwt_decode(token);
          if(decodedToken){
            const {username, userid, role} = decodedToken;
            setUser({...user, 'username': username, 'userid': userid, 'role': role});
          }
            localStorage.setItem('authorization', JSON.stringify(token));
        } else {
            localStorage.setItem('refresh', JSON.stringify(reToken));
        }
    }, [token, reToken]);

    let contextData = {
        token: token,
        reToken: reToken,
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        loading: loading,
        setLoading: setLoading,
        error: error,
        setError: setError,
        setToken: setToken,
        setReToken: setReToken,
        collapsed: collapsed,
        setCollapsed: setCollapsed,
        current: current,
        setCurrent: setCurrent,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
    
}

