import React,{useState, useRef, useEffect, useContext} from 'react';
import { LockOutlined, MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card } from 'antd';
import { AuthContext } from './context/AuthContext';
import logo from './assets/react.svg'
import './App.css'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userRef = useRef(null);
  const {loginUser, error, loading,setError ,setLoading} = useContext(AuthContext);

  useEffect( () => {
    if(userRef.current) {
      userRef.current.focus();
    }
  },[userRef]);

  const onFinish = async(e) => {
    loginUser(e);
    setLoading(false);
  };

  const onFinishFailed = () => {
    setLoading(false);
  }

  const handleClick = () => {
    setLoading(true);
  }

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
          onFinishFailed={onFinishFailed}
        >
          <img src={logo} alt='logo' style={{width: 100, paddingBottom: '20px'}} />
          <Form.Item
            //label="username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
              { whitespace: true,
                message: 'Username cannot be empty'
              },
            ]}
          >
            <Input 
              prefix={<MailOutlined className="site-form-item-icon" />} 
              placeholder="Username" 
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
            <Button type="primary" htmlType="submit" className="login-form-button" shape='round' loading={loading} onClick={handleClick}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login