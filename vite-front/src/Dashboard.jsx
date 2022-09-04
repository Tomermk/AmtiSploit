import React,{useState} from 'react'
import SideMenu from './SideMenu'
import StatisticsPage from './StatisticsPage'
import {Routes,Route,useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('/home');

  function handleMenuClick(target){
    if( target.key === 'signout'){
      console.log("signout please");
      navigate("/login")
      setCurrent(target.key);
    } else {
      setCurrent(target.key);
      navigate(target.key)
    }
  }

  return (
    <>
    <div style={{display: 'flex', flexDirection: 'flex-row', height: '100vh'}}>
      <SideMenu current={current} onMenuClick={handleMenuClick}/>
      <div>
        <Routes>
            <Route path="/" element={<StatisticsPage/>}/>
            <Route path="/attack1" element={<h1>This is the attack page 1</h1>}/>
            <Route path="/attack2" element={<h1>This is the attack page 2</h1>}/>
        </Routes>
      </div>
    </div>
    </>
  )
}

export default Dashboard