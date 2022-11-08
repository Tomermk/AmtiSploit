import React from 'react'
import { Col, Card, Skeleton} from 'antd'
import { Line } from 'react-chartjs-2'
import {faker} from '@faker-js/faker';

export default function VulnLine({rawData, vulnNames,loading, error}) {

    const colors = ['rgb(255, 99, 132)','rgb(53, 162, 235)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(153, 102, 255)','rgb(255, 159, 64)','rgb(201, 203, 207)']
    const backColors = ['rgba(255, 99, 132, 0.5)','rgba(53, 162, 235, 0.5)','rgba(255, 205, 86, 0.5)','rgba(75, 192, 192, 0.5)','rgba(153, 102, 255, 0.5)','rgba(255, 159, 64, 0.5)','rgba(201, 203, 207, 0.5)']
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

        const labels = createLabels();

        const createData = () => {
            const dataSet = [];
            for (let i = 0; i < vulnNames.length; i++) {
                const data = [];
                for( let j=0; j<labels.length; j++){
                    let filteredDates = rawData.filter(current => current.attack == vulnNames[i] && new Date(current.createdAt).toLocaleDateString('en-GB') == labels[j]);
                    data.push(filteredDates.length);
                }
                dataSet.push({
                    label: vulnNames[i],
                    data: data,
                    fill: false,
                    borderColor: colors[i],
                    backgroundColor: backColors[i],
                })
            }
            return dataSet;
        }


        const data = {
        labels,
        datasets: createData(),
        };

    return (
            <Col span={24}>
            <Card title="Exploits over time" bordered={false} bodyStyle={{ padding: '24px'}} >
                <Line options={options} data={data} height='300px'/>
            </Card>
            </Col>
        )
    }
}
