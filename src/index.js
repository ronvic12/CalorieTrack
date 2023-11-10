import  ReactDOM  from "react-dom";
import React,{Component} from 'react';
import { w3cwebsocket as W3CWEBSOCKET}  from "websocket";

const client = new W3CWEBSOCKET('ws://localhost:4000');
export default class App extends Component {

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
              <button onClick={() => this.onButtonClicked('Hello!')}>Send Inputs</button>  
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));