import { useState, useContext } from "react";
import { Button, Form, Input, Select, Typography } from "antd";
import ExploitSelector from "./Components/ExploitSelector";
import ExploitTable from "./Components/ExploitTable";
import { AuthContext } from "./context/AuthContext";
import useSWR from "swr";
import useAxios from "./utils/useAxios";
import "./AttackPage.css";

export default function AttackPage() {
  const axiosAuth = useAxios();
  const [host, setHost] = useState("");
  const {token} = useContext(AuthContext);
  const [attackName, setAttackName] = useState("Log4Shell");
  const fetcher = url => axiosAuth.get(url).then(res => res.data)
  const { data, error } = useSWR("http://localhost:3000/launch",fetcher);

  function handleSelectChange(value) {
    setAttackName(value);
  }

  const { Title } = Typography;
  const { Option } = Select;

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
          {!data && <Select loading={true} />}
          {data && (
            <ExploitSelector
              data={data}
              name={attackName}
              onSelectChange={handleSelectChange}
            />
          )}
          <Button type="primary">Launch</Button>
        </Form>
      </div>
      <ExploitTable />
    </div>
  );
}
