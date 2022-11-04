import { useState } from "react";
import { Button, Form, Input, Select, Typography } from "antd";
import ExploitSelector from "./Components/ExploitSelector";
import ExploitTable from "./Components/ExploitTable";
import useSWR, {useSWRConfig} from "swr";
import useAxios from "./utils/useAxios";
import "./AttackPage.css";

export default function AttackPage() {
  const axiosAuth = useAxios();
  const [host, setHost] = useState("");
  const [protocol, setProtocol] = useState("http://");
  const [attackName, setAttackName] = useState("Log4Shell");
  const {mutate}  = useSWRConfig();
  const fetcher = url => axiosAuth.get(url).then(res => res.data)
  const { data: attacks} = useSWR("/launch",fetcher);
  const { data: tableData} = useSWR("/launch/exploits",fetcher, { refreshInterval: 5000 });


  function handleSelectChange(value) {
    setAttackName(value);
  }

  function handleLaunchClick() {
    const hostname = protocol + host;
    console.log(hostname);
    axiosAuth.post("/launch", {'attackname': attackName,'hostname': hostname});
    mutate("/launch/exploits", async table => {
      const updateTable = await fetcher("/launch/exploits");
      return updateTable;
    });
  }

  const { Title } = Typography;
  const { Option } = Select;

  const selectBefore = (
    <Select defaultValue={protocol} className="select-before" onChange={(value) => setProtocol(value)}>
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
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
          {!attacks && <Select loading={true} />}
          {attacks && (
            <ExploitSelector
              data={attacks}
              name={attackName}
              onSelectChange={handleSelectChange}
            />
          )}
          <Button type="primary" onClick={handleLaunchClick}>Launch</Button>
        </Form>
      </div>
      <ExploitTable tableData={tableData}/>
    </div>
  );
}
