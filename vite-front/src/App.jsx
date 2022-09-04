import { useState } from 'react';;
import Dashboard from './Dashboard';
import Login from './Login';
import {Routes, Route, BrowserRouter} from "react-router-dom"



function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
