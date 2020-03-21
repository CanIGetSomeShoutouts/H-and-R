const React = require('react')
const registrationService = require('../../services/users.service')

class RegistrationDetail extends React.PureComponent {
    constructor(props, context) {
        super(props, context)

        this.create = this.create.bind(this)
        this.handleFirstNameInputChange = this.handleFirstNameInputChange.bind(this)
        this.handleLastNameInputChange = this.handleLastNameInputChange.bind(this)
        this.handleUsernameInputChange = this.handleUsernameInputChange.bind(this)
        this.handleEmailInputChange = this.handleEmailInputChange.bind(this)
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this)
        this.handleConfirmPasswordInputChange = this.handleConfirmPasswordInputChange.bind(this)
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.handleAgreesToPrivacyStatementInputChange = this.handleAgreesToPrivacyStatementInputChange.bind(this)

        this.state = {
            registration: {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                userType: 'Client',
                agreesToPrivacyStatement: ''

            },
            submitted: false
        }
    }

    create() {

        this.setState({ submitted: true })

        if(!this.formElement.checkValidity() ){return} 
         else{ 
            registrationService.create(this.state.registration)
            .then(data => {
                this.setState({ potato: true })

            })
            .catch(err =>  {
                console.warn(err)
                alert("There was an error during the registration process, please check your information and try again.")
            })
            }
        
        }
      
   
    //create a function for each input  
    //computed property key syntax
    //function should update the state property that the input value is connected to 
    handleFirstNameInputChange(event) {
        const firstName = event.target.value
        this.setState((prevState, props) => {
            const newRegistration = { ...prevState.registration }
            newRegistration.firstName = firstName
            return {
                registration: newRegistration
            }
        })
    }

    handleLastNameInputChange(event) {
        const lastName = event.target.value
        this.setState((prevState, props) => {
            const newRegistration = { ...prevState.registration }
            newRegistration.lastName = lastName
            return {
                registration: newRegistration
            }
        })
    }

    handleUsernameInputChange(event) {
        const username = event.target.value
        this.setState((prevState, props) => {
            const newRegistration = { ...prevState.registration }
            newRegistration.username = username
            return {
                registration: newRegistration
            }
        })
    }

    handleEmailInputChange(event) {
        const email = event.target.value
        this.setState((prevState, props) => {
            const newRegistration = { ...prevState.registration }
            newRegistration.email = email
            return {
                registration: newRegistration
            }
        })
    }

    handlePasswordInputChange(event) {
        const password = event.target.value
        this.setState((prevState, props) => {
            const newRegistration = { ...prevState.registration }
            newRegistration.password = password
            return {
                registration: newRegistration
            }
        })
    }

    handleConfirmPasswordInputChange(event) {
        const confirmPassword = event.target.value
        this.setState((prevState, props) => {
            const newRegistration = { ...prevState.registration }
            newRegistration.confirmPassword = confirmPassword
            return {
                registration: newRegistration
            }
        })
    }

    handleOptionChange(event) {

        const selectedOption = event.target.value
        this.setState((prevState, props) => {
            const newRegistration = { ...prevState.registration }
            newRegistration.userType = selectedOption
            return {
                registration: newRegistration
            }
        })
    }

    handleAgreesToPrivacyStatementInputChange(event) {

        const agree = event.target.checked
        this.setState((prevState, props) => {
            const newRegistration = { ...prevState.registration }
            newRegistration.agreesToPrivacyStatement = agree
            return {
                registration: newRegistration
            }
        })
    }

    render() {

        if (this.state.potato === true) {
            return (
                <div>
            <div className="dzsparallaxer auto-init height-is-based-on-content mode-scroll dzsprx-readyall" data-options="{direction: &quot;reverse&quot;}">
                <div className="divimage dzsparallaxer--target " style={{ width: '101%', height: '130%', backgroundImage: "url('/theme-versa/images/bg-6.jpg')", transform: 'translate3d(0px, -2.69882px, 0px)' }}>
                </div>
                <div className="container pt100">
                    <div className="row">
                        <div className="col-md-8 ml-auto mr-auto wow bounceIn" data-wow-delay=".2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'bounceIn' }}>
                            <h3 className="h3 mb30 text-center pt100 pb100 font300 text-white">Create Your Account</h3>
                        </div>
                    </div>
                </div>
            </div>
                <div className='container pb50 pt50-md' >
                    <div className='row'>
                        <div className='col-md-6 col-lg-5 mr-auto ml-auto'>
                            <div className='card card-account'>
                                <div className='card-body'>

                                    <h1>Your account has been created!</h1>
                                    <p>Please click the link in your email to confirm your account and log in</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            )

        } else {

            return (
                <div>
                    <div className="dzsparallaxer auto-init height-is-based-on-content mode-scroll dzsprx-readyall" data-options="{direction: &quot;reverse&quot;}">
                        <div className="divimage dzsparallaxer--target " style={{ width: '101%', height: '130%', backgroundImage: "url('/theme-versa/images/')", transform: 'translate3d(0px, -2.69882px, 0px)' }}>
                        </div>
                        <div className="container pt100">
                            <div className="row">
                                <div className="col-md-8 ml-auto mr-auto wow bounceIn" data-wow-delay=".2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'bounceIn' }}>
                                    <h3 className="h3 mb30 text-center pt100 pb100 font300 text-white">Create Your Account</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='container pb50 pt50-md'>
                        <div className='row'>
                            <div className='col-md-6 col-lg-5 mr-auto ml-auto'>
                                <div className='card card-account'>
                                    <div className='card-body'>

                                        <form className={"needs-validation " + (this.state.submitted ? "was-validated" : " ")}
                                            ref={ref => this.formElement = ref} noValidate>

                                            <div className='form-group'>
                                                <label htmlFor='firstName' className="control-label"> First Name</label>
                                                <input
                                                    value={this.state.registration.firstName}
                                                    ref={ref => this.firstNameElement = ref}
                                                    id='firstName'
                                                    name='firstName'
                                                    maxLength='16'
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='Please enter your first name'
                                                    onChange={this.handleFirstNameInputChange} required />

                                                {this.state.submitted && this.firstNameElement && this.firstNameElement.validity.valueMissing &&
                                                    <div className="invalid-feedback"> First name is required</div>}

                                                {this.state.submitted && this.firstNameElement && this.firstNameElement.validity.tooLong &&
                                                    <div className="invalid-feedback"> First name must not exceed 16 characters</div>}

                                            </div>

                                            <div className='form-group'>
                                                <label htmlFor='lastname'>Last Name</label>
                                                <input
                                                    value={this.state.registration.lastName}
                                                    ref={ref => this.lastNameElement = ref}
                                                    id='lastname'
                                                    maxLength='20'
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='Please enter your last name'
                                                    onChange={this.handleLastNameInputChange} required />

                                                {this.state.submitted && this.lastNameElement && this.lastNameElement.validity.valueMissing &&
                                                    <div className="invalid-feedback"> Last name is required</div>}

                                                {this.state.submitted && this.lastNameElement && this.lastNameElement.validity.tooLong &&
                                                    <div className="invalid-feedback"> Last name must not exceed 20 characters </div>}
                                            </div>

                                            <div className='form-group'>
                                                <label htmlFor='username'>Username</label>
                                                <input
                                                    value={this.state.registration.username}
                                                    ref={ref => this.userNameElement = ref}
                                                    id='username'
                                                    maxLength='18'
                                                    minLength='5'
                                                    pattern='^[a-zA-Z0-9-_]{5,18}$'
                                                    type='text'
                                                    className='form-control'
                                                    placeholder='Please provide a username'
                                                    onChange={this.handleUsernameInputChange} required />

                                                {this.state.submitted && this.userNameElement && this.userNameElement.validity.valueMissing &&
                                                    <div className="invalid-feedback"> Username is required</div>}

                                                {this.state.submitted && this.userNameElement && this.userNameElement.validity.tooLong &&
                                                    <div className="invalid-feedback"> Username must not exceed 18 characters</div>}

                                                {this.state.submitted && this.userNameElement && this.userNameElement.validity.patternMismatch &&
                                                    <div className="invalid-feedback"> This field must contain letters, dashes or underscores.</div>}
                                            </div>

                                            <div className='form-group'>
                                                <label htmlFor='email'>Email</label>
                                                <input
                                                    value={this.state.registration.email}
                                                    ref={ref => this.emailElement = ref}
                                                    id='email'
                                                    type='email'
                                                    className='form-control'
                                                    placeholder='Please provide an email'
                                                    onChange={this.handleEmailInputChange} required />

                                                {this.state.submitted && this.emailElement && this.emailElement.validity.valueMissing &&
                                                    <div className="invalid-feedback"> Email is required</div>}
                                            </div>

                                            <div className='form-group'>
                                                <label htmlFor='password'>Password</label>
                                                <input
                                                    value={this.state.registration.password}
                                                    ref={ref => this.passwordElement = ref}
                                                    id='password'
                                                    maxLength='24'
                                                    minLength='6'
                                                    type='password'
                                                    className='form-control'
                                                    placeholder='Please provide a password'
                                                    onChange={this.handlePasswordInputChange} required />

                                                {this.state.submitted && this.passwordElement && this.passwordElement.validity.valueMissing &&
                                                    <div className="invalid-feedback"> Password is required</div>}

                                                {this.state.submitted && this.passwordElement && this.passwordElement.validity.tooLong &&
                                                    <div className="invalid-feedback"> Password must not exceed 24 characters</div>}

                                                {this.state.submitted && this.passwordElement && this.passwordElement.validity.tooShort &&
                                                    <div className="invalid-feedback"> Password must be at least 6 characters</div>}
                                            </div>

                                            <div className='form-group'>
                                                <label htmlFor='confirmPassword'>Confirm Password</label>
                                                <input
                                                    value={this.state.registration.confirmPassword}
                                                    ref={ref => this.confirmPasswordElement = ref}
                                                    id='confirmPassword'
                                                    type='password' className='form-control'
                                                    placeholder='Please provide a matching password'
                                                    onChange={this.handleConfirmPasswordInputChange} required />
                                            </div>

                                            <div className='form-group'>
                                                <hr />
                                                <label htmlFor='userType' className='control-label'>User Type</label>

                                                <div>
                                                    <label htmlFor="userType1" className="form-check-label p-t-5">
                                                        <input
                                                            type="radio"
                                                            value='Client'
                                                          
                                                            checked={this.state.registration.userType === 'Client'}
                                                            id='userType1'
                                                            className="form-check-input"
                                                            onChange={this.handleOptionChange} /> Client</label>
                                                </div>

                                                <div>
                                                    <label htmlFor="userType2" className="form-check-label p-t-5">
                                                        <input
                                                            type="radio"
                                                            value='Therapist'
                                                            
                                                            checked={this.state.registration.userType === ''}
                                                            id="userType2"
                                                            className="form-check-input"
                                                            onChange={this.handleOptionChange} /> Therapist </label>
                                                </div>

                                                <hr />
                                                <div>
                                                    <label htmlFor="privacyStatement" className="form-check-label p-t-5">
                                                        <input
                                                            type='checkbox'
                                                            value="privacyStatement"
                                                            ref={ref => this.agreeElement = ref}
                                                            id='privacyStatement'
                                                            checked={this.state.registration.agreesToPrivacyStatement}
                                                            className='form-check-input'
                                                            onChange={this.handleAgreesToPrivacyStatementInputChange} required /> Agree To Privacy Statement
                                                             
                                                             {this.state.submitted && this.agreeElement && this.agreeElement.validity.valueMissing &&
                                                            <div className="invalid-feedback" style={{display:"block"}}> Must agree to privacy statement</div>}
                                                    </label>


                                                </div>

                                                <button type='button' onClick={this.create} className='btn btn-block btn-secondary btn-rounded btn-xl'>Register</button>

                                            </div>
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
}


module.exports = RegistrationDetail