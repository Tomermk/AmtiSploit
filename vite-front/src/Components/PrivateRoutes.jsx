import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    let token = localStorage.getItem('auth-jwt');
    let auth = {'token':false};
    if (token) auth = {'token':true};
    return (
      auth.token ? <Outlet/> : <Navigate to='/login'/>
    )
  }

export default PrivateRoutes;