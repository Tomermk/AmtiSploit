import {useState} from 'react'
import { Drawer,Button, Space, Form, Input, Row, Col } from 'antd'

export default function ResetPasswordForm({onOpen, onCancel, isCurrent}) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");

  return (
    <Drawer
    title="Reset Password"
    width={720}
    onClose={onCancel}
    open={onOpen}
    visible={onOpen}
    bodyStyle={{ paddingBottom: 80 }}
    extra={ 
        <Space>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onCancel} type="primary">
          Submit
        </Button>
      </Space>
    }
    >
        <Form layout="vertical" hideRequiredMark>
            {isCurrent && 
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="currentPassword"
                        label="Current Password"
                        rules={[{ required: true, message: 'Please enter your current password' },
                        { whitespace: true, message: 'Password cannot be empty'},
                    ]}
                    >
                        <Input.Password placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    </Form.Item>
                </Col>
            </Row>
            }
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[{ required: true, message: 'Please enter new password' },
                        { whitespace: true, message: 'Password cannot be empty'}]}
                    >
                        <Input.Password placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="confirmNewPassword"
                        label="Confirm Password"
                        rules={[{ required: true, message: 'Please confirm new password' },
                        { whitespace: true, message: 'Password cannot be empty'}]}
                    >
                        <Input.Password placeholder="Confirm Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Drawer>
  )
}
