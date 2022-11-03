import {useState,useContext} from 'react'
import {Button} from 'antd'
import useAxios from './utils/useAxios';

function StatisticsPage() {
  const [data, setData] = useState("");
  let axiosAuth = useAxios();

  

  const handleButtonClick = async() => {
    try{
      const res = await axiosAuth.get("http://localhost:3000/api");
      console.log(res.data);
      setData(res.data);
    } catch(err) {
      console.log("error in handle click",err);
    }
  }

  return (
    <div>
        <h1>This is statistic page</h1>
        <Button type="primary" onClick={handleButtonClick}>Primary Button</Button>
        {data && <p>{JSON.stringify(data)}</p>}
    </div>
  )
}

export default StatisticsPage