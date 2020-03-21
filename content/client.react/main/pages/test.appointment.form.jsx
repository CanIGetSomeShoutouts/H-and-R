"use strict"

const React = require('react')
const AppointmentForm = require('../shared/appointment.form')

class TestAppointmentForm extends React.PureComponent {
    constructor(props, context) {
        super(props, context)

        this.state = {

        }

        this.onAdd = this.onAdd.bind(this)

    }

    componentDidMount() {

    }
    
    onAdd(formData) {
        console.log(formData)
    }
    
    render() {
        return (
            <AppointmentForm date={new Date("2018-03-05T18:36:45.186Z")} userId="5a98c283fffef22d88b8f7c7" onAdd={this.onAdd}></AppointmentForm>
        )
    }
}

module.exports = TestAppointmentForm