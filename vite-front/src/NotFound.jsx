import React from 'react'
import {Button, Result} from 'antd'

function NotFound() {
  return (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, you can't hack the hackers."
        />
  )
}

export default NotFound