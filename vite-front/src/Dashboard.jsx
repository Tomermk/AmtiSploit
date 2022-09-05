import React,{useState} from 'react'
import SideMenu from './SideMenu'
import StatisticsPage from './StatisticsPage'
import NotFound from './NotFound';
import {Routes,Route,useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('/');

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
      <div style={{ margin: "auto", padding: "10px", width: "50%"}}>
        <Routes>
            <Route exact path="/" element={<StatisticsPage/>}/>
            <Route exact path="/attack1" element={<h1>This is the attack page 1</h1>}/>
            <Route exact path="/attack2" element={<h1>This is the attack page 2</h1>}/>
            <Route path='/*' element={<NotFound/>} />
        </Routes>
      </div>
    </div>
    </>
  )
}

export default Dashboard