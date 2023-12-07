import { Outlet } from "react-router-dom";
import NavBar from '../NavBar/NavBar'
const Layout = () => {
    return (
    <div className="App">
    <NavBar/>
    <Outlet/>
    </div>
    )
}

export default Layout