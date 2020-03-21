"use strict"

const React = require('react')
const journalService = require('../../services/journal.events.service')
const appointmentEventsService = require('../../services/appointment.events.service')
const authenticationService = require('../../services/authentication.service')
const JournalCalendar = require('../shared/JournalCalendar')

class Journal extends React.PureComponent {
    constructor(props, context) {
        super(props, context)
        
        this.updateEvents = this.updateEvents.bind(this)

        this.state = {
            events: [],
            appointments: [],
        }
    }

    componentDidMount() {
        journalService.readMyJournal()
            .then(response => {
                this.setState({
                    events: response.item
                })
            })
            .catch(err => console.warn(err))

        appointmentEventsService.readByUserId(authenticationService.getCurrentUser().userId)
            .then(data => {
                this.setState({
                    appointments: data.items
                })
            })
            .catch(err => console.warn(err))

    }

    updateEvents(dataFromChild){
        console.log(dataFromChild)
        let newEvent = this.state.events
        newEvent.push(dataFromChild)
        this.setState({events: newEvent.slice()})
    }

    render() {

        return (
            <div>
                <JournalCalendar angularUrl={this.props.angularUrl} userId={authenticationService.getCurrentUser().userId} events={this.state.events} onFormSubmit={this.updateEvents} appointments={this.state.appointments}></JournalCalendar>
            </div>
        )
    }
}

module.exports = Journal