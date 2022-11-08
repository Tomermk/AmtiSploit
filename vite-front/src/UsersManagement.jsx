import { useContext, useEffect, useState } from "react";
import { Space, Table, Select, Button, Typography, Popconfirm } from "antd";
import {
  UserAddOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import useSWR from "swr";
import useAxios from "./utils/useAxios";
import { AuthContext } from "./context/AuthContext";
import NewUserForm from "./Components/NewUserForm";
import ResetPasswordForm from "./Components/ResetPasswordForm";
import "./UsersManagement.css";

export default function UsersManagement() {
  const axiosAuth = useAxios();
  const fetcher = (url) => axiosAuth.get(url).then((res) => res.data);
  const { data: users, loading, error } = useSWR("/users", fetcher);
  const { user, setCurrent } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isCurrentUserReset, setIsCurrentUserReset] = useState(false);
  const [changedUsers, setChangedUsers] = useState({});
  const [userRoles, setUserRoles] = useState(users);
  const [newUserOpen, setNewUserOpen] = useState(false);
  const [updatePassOpen, setUpdatePassOpen] = useState(false);
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

  function handleNewUserClick() {
    setUpdatePassOpen(false);
    setNewUserOpen(true);
  }

  function handleUpdatePassClick(username) {
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

  function showDefaultRole(record) {
    const defaultRole = userRoles
      .filter((user) => user.username === record.username)
      .map((user) => user.userRole);
    return defaultRole[0];
  }

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

  function renderHeader() {
    return (
      <div className="users-management-header">
        <Space>
          <Button
            type="primary"
            onClick={() => console.log("update")}
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
      render: (text, record) => <>{record.email ? record.email : "No email"}</>,
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
          <Button onClick={() => handleUpdatePassClick(record.username)}>
            Reset Password
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            open={confirmOpen}
            onConfirm={() => setConfirmOpen(false)}
            onCancel={() => setConfirmOpen(false)}
            okText="Yes"
            cancelText="No"
            disabled={user.username == record.username ? true : false}
            icon={
              <ExclamationCircleFilled
                style={{ color: "red", fontSize: "18px" }}
              />
            }
          >
            <Button
              onClick={() => setConfirmOpen(true)}
              danger={true}
              icon={<UserDeleteOutlined style={{ fontSize: "20px" }} />}
              disabled={user.username == record.username ? true : false}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (error) {
    return (
      <>
        <Title className="form-title">Users Management</Title>
        <div>failed to load</div>
        <Table columns={columns} dataSource={{}} />
      </>
    );
  }
  if (users) {
    const realData = users.map((user) => {
      return {
        username: user.username,
        role: user.userRole,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddress,
        createdAt: new Date(user.createdAt).toLocaleString("en-GB"),
      };
    });

    return (
      <div className="container">
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
        <NewUserForm onOpen={newUserOpen} onCancel={handleCancel} />
        <ResetPasswordForm
          onOpen={updatePassOpen}
          onCancel={handleCancel}
          isCurrent={isCurrentUserReset}
        />
      </div>
    );
  }
}
