import { useState } from "react";
import { Button, Form, Input, Select, Table, Tag } from "antd";
import "./AttackPage.css";

export default function AttackPage() {
  const [host, setHost] = useState("");
  const [attackName, setAttackName] = useState("Log4J");

  const { Option } = Select;

  const status = {
    1: {
      color: '#64ea91',
      text: 'Success',
    },
    2: {
      color: '#f8c82e',
      text: 'In Progress',
    },
    3: {
      color: '#f69899',
      text: 'Failed',
    },
    4: {
      color: '#8fc9fb',
      text: 'EXTENDED',
    },
  }

  const dataSource = [
    {
      key: "1",
      time: "2022-10-01 12:35:00",
      url: 'http://192.168.31.143:8080',
      attack: "Log4J",
      status: 2,
    },
    {
      key: "2",
      time: "2022-10-01 12:45:00",
      url: 'http://192.168.31.143:8080',
      attack: "Log4J",
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
      render: text => <Tag color={status[text].color}>{status[text].text}</Tag>
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
      <h1 className="form-title">Attack Page</h1>
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
          />
          <Select
            className="form-element"
            defaultValue={attackName}
            value={attackName}
            onChange={(value) => {
              setAttackName(value);
            }}
            style={{ width: 120 }}
          >
            <Option value="Log4J">Log4J</Option>
            <Option value="BlueKeep">BlueKeep</Option>
          </Select>
          <Button>Launch</Button>
        </Form>
      </div>
      <div className="table">
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
}
