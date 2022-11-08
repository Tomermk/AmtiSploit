import { useState, useEffect } from 'react';
import {AutoComplete, Card, Col, Select} from 'antd'
import {Pie} from 'react-chartjs-2';

export default function HostsPie({rawData, loading, error, colSpan}) {
    const [host,setHost] = useState('All');


    const createHostsList = () => 
    {
     if(rawData){
        return rawData.map(host => host.host).filter((host, i, self) => self.indexOf(host) === i);
     }
     else return [];
    }

    const hostsList = createHostsList();

    const fetchedData = (hostsList, rawData) =>{
        if(hostsList.length != 0 && rawData){
        let dataArr = [];
        for(let i = 0; i < hostsList.length; i++){
            let statusArr = [];
            let tempData = rawData.filter(current => current.host === hostsList[i]);
            for(let j = 1; j < 4; j++){
                let w = j;
                if(w == 2){
                    w = 4;
                }
                let num = tempData.find(vuln => vuln.status == w);
                statusArr.push(num ? num.status_count : 0);
            }
            statusArr.splice(1, 0, statusArr.splice(2, 1)[0]);
            dataArr[i] = {
                url: hostsList[i],
                data: statusArr,
            }
        }
        let allData = [0,0,0];
        for(let i=0; i < 3; i++){
            allData[i] = dataArr.reduce((acc, curr) => acc + curr.data[i], 0);
        }
        let finalArray = [...dataArr, {url: 'All', data: allData}];
        return finalArray;
    }
    else return [];
    }


    const hostData = fetchedData(hostsList, rawData);


    if(loading) return <div>Loading...</div>
    if(error) return <div>Error...</div>
    if(!rawData) return <div>No data...</div>

    if(hostData.length != 0){

        const viewData = hostData.find(current => current.url == host);

        const data = {
            labels: ['Safe', 'Vulnerable', 'Error'],
            datasets: [
                {
                label: '# of Successeful Attacks',
                data: viewData?.data ? viewData.data : [0,0,0],
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
                <Select defaultValue="All" value={host} style={{ width: 200 }} onChange={handleChange}>
                    <Option value="All">All</Option>
                    {rawData &&  hostsList.map((host, index) => (
                        <Option value={host} key={index}>{host}</Option>
                    ))}
                </Select>
            )
        }

    return (
        <Col span={24 / (colSpan + 1)}>
            <Card title={<SelectForPie/>} bordered={false} bodyStyle={{ padding: '24px', display: 'flex', justifyContent: 'center'}} headStyle={{height: '57px'}} >
                <Pie data={data} height="400px" options={{responsive: true}}/>
            </Card>
        </Col>
    );
    }
}
