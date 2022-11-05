import {Card} from 'antd'
import {Pie} from 'react-chartjs-2';

export default function PieChart({attackName, rawData, index}) {
    const orderDataByAttack = (attackName) => {
        let data = [];
        for(let i = 1; i < 4; i++) {
          let j = i
          if( j == 2){
            j = j * 2;
          }
          let num = rawData.find(vuln => vuln.attack === attackName && vuln.status === j);
          data.push(num ? num.status_count : 0);
          }
        data.splice(1, 0, data.splice(2, 1)[0]);
          return data;
        }

    const data = {
        labels: ['Safe', 'Vulnerable', 'Error'],
        datasets: [
            {
            label: '# of Successeful Attacks',
            data: orderDataByAttack(attackName),
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



  return (
    <Card title={attackName} key={index} bordered={false} bodyStyle={{ padding: '24px', display: 'flex', justifyContent: 'center'}}>
        <Pie data={data} height="400px" options={{ responsive: false}}/>
    </Card>
  )
}
