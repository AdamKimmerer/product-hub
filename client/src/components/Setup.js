import React from 'react';

export default class Setup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			current: 0,
			totalSteps: 2,
			nameVal: '',
			titleVal: '',
			departVal: '',
			profilePhotoSet: false
		}
	}

	handleNext = (e) => {
		e.preventDefault();
		if (this.state.current < this.state.totalSteps) {
			this.setState({
				current: this.state.current + 1
			})
		}
	}

	handleBack = () => {
		if (this.state.current > 0) {
			this.setState({
				current: this.state.current - 1
			})
		}
	}

	handleName = (e) => {
		this.setState({
			nameVal: e.target.val
		})
	}

	handleDepart = (e) => {
		this.setState({
			departVal: e.target.val
		})
	}

	handleTitle = (e) => {
		this.setState({
			titleVal: e.target.val
		})
	}

	handleProfile = () => {
		this.setState({
			profilePhotoSet: true
		})
	}

	handleSetupFinish() {
		setTimeout(() => {
			this.props.toggleSetup();
		}, 3000)
	}

	renderStage = () => {
		switch(this.state.current) {
			case 0: 
				return (
					<div className="setup-cont">
					  <div className="setup-left">
			            <div className="login-title">
			              <div className="login-title-main">
			                Tell us about yourself.
			              </div>
			            </div>
			            <form className="login-inputs" onSubmit={this.handleNext}>
			              <div className="login-input">
			                <label>
			                  <span>Name</span>
			                  <br/>
			                  <input type="text" placeholder="Name" value={this.state.nameVal} onChange={this.handleName}/>
			                </label>
			              </div>
			              <div className="login-input">
			                <label>
			                  <span>Department</span>
			                  <br/>
			                  <input type="text" placeholder="Department"  value={this.state.departVal} onChange={this.handleDepart}/>
			                </label>
			              </div>
			              <div className="login-input">
			                <label>
			                  <span>Job Title</span>
			                  <br/>
			                  <input type="text" placeholder="Job Title"  value={this.state.titleVal} onChange={this.handleTitle}/>
			                </label>
			              </div>
			              {this.renderButtons()}
			            </form>
			          </div>
			          <div className="setup-right"></div>
			        </div>
				)
				break;
			case 1: 
				return (
					<div className="setup-cont">
					  <div className="setup-left">
			            <div className="login-title">
			              <div className="login-title-main">
			                Profile Photo
			              </div>
			            </div>
			            <div className="profile-photo-cont">
				            <div className={this.state.profilePhotoSet === false ? "profile-photo" : "profile-photo set"} onClick={this.handleProfile}>
				            	<i className="far fa-user-circle"></i>
				            </div>
				            <div className="profile-photo-skip">
				            	Skip for now
				            </div>
			            </div>
			            {this.renderButtons()}
			          </div>
			          <div className="setup-right"></div>
			        </div>
				)
				break;
			case 2: 
				{this.handleSetupFinish()}

				return (
					<div className="setup-cont final">
			            <div className="login-title">
			              <div className="login-title-main">
			                Setting up your account.
			              </div>
			            </div>
			        </div>
				)
				break;
			default:
				break;
		}
	}

	renderButtons = () => {
		if (this.state.current === 0) {
			return (
				<div className="setup-buttons-cont">
					<div></div>
					<button type="submit">Next</button>
				</div>
			)
		} else if (this.state.current === this.state.totalSteps - 1) {
			return (
				<div className="setup-buttons-cont">
					<div onClick={this.handleBack}>Back</div>
					<div onClick={this.handleNext}>Done</div>
				</div>
			)
		} else {
			return (
				<div className="setup-buttons-cont">
					<div onClick={this.handleBack}>Back</div>
					<div onClick={this.handleNext}>Next</div>
				</div>
			)
		}
	}

	render() {
		return (
			<div>
			{this.renderStage()}
			</div>
		)
	}
}