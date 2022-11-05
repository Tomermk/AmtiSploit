import React from 'react'
import { Row, Col, Divider, Card} from 'antd'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import {Pie, Line} from 'react-chartjs-2';
import {faker} from '@faker-js/faker';


function StatisticsPage() {

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,ArcElement, Tooltip, Legend);

  const labelsPie = ['Vulnerable', 'Safe', 'Error'];

  const data = {
    labels: ['Vulnerable', 'Safe', 'Error'],
    datasets: [
      {
        label: '# of Successeful Attacks',
        data: labelsPie.map(() => faker.datatype.number({ min: 0, max: 30 })),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(60, 179, 113, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(60, 179, 113, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data2 = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


  return (
    <div style={{paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px'}}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Log4Shell" bordered={false} bodyStyle={{ padding: '24px 36px 24px 5px'}}>
            <Pie data={data} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="BlueKeep" bordered={false} bodyStyle={{ padding: '24px 36px 24px 5px'}}>
            <Pie data={data} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Most Vulenrable Hosts" bordered={false} bodyStyle={{ padding: '24px 36px 24px 5px'}}>
            <Pie data={data} />
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: '10px'}}>
        <Col span={24}>
          <Card title="Vulnerable over time" bordered={false} bodyStyle={{ padding: '24px 36px 24px 5px'}}>
            <Line options={options} data={data2} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default StatisticsPage