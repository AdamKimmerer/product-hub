import React from 'react';
import {withRouter} from 'react-router-dom';

class Tester extends React.Component {
  constructor(props) {
    super(props)
    
     this.state = { 
      apiResponse: "",
    };
  }

  callAPI() {
    fetch("http://localhost:9000/qlik")
        // .then(res => res.text())
        // .then(res => this.setState({ apiResponse: res }))
        // .catch(function(err) {
        //   console.log('Fetch Error :-S', err);
        // });
  }

  componentWillMount() {
      this.callAPI();
  }

  render() {
    return (
      <div className="main content">
        <form onSubmit={this.getSignIn}>
          <button type='submit'>SUBMIT</button>
        </form>
        <p>{this.state.apiResponse}</p>
        <p>{this.state.ghibliResponse}</p>
      </div>
    )
  }
}

export default withRouter(Tester)