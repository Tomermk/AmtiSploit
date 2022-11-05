import React from 'react'
import useAxios from './utils/useAxios'
import useSWR from 'swr'
import { Row, Col, Card, Skeleton} from 'antd'
import { DotChartOutlined } from '@ant-design/icons'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import {Line} from 'react-chartjs-2';
import {faker} from '@faker-js/faker';
import PieChart from './Components/PieChart';
import HostsPie from './Components/HostsPie';


function StatisticsPage() {
  const axiosAuth = useAxios();
  const fetcher = url => axiosAuth.get(url).then(res => res.data)
  const { data: vulnStats, loading: vulnStatsLoading, error: vulnStatsError} = useSWR("/statistics/vulnsStatus",fetcher);
  const { data: hostStats, loading: hostsStatsLoading, error:hostsStatsError} = useSWR("/statistics/vulnsStatus",fetcher);
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,ArcElement, Tooltip, Legend);

  const fetchAttackNames = () => {
    let attackNames = [];
    if(vulnStats){
      attackNames = vulnStats.map(vuln => vuln.attack).filter((vuln, i, self) => self.indexOf(vuln) === i);
    }
    return attackNames;
  }

  const attackNames = fetchAttackNames();


  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data2 = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


  return (
    <div style={{paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px'}}>
      <Row gutter={20} justify="center" align='top'>
          {attackNames.length != 0 && attackNames.map((attackName, index) => (
            <Col span={ 24 / (attackNames.length + 1)} key={index}>
              <PieChart attackName={attackName} index={index} rawData={vulnStats} />
            </Col>
          ))}
          {attackNames.length == 0 && 
               <Skeleton.Node active={vulnStatsLoading} style={{
                width: '518px',
                height: '566.18px',
               }}>
               <DotChartOutlined
                 style={{
                   fontSize: 40,
                   color: '#bfbfbf',
                 }}
               />
              </Skeleton.Node>}
            {vulnStatsError && <div style={{
              width: '518px',
              height: '566.18px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 20,
              color: '#bfbfbf',
            }}> Failed to load</div>}
        <HostsPie rawData={hostStats} loading={hostsStatsLoading} error={hostsStatsError} />
      </Row>
      <Row style={{ marginTop: '10px'}}>
        <Col span={24}>
          <Card title="Vulnerable over time" bordered={false} bodyStyle={{ padding: '24px'}} >
            <Line options={options} data={data2} height='300px'/>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default StatisticsPage