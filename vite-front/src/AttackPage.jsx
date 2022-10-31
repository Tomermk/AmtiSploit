import { useState } from "react";
import { Button, Form, Input, Select, Table, Tag, Typography, Tooltip } from "antd";
import {SyncOutlined} from "@ant-design/icons";
import "./AttackPage.css";

export default function AttackPage() {
  const [host, setHost] = useState("");
  const [attackName, setAttackName] = useState("Log4shell");

  const { Title } = Typography;
  const { Option } = Select;

  const description = {
    Log4shell: "Log4Shell is a vulnerability in the Apache Log4j library that allows remote code execution.",
    BlueKeep: "BlueKeep is a vulnerability in the Remote Desktop Protocol (RDP) that allows remote code execution.",
  }

  const status = {
    1: {
      color: '#10953C',
      text: 'Safe',
      icon: '',
    },
    2: {
      color: '#EA9425',
      text: 'In Progress',
      icon: <SyncOutlined spin/>,
    },
    3: {
      color: '#db2d2f',
      text: 'Vulnerable',
      icon: '',
    },
    4: {
      color: '#8fc9fb',
      text: 'EXTENDED',
      icon: '',
    },
  }

  const dataSource = [
    {
      key: "1",
      time: "2022-10-01 12:35:00",
      url: 'http://192.168.31.143:8080',
      attack: "Log4shell",
      status: 2,
    },
    {
      key: "2",
      time: "2022-10-01 12:45:00",
      url: 'http://192.168.31.143:8080',
      attack: "Log4shell",
      status: 3,
    },
    {
      key: "3",
      time: "2022-11-21 12:33:00",
      url: 'http://192.168.31.143:8080',
      attack: "Log4shell",
      status: 1,
    },
  ];

  const columns = [
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Attack",
      dataIndex: "attack",
      key: "attack",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: text => <Tag className="tag" color={status[text].color} icon={status[text].icon}>{status[text].text}</Tag>
    },
  ];

  const selectBefore = (
    <Select defaultValue="http://" className="select-before">
      <Option value="http">http://</Option>
      <Option value="https">https://</Option>
    </Select>
  );

  return (
    <div className="container">
      <Title className="form-title">Exploit Management</Title>
      <div className="form">
        <Form>
          <Input
            className="form-element"
            placeholder="Host/IP:Port"
            addonBefore={selectBefore}
            value={host}
            onChange={(e) => {
              setHost(e.target.value);
            }}
            style={{ width: 300 }}
          />
          <Tooltip title={description[attackName]}>
            <Select
              className="form-element"
              defaultValue={attackName}
              value={attackName}
              onChange={(value) => {
                setAttackName(value);
              }}
              style={{ width: 120 }}
            >
              <Option value="Log4shell">Log4shell</Option>
              <Option value="BlueKeep">BlueKeep</Option>
            </Select>
          </Tooltip>
          <Button type="primary">Launch</Button>
        </Form>
      </div>
      <div className="table">
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
}
