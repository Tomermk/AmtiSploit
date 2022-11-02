
import React,{useState} from 'react'
import {Menu} from 'antd'
import {PoweroffOutlined,BugOutlined, PieChartOutlined, SettingOutlined, UserOutlined, UnlockOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons'
import 'antd/dist/antd.css';




function SideMenu({current,onMenuClick}) {
const [theme, setTheme] = useState('dark');


  const items = [
    { label: 'Dashboard', key: '/', icon: <PieChartOutlined />},
    { label: 'Exploits management', key: '/attack', icon: <BugOutlined />},
    { label:'Settings',key: 'sub4', icon: <SettingOutlined/>, children: [
      {label: 'Users', key: '9', icon: <UserOutlined/>},
      {label: 'Permissions',key: '10', icon: <UnlockOutlined/>}
    ] },
    { label: 'Logout', key: 'signout',icon: <PoweroffOutlined/>, danger: true}
  ];

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
        items={items}
      />
    </>
  )
}



export default SideMenu