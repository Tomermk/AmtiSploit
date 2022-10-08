import React,{useState, useRef, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card } from 'antd';
import logo from './assets/react.svg'
import './App.css'

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const userRef = useRef(null);

  useEffect( () => {
    if(userRef.current) {
      userRef.current.focus();
    }
  },[userRef]);

  const onFinish = async() => {
    try {
      const res = await axios.post("http://localhost:3000/login", {username,password});
      const jwt = res.data.token;
      localStorage.setItem("auth-jwt", JSON.stringify(jwt));
      if(location.state) {
        navigate("/",{state: {collapsed: location.state.collapsed}});
      } else {
        navigate("/");
      }
    } catch (err) {
      if(err.response) {
        console.log(err.response.data);
        setError(err.response.data);
      } else {
        console.log(err);
      }
    }
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
              { whitespace: true,
                message: 'Email cannot be empty'
              },
            ]}
          >
            <Input 
              prefix={<MailOutlined className="site-form-item-icon" />} 
              placeholder="example@gmail.com" 
              value={username} 
              onChange={(e) => {setUsername(e.target.value);
              setError("");}}
              ref= {userRef}
              />
          </Form.Item>
          <Form.Item
            //label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
              { 
                whitespace: true,
                message: 'Password cannot be empty'
              },
              // { 
              //   min: 8,
              //   message: 'Password cannot be shorter than 8 characters'
              // },
              // {
              //   pattern: /^(?=.*\d).{8,}$/,
              //   message: 'Password must include one digit'
              // },
              // {
              //   pattern: /^(?=.*[a-z]).{8,}$/,
              //   message: 'Password must include at least one small letter'
              // },
              // {
              //   pattern: /^(?=.*[A-Z]).{8,}$/,
              //   message: 'Password must include at least one capital letter'
              // },
              // {
              //   pattern: /^(?=.*[!@#$%\^\&*\)\(+=._\-)]).{8,}$/,
              //   message: 'Password must include at least one special character'
              // }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              iconRender={(visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined/>))}
              value={password}
              onChange={(e) => {setPassword(e.target.value);
              setError("");}}
            />
          </Form.Item>
          { error && <Form.Item style={{color: 'red'}}>
              {error}
          </Form.Item>}
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