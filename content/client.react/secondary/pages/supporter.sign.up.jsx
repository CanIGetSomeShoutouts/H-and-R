"use strict"

const React = require('react')
const supportInvitationsService = require('../../services/support.invitations.service')
const usersService = require('../../services/users.service')

class SupporterSignup extends React.PureComponent {
    constructor(props, context) {
        super(props, context)

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputCheckboxChange = this.handleInputCheckboxChange.bind(this)
        this.submitSupporter = this.submitSupporter.bind(this)
        this.login = this.login.bind(this)

        this.state = {
            formData: {
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                userType: "Supporter",
                agreesToPrivacyStatement: false
            },
            submitted: false,
            signup: false
        }
    }

    handleInputChange(event) {
        let target = event.target
        let name = target.name
        let value = target.value

        this.setState(prevState => {
            const nextState = Object.assign({}, prevState.formData)
            nextState[name] = value
            return {
                formData: nextState
            }
        })
    }

    handleInputCheckboxChange(event) {
        let target = event.target
        let isChecked = target.checked

        this.setState(prevState => {
            const checkState = Object.assign({}, prevState.formData)
            checkState.agreesToPrivacyStatement = isChecked

            return {
                formData: checkState
            }
        })
    }

    submitSupporter() {
        this.setState({
            submitted: true
        })
        if (!this.formElement.checkValidity()) { return }
        else if (this.state.formData.confirmPassword != this.state.formData.password) { return }
        return usersService.create(this.state.formData)
            .then(data => {
                let supportId = { supportId: data.item }
                return supportInvitationsService.confirm(this.props.getUrlParams.invitationId, supportId)
            })
            .then(data => {
                this.setState({
                    signup: true
                })
                document.body.scrollTop = document.documentElement.scrollTop = 0
            })
            .catch(error => console.warn(error))
    }

    login() {
        this.props.angularUrl('anon/login')
    }

