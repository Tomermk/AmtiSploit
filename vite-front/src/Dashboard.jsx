import {useState, useEffect} from 'react'
import SideMenu from './SideMenu'
import StatisticsPage from './StatisticsPage'
import NotFound from './NotFound';
import AttackPage from './AttackPage';
import {Routes,Route,useNavigate, useLocation } from "react-router-dom"
import { Layout } from 'antd';
import { IdleTimerContainer } from './Components/idleTimerContainer';
import axios from 'axios';
const {Content, Sider} = Layout
import './Dashboard.css'

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState('/');
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("authorization")));
  const [collapsed, setCollapsed] = useState(() => {
    if(location.state){
      return location.state.collapsed;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('authorization', JSON.stringify(token));
    setToken(token);
  },[token]);

  const handleMenuClick = async(target) =>{
    if( target.key === 'signout'){
      try{
        await axios.post("http://localhost:3000/logout",{},{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
      });
    } catch (err) {console.error(err)};
      localStorage.clear();
      setToken("");
      navigate("/login", {state: {collapsed: collapsed}});
      setCurrent(target.key);
    } else {
      setCurrent(target.key);
      navigate(target.key)
    }
  }

  return (
    <>
    <IdleTimerContainer>
      <Layout style={{ minHeight: '100vh',}}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value => setCollapsed(value))}>
          <div className='logo'/>
          <SideMenu current={current} onMenuClick={handleMenuClick}/>
        </Sider>
        <Layout className='site-layout'>
          <Content style={{ margin: '0 16px',}}>
            <Routes>
                <Route exact path="/" element={<StatisticsPage/>}/>
                <Route exact path="/attack1" element={<AttackPage/>}/>
                <Route exact path="/attack2" element={<h1>This is the attack page 2</h1>}/>
                <Route path='/*' element={<NotFound/>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </IdleTimerContainer>
    </>
  )
}

export default Dashboard