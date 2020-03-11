import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        signup: false,
        emailVal: "",
        passwordVal: "",
        apiResponse: {},
        error: false
      }
    }

    toggleForm = () => {
      this.setState({
        signup: !this.state.signup,
      })
    }

    handleSignup = (e) => {
      e.preventDefault();
      this.handleLogin(e);
      this.props.toggleSetup();
    }
    
    toggleModal = () => {
      this.props.toggleLogin();
    }
    
    handleLogin = (e) => {
      e.preventDefault();

      this.setState({
        error: false
      })

      var password = this.state.passwordVal;
      var email = this.state.emailVal;

      var url = new URL(`http://localhost:9000/tableau?email=${email}&password=${password}`)

      fetch(url)
        .then(res => res.json())
        .then((res) => {
          if (Object.entries(res).length > 0 && res.constructor === Object) {
            this.setState({ apiResponse: res },
              function() {
                this.props.toggleLogin();
                this.props.setLogin(this.state.apiResponse);
            })
          } else {
            this.toggleError();
          }
          
        })
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
          this.toggleError();
        }); 
    }

    toggleError = () => {
      this.setState({
        error: !this.state.error
      })
    }

    renderError = () => {
      if (this.state.error === true) {
        return (
          <div className={"login-error"}>Looks like you entered the wrong email or password.</div>
        )
      } else {
        return ""
      }
    }

    updateEmail = (e) => {
      var val = e.currentTarget.value;

      this.setState({
        emailVal: val
      })
    }

    updatePassword = (e) => {
      var val = e.currentTarget.value;

      this.setState({
        passwordVal: val
      })
    }

    renderForm() {

       

      if (this.state.signup !== true) {
        return (
          <div>
            <div className="login-title">
              <div className="login-title-main">
                Welcome Back!
              </div>
              <div className="login-title-secondary">
                Sign in to access your personalized homepage, follow your team, and make the most out of your data.
              </div>
            </div>
            <form className="login-inputs" onSubmit={this.handleLogin}>
              <div className="login-input">
                <label>
                  <span>Email Address</span>
                  <br/>
                  <input type="email" placeholder="Email Address" value={this.state.emailVal} onChange={this.updateEmail}/>
                </label>
              </div>
              <div className="login-input">
                <label>
                  <span>Password</span>
                  <br/>
                  <input type="password" placeholder="Password" value={this.state.passwordVal}  onChange={this.updatePassword}/>
                </label>
              </div>
              <div className={this.state.error ? "login-error show" : "login-error"}>Looks like you entered the wrong email or password.</div>
              <button type="submit" className="login-submit">
                Log In
              </button>
            </form>
            <div className="login-signup">
              Don't have an account? <span onClick={this.toggleForm}>Sign Up</span>
            </div>
          </div>
        )
      } else {
        return (
          <div>
          <div className="login-title">
            <div className="login-title-main">
              Join CIHI!
            </div>
            <div className="login-title-secondary">
              Create an account access your personalized homepage, follow your team, and make the most out of your data.
            </div>
          </div>
          <form className="login-inputs" onSubmit={this.handleSignup}>
            <div className="login-input">
              <label>
                <span>Email Address</span>
                <br/>
                <input type="text" placeholder="Email Address" />
              </label>
            </div>
            <div className="login-input">
              <label>
                <span>Organization (optional)</span>
                <br/>
                <input type="text" placeholder="Password" />
              </label>
            </div>
            <div className="login-input">
              <label>
                <span>Password</span>
                <br/>
                <input type="password" placeholder="Password" />
              </label>
            </div>
            <div className="login-input">
              <label>
                <span>Confirm Password</span>
                <br/>
                <input type="password" placeholder="Password" />
              </label>
            </div>
            <button type="submit" className="login-submit">
              Sign Up
            </button>
          </form>
          <div className="login-signup">
            Already have an account? <span onClick={this.toggleForm}>Log In</span>
          </div>
        </div>
        )
      }
    }

    render() {
      return (
        <div className="login-cont">
          <div className="login-modal">
            <div className='login-close' onClick={this.toggleModal}>
              <i className="fas fa-times"></i>
            </div>
            {this.renderForm()}
          </div>
        </div>
      )
    }
  }