    render() {

        if (this.state.signup == true) {
            return (
                <div>
                    <div className="dzsparallaxer auto-init height-is-based-on-content mode-scroll dzsprx-readyall">
                        <div className="divimage dzsparallaxer--target " style={{ width: '101%', height: '130%', backgroundImage: "url('/theme-versa/images/')", transform: 'translate3d(0px, -2.69882px, 0px)' }}>
                        </div>
                        <div className="container pt100">
                            <div className="row">
                                <div className="col-md-8 ml-auto mr-auto wow bounceIn" data-wow-delay=".2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'bounceIn' }}>
                                    <h3 className="text-center text-white pt100 pb100 font300 mb30 h3">Supporter Sign-up</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container pb50 pt50-md">
                        <div className="row">
                            <div className="col-md-6 col-lg-5 mr-auto ml-auto">
                                <div className="card card-account">
                                    <div className="card-body">
                                        <div>
                                            <p>Account successfully created. You may now
                                                <a href="javascript:void(0)" onClick={this.login}> login</a>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="dzsparallaxer auto-init height-is-based-on-content mode-scroll dzsprx-readyall">
                    <div className="divimage dzsparallaxer--target " style={{ width: '101%', height: '130%', backgroundImage: "url('/theme-versa/images/')", transform: 'translate3d(0px, -2.69882px, 0px)' }}>
                    </div>
                    <div className="container pt100">
                        <div className="row">
                            <div className="col-md-8 ml-auto mr-auto wow bounceIn" data-wow-delay=".2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'bounceIn' }}>
                                <h3 className="text-center text-white pt100 pb100 font300 mb30 h3">Supporter Sign-up</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container pb50 pt50-md">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 mr-auto ml-auto">
                            <div className="card card-account">
                                <div className="card-body">
                                    <form className={"needs-validation " + (this.state.submitted ? "was-validated" : " ")} ref={ref => this.formElement = ref} id="formElement" noValidate>
                                        <div className="form-group" >
                                            <label className="control-label">First Name</label>
                                            <input className="form-control" required
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                onChange={this.handleInputChange}
                                                value={this.state.formData.firstName}
                                                placeholder="Please enter your first name"
                                                ref={ref => this.firstNameElement = ref}
                                                pattern='^[a-zA-Z]{1,16}$' />
                                            {this.state.submitted && this.firstNameElement && this.firstNameElement.validity.valueMissing &&
                                                (<span className='invalid-feedback'>This field is required.</span>)}
                                            {this.state.submitted && this.firstNameElement && this.firstNameElement.validity.patternMismatch &&
                                                (<span className='invalid-feedback'>Must include only letters and contain no more than 16 characters.</span>)}
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Last Name</label>
                                            <input className="form-control" required
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                onChange={this.handleInputChange}
                                                value={this.state.formData.lastName}
                                                placeholder="Please enter your last name"
                                                ref={ref => this.lastNameElement = ref}
                                                pattern='^[a-zA-Z]{1,20}$' />
                                            {this.state.submitted && this.lastNameElement && this.lastNameElement.validity.valueMissing
                                                && (<span className='invalid-feedback'>This field is required.</span>)}
                                            {this.state.submitted && this.lastNameElement && this.lastNameElement.validity.patternMismatch &&
                                                (<span className='invalid-feedback'>Must include only letters and contain no more than 20 characters.</span>)}
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Username</label>
                                            <input className="form-control" required
                                                type="text"
                                                name="username"
                                                id="username"
                                                onChange={this.handleInputChange}
                                                value={this.state.formData.username}
                                                placeholder="Please provide a unique username"
                                                ref={ref => this.usernameElement = ref}
                                                pattern='^[a-zA-Z0-9-_]{5,18}$' />
                                            {this.state.submitted && this.usernameElement && this.usernameElement.validity.valueMissing
                                                && (<span className='invalid-feedback'>This field is required.</span>)}
                                            {this.state.submitted && this.usernameElement && this.usernameElement.validity.patternMismatch &&
                                                (<span className='invalid-feedback'>Must include only letters, numbers, dashes, and underscores.  Must be between 5 and 18 characters.</span>)}
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Email</label>
                                            <input className="form-control" required
                                                type="email"
                                                name="email"
                                                id="email"
                                                onChange={this.handleInputChange}
                                                value={this.state.formData.email}
                                                placeholder="Please provide a valid email"
                                                ref={ref => this.emailElement = ref} />
                                            {this.state.submitted && this.emailElement && this.emailElement.validity.valueMissing
                                                && (<span className='invalid-feedback'>This field is required.</span>)}
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Password</label>
                                            <input className="form-control" required
                                                type="password"
                                                name="password"
                                                id="password"
                                                onChange={this.handleInputChange}
                                                value={this.state.formData.password}
                                                placeholder="Please enter a password"
                                                ref={ref => this.passwordElement = ref}
                                                pattern='^(?=.*\d)(?=.*[A-Z])[a-zA-Z\d]{6,24}$' />
                                            {this.state.submitted && this.passwordElement && this.passwordElement.validity.valueMissing
                                                && (<span className='invalid-feedback'>This field is required.</span>)}
                                            {this.state.submitted && this.passwordElement && this.passwordElement.validity.patternMismatch &&
                                                (<span className='invalid-feedback'>Must include at least one uppercase letter and one number.  Must be between 6 and 24 characters.</span>)}
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Confirm Password</label>
                                            <input className="form-control" required
                                                type="password"
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                onChange={this.handleInputChange}
                                                value={this.state.formData.confirmPassword}
                                                placeholder="Confirm password"
                                                ref={ref => this.confirmPasswordElement = ref} />
                                            {this.state.submitted && this.confirmPasswordElement && this.confirmPasswordElement.validity.valueMissing
                                                && (<span className='invalid-feedback'>This field is required.</span>)}
                                            {this.state.submitted && this.confirmPasswordElement && this.state.formData.confirmPassword != this.state.formData.password &&
                                                (<span className='invalid-feedback'>Must match your password.</span>)}
                                        </div>
                                        <div className="form-group">
                                            <input required
                                                type="checkbox"
                                                onChange={this.handleInputCheckboxChange}
                                                name="agreesToPrivacyStatement"
                                                id="agreesToPrivacyStatement"
                                                checked={this.state.formData.agreesToPrivacyStatement}
                                                ref={ref => this.agreesToPrivacyStatementElement = ref} />
                                            <label className="control-label">Agree To Privacy Statement</label>
                                            {this.state.submitted && this.agreesToPrivacyStatementElement && this.agreesToPrivacyStatementElement.validity.valueMissing
                                                && (<span className='invalid-feedback' style={{ display: 'block' }}>This field is required.</span>)}
                                        </div>
                                        <hr />
                                        <button type="button" onClick={this.submitSupporter} className="btn btn-block btn-secondary btn-rounded btn-xl"> Sign Up </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = SupporterSignup