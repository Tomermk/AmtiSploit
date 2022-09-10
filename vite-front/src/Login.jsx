import React,{useState, useEffect} from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card } from 'antd';
import logo from './assets/react.svg'
import './App.css'

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const onFinish = (values) => {
    navigate("/",{state: {collapsed: location.state.collapsed}});
  };


  return (
    <div style={{height: '100vh', backgroundColor: '#001529'}}>
      <Card className='login-card' style={{
        width: 450,
        padding: '24px',
        top: '25%',
        borderRadius: '15px'
      }}>
        <Form
          name="normal_login"
          className="login-form"
          //labelCol={{span: 6}}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <img src={logo} alt='logo' style={{width: 100, paddingBottom: '20px'}} />
          <Form.Item
            //label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input 
              prefix={<MailOutlined className="site-form-item-icon" />} 
              placeholder="example@gmail.com" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}/>
          </Form.Item>
          <Form.Item
            //label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              iconRender={(visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined/>))}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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