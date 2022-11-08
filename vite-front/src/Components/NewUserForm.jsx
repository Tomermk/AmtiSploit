import { useState } from "react";
import { Drawer, Space, Form, Input, Button, Row, Col, Select } from "antd";
import useAxios from "../utils/useAxios";

export default function NewUserForm({ onCancel, onOpen, testMessage, mutation }) {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("User");
  const { Option } = Select;
  const axiosAuth = useAxios();

  const handleSubmitClick = () => {
    axiosAuth
      .post("/users", {
        'username': userName,
        'password': password,
        'role': role,
        'email': email,
        'firstname': firstName,
        'lastname': lastName,
      })
      .then((res) => {
        testMessage.success("User created successfully");
        mutation('/users');
        setUserName("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRole("User");
        onCancel();
      })
      .catch((err) => {
        if (err.response.status !== 500) {
          testMessage.error(err.response.data.errors[0].msg);
        } else {
          testMessage.error("Internal server error");
        }
      });
  };


  return (
    <Drawer
      title="Create a new account"
      width={720}
      onClose={onCancel}
      open={onOpen}
      visible={onOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmitClick} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="userName"
              label="Username"
              rules={[
                { required: true, message: "Please enter username" },
                { whitespace: true, message: "Username cannot be empty" },
              ]}
            >
              <Input
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="userRole"
              label="Role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select
                placeholder="Please select a role"
                value={role}
                onChange={(e) => setRole(e)}
              >
                <Option value="User">User</Option>
                <Option value="Admin">Admin</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please enter user first name" },
                { whitespace: true, message: "First name cannot be empty" },
              ]}
            >
              <Input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please enter user last name" },
                { whitespace: true, message: "Last name cannot be empty" },
              ]}
            >
              <Input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter user email" },
                { type: "email", message: "The input is not a valid E-mail!" },
              ]}
            >
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter user password" },
                { whitespace: true, message: "Password cannot be empty" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm password" },
                { whitespace: true, message: "Password cannot be empty" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
