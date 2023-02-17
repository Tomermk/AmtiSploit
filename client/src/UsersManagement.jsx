import { useContext, useEffect, useState } from "react";
import { Space, Table, Select, Button, Typography, Popconfirm, message } from "antd";
import {
  UserAddOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import useSWR, {useSWRConfig} from "swr";
import useAxios from "./utils/useAxios";
import { AuthContext } from "./context/AuthContext";
import NewUserForm from "./Components/NewUserForm";
import ResetPasswordForm from "./Components/ResetPasswordForm";
import PopConfirm from "./Components/PopConfirm";
import "./UsersManagement.css";

export default function UsersManagement() {
  const axiosAuth = useAxios();
  const fetcher = (url) => axiosAuth.get(url).then((res) => res.data);
  const { data: users, loading, error } = useSWR("/users", fetcher);
  const { mutate } = useSWRConfig();
  const { user, setCurrent } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isCurrentUserReset, setIsCurrentUserReset] = useState(false);
  const [changedUsers, setChangedUsers] = useState({});
  const [userRoles, setUserRoles] = useState(users);
  const [newUserOpen, setNewUserOpen] = useState(false);
  const [updatePassOpen, setUpdatePassOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const roles = ["Admin", "User"];
  const { Option } = Select;
  const { Title } = Typography;

  useEffect(() => {
    if (user.role !== "Admin") {
      setIsAdmin(false);
      setCurrent("/");
    } else {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (users) {
      setUserRoles(users);
    }
  }, [users]);

  function handleNewUserClick() {
    setUpdatePassOpen(false);
    setNewUserOpen(true);
  }

  function handleUpdatePassClick(username, userid) {
    setSelectedUserId(userid);
    if (username === user.username) {
      setIsCurrentUserReset(true);
    } else {
      setIsCurrentUserReset(false);
    }
    setNewUserOpen(false);
    setUpdatePassOpen(true);
  }

  function handleCancel() {
    setNewUserOpen(false);
    setUpdatePassOpen(false);
  }

  const handleUserDelete = (userId) => {
    axiosAuth.delete(`/users/${userId}`).then((res) => {
      if(res.status === 200)
      {
        message.success("User deleted successfully");
        mutate("/users");
        // const newUsers = users.filter((user) => user.id !== userId);
        // setUserRoles(newUsers);
      }
    }).catch(err => {
      if(err.response.status !== 500){
        message.error(err.response.data.errors[0].msg);
      }else{
        message.error("Internal server error");
      }
    });
    setConfirmOpen(false);
  }


  const handleUpdateClick = () => {
    if(Object.keys(changedUsers).length > 0){
      let changedUsersArray = Object.entries(changedUsers).map(([key, value]) => {
        return { username: key, role: value };
      });
      changedUsersArray.forEach((user) => {
        axiosAuth
          .put("/users", { username: user.username ,role: user.role })
          .then((res) => {
            if(res.status === 200)
            {
              message.success(`${user.username} updated successfully`);
            }
            const { [user.username]: value, ...rest } = changedUsers;
            setChangedUsers({ ...rest });
          }).catch(err => {
            if(err.response.status !== 500){
              message.error(`${user.username} error:` + err.response.data.errors[0].msg);
            }else{
              message.error("Internal server error");
            }
          });
      });
    
  } else {
    message.info("No changes were selected");
  }
  mutate("/users");
  };


  function handleSelectChange(value, record) {
    const newUsersRoles = userRoles.map((user) => {
      if (user.username === record.username) {
        user.userRole = value;
      }
      return user;
    });
    if (changedUsers[record.username]) {
      const { [record.username]: value, ...rest } = changedUsers;
      setChangedUsers({ ...rest });
    } else {
      setChangedUsers({ ...changedUsers, [record.username]: value });
    }
    setUserRoles(newUsersRoles);
  }


  function showDefaultRole(record) {
    if( userRoles) {
      const defaultRole = userRoles.filter((user) => user.username === record.username).map((user) => user.userRole);
      return defaultRole[0];
    }
  }


  function renderHeader() {
    return (
      <div className="users-management-header">
        <Space>
          <Button
            type="primary"
            onClick={handleUpdateClick}
            loading={loading}
            icon={<UserSwitchOutlined style={{ fontSize: "20px" }} />}
          >
            Update Roles
          </Button>
          <Button
            type="primary"
            onClick={handleNewUserClick}
            icon={<UserAddOutlined style={{ fontSize: "20px" }} />}
          >
            Add User
          </Button>
        </Space>
      </div>
    );
  }


  if (error) {
    return (
      <>
        <Title className="form-title">Users Management</Title>
        <div>failed to load</div>
        <Table columns={[]} dataSource={[]} />
      </>
    );
  }
  if (users) {

    const columns = [
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        render: (text, record) => (
          <Select
            defaultValue={showDefaultRole(record)}
            value={showDefaultRole(record)}
            onChange={(value) => handleSelectChange(value, record)}
            style={{ width: 120 }}
            disabled={user.username == record.username ? true : false}
          >
            {roles.map((roleName) => {
              return (
                <Option key={roleName} value={roleName}>
                  {roleName}
                </Option>
              );
            })}
          </Select>
        ),
      },
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text, record) => <>{record.email ? record.email : ""}</>,
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (text, record) => (
          <Space size="middle" key={record.username}>
            <Button onClick={() => handleUpdatePassClick(record.username, record.userid)}>
              Reset Password
            </Button>
            <PopConfirm record={record} user={user} onUserDelete={handleUserDelete}  />
          </Space>
        ),
      },
    ];

    const realData = users.map((user) => {
      return {
        username: user.username,
        userid: user.id,
        role: user.userRole,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddress,
        createdAt: new Date(user.createdAt).toLocaleString("en-GB"),
      };
    });

    return (
      <div className="container">
        <div className="table-container">
          <Title className="form-title">Users Management</Title>
          {isAdmin && (
            <Table
              columns={columns}
              dataSource={realData}
              loading={loading}
              title={renderHeader}
              footer={() => ""}
            />
          )}
          <NewUserForm onOpen={newUserOpen} onCancel={handleCancel} testMessage={message} mutation={mutate}/>
          <ResetPasswordForm
            onOpen={updatePassOpen}
            onCancel={handleCancel}
            isCurrent={isCurrentUserReset}
            userId={selectedUserId}
            testMessage={message}
          />
        </div>
      </div>
    );
  }
}
