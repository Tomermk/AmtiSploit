import { useState} from "react";
import { Drawer, Button, Space, Form, Input, Row, Col, message } from "antd";
import useAxios from "../utils/useAxios";

export default function ResetPasswordForm({ onOpen, onCancel, isCurrent, userId, testMessage }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ destroyOnClose, setDestroyOnClose] = useState(true);
  const axiosAuth = useAxios();



  const handleClick = () => {
    setLoading(true);
    if(isCurrent){
      axiosAuth.post(`/users/${userId}/resetSelfPassword`,{'oldPassword': currentPassword, 'newPassword': newPassword}).then((res) => {
        testMessage.success("Password reset successfully");
        setLoading(false);
        setNewPassword("");
        setConfirmNewPassword("");
        setCurrentPassword("");
        setDestroyOnClose(true);
        onCancel();
      }).catch((err) => {
        if(err.response.status === 400 || err.response.status === 401){
          message.error(err.response.data.errors[0].msg);
        }else{
          message.error("Internal server error");
        }
        setLoading(false);
      });
    }else{
      axiosAuth.post(`/users/${userId}/resetPassword`,{'newPassword': newPassword}).then((res) => {
        testMessage.success("Password reset successfully");
        setLoading(false);
        setNewPassword("");
        setConfirmNewPassword("");
        setCurrentPassword("");
        setDestroyOnClose(true);
        onCancel();
      }).catch((err) => {
        if(err.response.status !== 500){
          message.error(err.response.data.errors[0].msg);
        }else{
          message.error("Internal server error");
        }
        setLoading(false);
      });
  }
}

  return (
    <Drawer
      title="Reset Password"
      width={720}
      onClose={onCancel}
      open={onOpen}
      // visible={onOpen}
      bodyStyle={{ paddingBottom: 80 }}
      destroyOnClose={destroyOnClose}
      extra={
        <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={handleClick} type="primary" loading={loading} disabled={(newPassword && confirmNewPassword) ? false : true}>
            Submit
          </Button>
        </Space>
      }
    >
      <Form layout="vertical" requiredMark={false} initialValues={{remember: false}}>
        {isCurrent && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your current password",
                  },
                  { whitespace: true, message: "Password cannot be empty" },
                ]}
              >
                <Input.Password
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: "Please enter new password" },
                { whitespace: true, message: "Password cannot be empty" },
              ]}
            >
              <Input.Password
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="confirmNewPassword"
              label="Confirm Password"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm password" },
                { whitespace: true, message: "Password cannot be empty" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
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
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
