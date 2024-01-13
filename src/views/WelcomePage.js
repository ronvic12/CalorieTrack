import React,{Component} from 'react';
import NavBar from "./NavBar/NavBar"


export default class Welcome extends Component { 
    render() {
        return(
            <div>
                <h1>CalorieTrack</h1>
                <NavBar></NavBar>
            </div>
            
        )
    }
}