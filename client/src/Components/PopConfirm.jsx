import {useState} from 'react'
import { Popconfirm, Button } from 'antd'
import { UserDeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'


function PopConfirm({record, user, onUserDelete}) {
    const [confirmOpen, setConfirmOpen] = useState(false)
  return (
    <Popconfirm
    title="Are you sure to delete this user?"
    open={confirmOpen}
    onConfirm={() => onUserDelete(record.userid)}
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
  )
}

export default PopConfirm