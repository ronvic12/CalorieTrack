import { useState,useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar/NavBar';
export default function Dashboard() {
  const [weight, setWeight] = useState(0);
  const [data,setdata] = useState(null)

  useEffect(()=>{
    axios.post('http://localhost:4000/api/auth/User',{})
      .then((response) => {
      console.log(response)
      setdata(response)
    })
    .catch((error) => {
        console.log("Error fetching data",error);
    });
  },[])


  return (
    <div className="App">
      <NavBar></NavBar>
    {data ? <h1>Welcome{data}</h1>:<h1>Loading...</h1>}
    <label>
     Enter Weight
      <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
    </label>
    <br />
    <button>Submit</button>
  </div>
  );
}
