import { useState } from 'react';
import axios from 'axios';
export default function Dashboard() {
  const [weight, setWeight] = useState(0);



  return (
    <div className="App">
    <h1>Welcome</h1>
    <label>
     Enter Weight
      <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
    </label>
    <br />
    <button>Submit</button>
  </div>
  );
}
