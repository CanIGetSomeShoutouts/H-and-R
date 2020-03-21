"use strict"

const React = require('react')
const ChangeEmailForm = require("../pages/change.email.form");
const ChangePassword = require('../shared/password.form')

class SettingsDetail extends React.PureComponent {
    constructor(props, context) {
        super(props, context)

        this.state = {
            header: {
                title: 'Settings'
            }
        }
    }

    render() {
        return (

            <div>
                <h1>Settings</h1>
                <ChangeEmailForm />
                <ChangePassword />
            </div>


        )
    }
}

module.exports = SettingsDetail