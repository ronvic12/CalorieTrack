import React from "react";

class WeightForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
      this.setState({value: event.target.value});
    }
    handleSubmit(event) {
    console.log(this.state.value)
      event.preventDefault();
      fetch('http://localhost:4000/api/users/usersAuth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // Add any other headers as needed
            },
            body: JSON.stringify({weight:this.state.value})
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Fetch error:', error));
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Weight:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
export default WeightForm;