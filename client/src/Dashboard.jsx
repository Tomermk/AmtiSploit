import {useContext} from 'react'
import SideMenu from './SideMenu'
import StatisticsPage from './StatisticsPage'
import NotFound from './NotFound';
import AttackPage from './AttackPage';
import UsersManagement from './UsersManagement';
import {Routes,Route,useNavigate} from "react-router-dom"
import { Layout } from 'antd';
import { IdleTimerContainer } from './Components/idleTimerContainer';
import {AuthContext} from './context/AuthContext';
import Logo from "./assets/logo_only.svg";
import testLogo from "./assets/logo-no-background.svg";
const {Content, Sider} = Layout
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate();
  const {logoutUser, collapsed, setCollapsed, setCurrent} = useContext(AuthContext);


  const handleMenuClick = (target) =>{
    if( target.key === 'signout'){
      setCurrent('/');
      logoutUser();
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
          <div className='logo'>
            <object data={collapsed ? Logo : testLogo} type="image/svg+xml" className='logoImage' style={collapsed ? {} :{width: 150}}>
              <img src={collapsed ? Logo : testLogo}/>
            </object>
          </div>
          <SideMenu onMenuClick={handleMenuClick}/>
        </Sider>
        <Layout className='site-layout'>
          <Content style={{ margin: '0 16px',}}>
            <Routes>
                <Route exact path="/" element={<StatisticsPage/>}/>
                <Route exact path="/attack" element={<AttackPage/>}/>
                <Route exact path="/usersmgmt" element={<UsersManagement/>}/>
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