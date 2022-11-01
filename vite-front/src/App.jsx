import Dashboard from './Dashboard';
import Login from './Login';
import {Routes, Route, BrowserRouter} from "react-router-dom"
import PrivateRoutes from './Components/PrivateRoutes';
import {AuthProvider} from './context/AuthContext';



function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path="/*" element={<Dashboard/>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
