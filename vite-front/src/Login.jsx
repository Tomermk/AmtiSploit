import React,{useState} from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card } from 'antd';
import logo from './assets/react.svg'
import './App.css'

function Login() {

  const [usename, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div style={{height: '100vh', backgroundColor: '#001529'}}>
      <Card className='login-card' style={{
        width: 450,
        padding: '24px',
        top: '25%',
        borderRadius: '90px'
      }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <img src={logo} alt='logo' style={{width: 100, paddingBottom: '20px'}} />
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me |</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" shape='round'>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login