import { useState } from 'react';
import {AutoComplete, Card, Col, Select} from 'antd'
import {Pie} from 'react-chartjs-2';

export default function HostsPie({rawData, loading, error}) {
    const [host,setHost] = useState('All');
    const[ hostData, setHostData] = useState([3,2,1]);

    const data = {
        labels: ['Safe', 'Vulnerable', 'Error'],
        datasets: [
            {
            label: '# of Successeful Attacks',
            data: hostData,
            backgroundColor: [
                'rgba(60, 179, 113, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(60, 179, 113, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
            },
        ],
        };

    const SelectForPie = () => {
        const {Option} = Select;
        const handleChange = (value) => {
            setHost(value);
        }
        return (
            <Select defaultValue="All" value={host} style={{ width: 120 }} onChange={handleChange}>
                <Option value="All">All</Option>
                <Option value="Host 1">Host 1</Option>
                <Option value="Host 2">Host 2</Option>
                <Option value="Host 3">Host 3</Option>
                <Option value="Host 4">Host 4</Option>
                <Option value="Host 5">Host 5</Option>
            </Select>
        )
    }

  return (
    <Col span={8}>
        <Card title={<SelectForPie/>} bordered={false} bodyStyle={{ padding: '24px', display: 'flex', justifyContent: 'center'}} >
            <Pie data={data} height="400px" options={{responsive: false}}/>
        </Card>
    </Col>
  )
}
