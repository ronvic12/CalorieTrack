import React,{Component} from 'react';
import { w3cwebsocket as W3CWEBSOCKET}  from "websocket";
import WeightForm from "./Forms"
import Register from "./Register"
const client = new W3CWEBSOCKET('ws://localhost:4000');
// Use App component for now as a main input of setup
// Other Component plans: Show Data and authorization. 
export default class Home extends Component {

    onButtonClicked = (value) =>{
        let messageobj = {
            type:"message",
            msg: value
        }
        client.send(JSON.stringify(messageobj))
    }

      
    componentDidMount(){
        client.onopen = () => {
            console.log('Websocket client connected');
        };
        client.onmessage = (message) => {
            const dataFromserver = JSON.parse(message.data);
            console.log(message);
            console.log("got reply! ",dataFromserver);
        }
    }
    render() {
        return(
            <div>
              {/* <button onClick={() => this.onButtonClicked('Hello!')}>Send Inputs</button>   */}
              <div>
                <h1>Calorie Track Home</h1>
              </div>
            </div>
            
        )
    }
}