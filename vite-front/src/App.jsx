import Dashboard from './Dashboard';
import Login from './Login';
import {Routes, Route, BrowserRouter} from "react-router-dom"
import PrivateRoutes from './Components/PrivateRoutes';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path="/*" element={<Dashboard/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
