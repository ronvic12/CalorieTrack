import {NavLink} from 'react-router-dom';
import './NavBar.css';

const NavBar = () => (
    <div className= "nav-bar">
        <nav>
            <NavLink exact = "true" activeclassname = "active" to ="/">
                Home
            </NavLink>
            <NavLink  activeclassname = "active" className ="register" to ="/Register">
                Register
            </NavLink>
            <NavLink  activeclassname = "active" className ="Login" to ="/Login">
               Login
            </NavLink>
        </nav>
    </div>
)

export default NavBar;