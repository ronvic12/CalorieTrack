import { Routes, Route } from "react-router-dom";
import Layout from './views/Layout/Layout';
import Home from "./views/Home";
import Register from "./views/Register"
import Dashboard from "./views/Dashboard"
import Login from "./views/Login"
 function App() {
  return ( 
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        {/* <Route index element ={<Home />} /> */}
      </Routes>
  );
}


export default App;