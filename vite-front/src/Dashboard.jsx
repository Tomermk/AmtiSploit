import React,{useState} from 'react'
import './Dashboard.css'
import SideMenu from './SideMenu'
import StatisticsPage from './StatisticsPage'
import NotFound from './NotFound';
import {Routes,Route,useNavigate, useLocation } from "react-router-dom"
import { Layout } from 'antd';
const {Content, Sider} = Layout

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState('/');
  const [collapsed, setCollapsed] = useState(() => {
    if(location.state){
      return location.state.collapsed;
    }
    return false;
  });

  function handleMenuClick(target){
    if( target.key === 'signout'){
      navigate("/login", {state: {collapsed: collapsed}});
      setCurrent(target.key);
    } else {
      setCurrent(target.key);
      navigate(target.key)
    }
  }

  return (
    <>
    <Layout style={{ minHeight: '100vh',}}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value => setCollapsed(value))}>
        <div className='logo'/>
        <SideMenu current={current} onMenuClick={handleMenuClick}/>
      </Sider>
      <Layout className='site-layout'>
        <Content style={{ margin: '0 16px',}}>
          <Routes>
              <Route exact path="/" element={<StatisticsPage/>}/>
              <Route exact path="/attack1" element={<h1>This is the attack page 1</h1>}/>
              <Route exact path="/attack2" element={<h1>This is the attack page 2</h1>}/>
              <Route path='/*' element={<NotFound/>} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
    </>
  )
}

export default Dashboard