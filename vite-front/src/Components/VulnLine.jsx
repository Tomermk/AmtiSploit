import React from 'react'
import { Col, Card, Skeleton} from 'antd'
import { Line } from 'react-chartjs-2'
import {faker} from '@faker-js/faker';

export default function VulnLine({rawData, vulnNames,loading, error}) {


    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    if(loading){
        return (
            <Col span={24}>
                <Card title="Vulnerabilities over time" style={{ width: '100%', height: '100%' }}>
                    <Skeleton active={loading} />
                </Card>
            </Col>
        )
    }

    if(error){
        return (
            <Col span={24}>
                <Card title="Vulnerabilities over time" style={{ width: '100%', height: '100%' }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 20,
                        color: '#bfbfbf',
                    }}> Failed to load</div>
                </Card>
            </Col>
        )
    }
    if(rawData){
        const allDates = rawData.map(current => new Date(current.createdAt));

        const createLabels = () => {
            let labels = [];
            const todayDateWeekAgo = new Date();
            todayDateWeekAgo.setDate(todayDateWeekAgo.getDate() - 7);
            for ( let i= 0; i<8 ;i++){
                labels.push(todayDateWeekAgo.toLocaleDateString('en-GB'));
                todayDateWeekAgo.setDate(todayDateWeekAgo.getDate() + 1);
            }
            return labels;
        }

        const testLabels = createLabels();

        const createData = () => {
            let data = [];
            for (let i = 0; i < vulnNames.length; i++) {
                data.push({
                    label: vulnNames[i],
                    data: [faker.random.number(10), faker.random.number(10), faker.random.number(10), faker.random.number(10), faker.random.number(10), faker.random.number(10), faker.random.number(10), faker.random.number(10)],
                    fill: false,
                    borderColor: faker.internet.color(),
                    tension: 0.1
                })
            }
            return data;
        }

        const data2 = {
        labels: testLabels,
        datasets: [
            {
            label: vulnNames[0],
            data: testLabels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
            label: vulnNames[1],
            data: testLabels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
        };

    return (
            <Col span={24}>
            <Card title="Vulnerable over time" bordered={false} bodyStyle={{ padding: '24px'}} >
                <Line options={options} data={data2} height='300px'/>
            </Card>
            </Col>
        )
    }
}
