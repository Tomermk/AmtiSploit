import {useContext, useEffect, useState} from 'react'
import { Space, Table} from 'antd';
import {AuthContext} from './context/AuthContext';
import "./UsersManagement.css"

export default function UsersManagement() {
    const {user, setCurrent} = useContext(AuthContext)
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if(user.role !== 'Admin'){
            setIsAdmin(false);
            setCurrent('/');
        } else {
            setIsAdmin(true);
        }
    }, [])

    const data = [
        {
          username: 'Admin',
          role: 'Admin',
        },
        {
            username: 'tomermk@gmail.com',
            role: 'User',
        },
        {
            username: 'Amitay Biton',
            role: 'Admin',
        },
      ];

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle" key={text}>
                    <a>Invite {record.username}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
  return (
    <div className="container">
        { isAdmin && <Table columns={columns} dataSource={data} title={() => "Users Table"} footer={() => ""}/>}
    </div>
  )
}
