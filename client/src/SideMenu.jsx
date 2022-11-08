
import {useState, useContext, useEffect} from 'react'
import { AuthContext } from './context/AuthContext';
import {Menu} from 'antd'
import {PoweroffOutlined,BugOutlined, PieChartOutlined, SettingOutlined, UserOutlined, UnlockOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons'
import 'antd/dist/antd.css';




function SideMenu({onMenuClick}) {
const [theme, setTheme] = useState('dark');
const {user, current, setCurrent} = useContext(AuthContext);

useEffect(() => {
    onMenuClick({key: current});
}, [current])

const items = [
  { label: 'Dashboard', key: '/', icon: <PieChartOutlined />},
  { label: 'Exploits management', key: '/attack', icon: <BugOutlined />},
  { label:'Settings',key: 'settings', icon: <SettingOutlined/>, children: [
    {label: 'Users', key: '/usersmgmt', icon: <UserOutlined/>},
    {label: 'Permissions',key: '10', icon: <UnlockOutlined/>}
  ] },
  { label: 'Logout', key: 'signout',icon: <PoweroffOutlined/>, danger: true}
];

function checkAdmin() {
  if(user.role !== 'Admin'){
    const filteredItems = items.filter(item => item.label !== 'Settings');
    return filteredItems;
  }
  return items;
}
let correctItems = checkAdmin();

const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };


  return (
    <>
      <Menu
        onClick={(e) => onMenuClick(e)}
        defaultSelectedKeys={[current]}
        defaultOpenKeys={['/attack']}

        mode="inline"
        theme={theme}
        items={correctItems}
      />
    </>
  )
}



export default SideMenu