'use strict'

const React = require('react')
const passwordService = require('../../services/users.service')


class ChangePassword extends React.PureComponent {
    constructor(props, context) {
        super(props, context)

        this.create = this.create.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.passwordsMatch = this.passwordsMatch.bind(this)

        this.state = {
            passwords: {
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            submitted: false
        }
    }

    passwordsMatch() {
        return this.state.passwords.newPassword == this.state.passwords.confirmPassword
    }

    create() {
        this.setState({ submitted: true })
        if (this.passwordsMatch()) {
            console.log(this.passwordsMatch())
            console.log(this.state)
            passwordService.changePassword(this.state.passwords)
                .then(data => {
                    this.setState({ valid: true })
                    alert("Password Change Successful")
                })
                .catch(err => {
                    console.warn(err)
                    alert('Failed Password Change')
                })
        }
    }

    handleChange(event) {
        let passwords = this.state.passwords
        let name = event.target.name
        let value = event.target.value

        passwords[name] = value
        this.setState({ passwords })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(this.state.passwords)
        this.setState({ submitted: true })
    }

    render() {
        return (
            <div>
                <div className="panel panel-inverse">
                    <div className="panel-heading">
                        <h4 className="panel-title">Change Password</h4>
                    </div>

                    <div className="panel-body">
                        <form ref={ref => this.passwordForm = ref} id="password-form" className={"needs-validation" + (this.state.submitted ? "was-validated" : " ")} noValidate autoComplete="off">

                            <div className={"form-group" + (this.state.submitted && this.currentPassword && !this.currentPassword.validity.valid ? ' has-error has-feedback' : '')}>

                                <label className="control-label" htmlFor="currentPassword">Current Password</label>
                                <input type="password" className="form-control" name="currentPassword" placeholder="Current Password" maxLength='18' minLength='5' pattern='^[a-zA-Z0-9-_]{5,18}$' ref={ref => this.currentPassword = ref} onChange={this.handleChange} required />
                                {this.state.submitted && this.currentPassword && this.currentPassword.validity.valueMissing && <div className="invalid-feedback">Current password is required</div>}
                                {this.state.submitted && this.currentPassword && this.currentPassword.validity.patternMismatch && <div className="invalid-feedback">Current password must have numerical characters "0-9"</div>}
                                {this.state.submitted && this.currentPassword && this.currentPassword.validity.patternMismatch && <div className="invalid-feedback">Current password must have lowercase characters "a-z"</div>}
                                {this.state.submitted && this.currentPassword && this.currentPassword.validity.patternMismatch && <div className="invalid-feedback">Current password must have lowercase characters "A-Z"</div>}
                                {this.state.submitted && this.currentPassword && this.currentPassword.validity.tooShort && <div className="invalid-feedback">Password Too short</div>}

                            </div>


                            <div className={"form-group" + (this.state.submitted && this.newPassword && !this.newPassword.validity.valid ? ' has-error has-feedback' : '')}>

                                <label className="control-label" htmlFor="newPassword">New Password</label>
                                <input type="password" className="form-control" name="newPassword" placeholder="New Password" maxLength='18' minLength='5' pattern='^[a-zA-Z0-9-_]{5,18}$' ref={ref => this.newPassword = ref} onChange={this.handleChange} required />
                                {this.state.submitted && this.newPassword && this.newPassword.validity.valueMissing && <div className="invalid-feedback">New password is required</div>}
                                {this.state.submitted && this.newPassword && this.newPassword.validity.patternMismatch && <div className="invalid-feedback">New password must have lowercase characters "a-z"</div>}
                                {this.state.submitted && this.newPassword && this.newPassword.validity.patternMismatch && <div className="invalid-feedback">New password must have lowercase characters "A-Z"</div>}
                                {this.state.submitted && this.newPassword && this.newPassword.validity.patternMismatch && <div className="invalid-feedback">New password must have numerical characters "0-9"</div>}
                                {this.state.submitted && this.newPassword && this.newPassword.validity.tooShort && <div className="invalid-feedback">Password Too Short</div>}

                            </div>

                            <div className={"form-group" + (this.state.submitted && this.confirmPassword && !this.confirmPassword.validity.valid ? ' has-error has-feedback' : '')}>

                                <label className="control-label" htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" maxLength='18' minLength='5' pattern='^[a-zA-Z0-9-_]{5,18}$' ref={ref => this.confirmPassword = ref} onChange={this.handleChange} required />
                                {this.state.submitted && this.confirmPassword && this.confirmPassword.validity.valueMissing && <div className="invalid-feedback">Confirmed password is required</div>}
                                {this.state.submitted && this.confirmPassword && this.confirmPassword.validity.patternMismatch && <div className="invalid-feedback">Confirmed password must have lowercase characters "a-z"</div>}
                                {this.state.submitted && this.confirmPassword && this.confirmPassword.validity.patternMismatch && <div className="invalid-feedback">Confirmed password must have lowercase characters "A-Z"</div>}
                                {this.state.submitted && this.confirmPassword && this.confirmPassword.validity.patternMismatch && <div className="invalid-feedback">Confirmed password must have numerical characters "0-9"</div>}
                                {this.state.submitted && this.confirmPassword && this.confirmPassword.validity.tooShort && <div className="invalid-feedback">Password Too short</div>}
                                {this.state.submitted && this.passwordsMatch() == !true && <div className="invalid-feedback">Password must match new password</div>}

                            </div>

                            <div className="form-group pull-right">
                                <button className="btn btn-success btn" type="button" onClick={this.create}>Submit</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div >
        )
    }

}

module.exports = ChangePassword