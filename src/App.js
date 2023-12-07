import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './views/Layout/Layout';
import Home from "./views/Home";
import Register from "./views/Register"
 function App() {
  return ( 
      <Routes>
        <Route path="/" element={<Register/>}/>
        {/* <Route index element ={<Home />} /> */}
      </Routes>
  );
}


export default App;