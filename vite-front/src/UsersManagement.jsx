import {useContext, useEffect, useState} from 'react'
import { Space, Table, Select, Button, Typography} from 'antd';
import useSWR from 'swr';
import useAxios from './utils/useAxios';
import {AuthContext} from './context/AuthContext';
import "./UsersManagement.css"


export default function UsersManagement() {
    const axiosAuth = useAxios();
    const fetcher = url => axiosAuth.get(url).then(res => res.data)
    const { data: users, loading, error} = useSWR("/users",fetcher);
    const {user, setCurrent} = useContext(AuthContext)
    const [isAdmin, setIsAdmin] = useState(false);
    const [changedUsers, setChangedUsers] = useState({});
    const [ userRoles, setUserRoles] = useState(users);
    const roles = ['Admin', 'User'];
    const {Option} = Select;
    const { Title } = Typography;


    useEffect(() => {
        if(user.role !== 'Admin'){
            setIsAdmin(false);
            setCurrent('/');
        } else {
            setIsAdmin(true);
        }
    }, [])



    function showDefaultRole(record) {
        const defaultRole = userRoles.filter((user) => user.username === record.username).map((user) => user.userRole);
        return defaultRole[0];
    }

    function handleSelectChange(value, record) {
        const newUsersRoles = userRoles.map((user) => {
            if(user.username === record.username){
                user.userRole = value;
            }
            return user;
        })
        if(changedUsers[record.username]){
            const {[record.username]: value, ...rest} = changedUsers;
            setChangedUsers({...rest});
        } else {
            setChangedUsers({...changedUsers, [record.username]: value});
        }
        setUserRoles(newUsersRoles);
    }

    function renderHeader() {
        return (
            <div className="users-management-header">
                <Space>
                    <Button type="primary" onClick={() => console.log("update")} loading={loading}>Update</Button>
                    <Button type="primary" onClick={() => console.log("add user")}>Add User</Button>
                </Space>
            </div>
        )
    }

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
            render: (text, record) => (
                <Select
                    defaultValue= {showDefaultRole(record)}
                    value= {showDefaultRole(record)}
                    onChange={(value) => handleSelectChange(value, record)}
                    style={{ width: 120 }}
                >
                {roles.map((roleName) => {
                return (
                    <Option key={roleName} value={roleName}>
                        {roleName}
                    </Option>
                )})}
            </Select>
            ),
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle" key={record.username}>
                    <Button>Reset Password</Button>
                    <Button danger={true}>Delete</Button>
                </Space>
            ),
        },
    ];

    if(error) {
        return <div>failed to load</div>
    }
    if(users){
        
        const realData = users.map((user) => { 
            return {
                username: user.username,
                role: user.userRole,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: new Date(user.createdAt).toLocaleString('en-GB'),
            }
        })

        return (
            <div className="container">
                <Title className="form-title">Users Management</Title>
                { isAdmin && <Table columns={columns} dataSource={realData} loading={loading} title={renderHeader} footer={() => ""}/>}
            </div>
        )
    }
}
