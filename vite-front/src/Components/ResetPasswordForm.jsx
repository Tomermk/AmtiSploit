import {useState} from 'react'
import { Drawer,Button, Space, Form, Input, Row, Col } from 'antd'

export default function ResetPasswordForm({onOpen, onCancel}) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

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
        <Button onClick={onCancel} type="primary">
          Submit
        </Button>
      </Space>
    }
    >
        <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[{ required: true, message: 'Please confirm new password' }]}
                    >
                        <Input.Password placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="confirmNewPassword"
                        label="Confirm Password"
                        rules={[{ required: true, message: 'Please confirm new password' }]}
                    >
                        <Input.Password placeholder="Confirm Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Drawer>
  )
}
