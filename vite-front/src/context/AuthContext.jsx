import {createContext, useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(() => localStorage.getItem('authorization') ? JSON.parse(localStorage.getItem('authorization')) : null);
    const [reToken, setReToken] = useState(() => localStorage.getItem('refresh') ? JSON.parse(localStorage.getItem('refresh')) : null);
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const loginUser = async (e) => {
        try {
            const res = await axios.post("http://localhost:3000/login", {'username': e.email,'password': e.password});
            setUser(res.data.username);
            setToken(res.data.accessToken);
            setReToken(res.data.refreshToken);
            localStorage.setItem('authorization', JSON.stringify(res.data.accessToken));
            localStorage.setItem('refresh', JSON.stringify(res.data.refreshToken));
            if(location.state) {
              navigate("/",{state: {collapsed: location.state.collapsed}});
            } else {
              navigate("/");
            }
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
          localStorage.clear();
          setToken(null);
          setReToken(null);
          setUser(null);
          navigate("/login", {state: {collapsed: collapsed}});
    }

    useEffect(() => {
        if(token) {
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
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
    
}

