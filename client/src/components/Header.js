import React from 'react';

import { Link, withRouter } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  renderLoggedIn() {
    if (this.props.loggedIn) {
      return (
        <div>
          
          <Link to="/library">
            <div className={this.props.location.pathname === "/library" ? "text-link active" : "text-link"}>My Library</div>
          </Link>
          <div className="profile-img">
            <img src="" />
          </div>
        </div>
      )
    } else {
      return (
        <div className="text-link" onClick={this.props.toggleLogin}>Log In</div>
      )
    }
  }

  render() {
    return (
      <div className="header">
        <div className="left">
         <Link to="/">
            <div className="logo" onClick={this.props.handler}>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/275157/bdbd1m17_400x400.jpg"
                alt="CIHI"
              />
            </div>
          </Link>
          <div className="search">
            <input placeholder="Search CIHI" type="text" />
            <button>Search</button>
          </div>
        </div>
        <div className="right">
          <Link to="/tester">
            <i style={{color: "#ccc", verticalAlign: "bottom", fontSize: "20px"}} className="fas fa-pizza-slice"></i>
          </Link>
          <Link to="/list">
            <div className={this.props.location.pathname === "/list" ? "text-link active" : "text-link"}>Indicator List</div>
          </Link>
          {this.renderLoggedIn()}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)