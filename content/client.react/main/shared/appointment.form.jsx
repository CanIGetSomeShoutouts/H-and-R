"use strict"

const React = require('react')
const DateTime = require('react-datetime')
const appointmentService = require('../../services/appointment.events.service')
const getCookie = require('../../services/authentication.service.js').getCurrentUser

class AppointmentForm extends React.PureComponent {
    constructor(props, context) {
        super(props, context)

        this.state = {
            formData: {
                addressId: '',
                title: '',
                description: '',
                participantIds: [],
                date: '',
                teleconferenceInfo: '',
            },
            addressList: [],
            submitted: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)

    }

    componentDidMount() {
        if (this.props.date) {
            this.setState(prevState => {
                const newFormData = { ...prevState.formData }
                newFormData.date = this.props.date
                return {
                    formData: newFormData
                }
            })
        }

        appointmentService.readMine()
            .then(data => {
                if (data.items) {
                    for (let i = 0; i < data.items.length; i++) {
                        let address = data.items[i]
                        address.fullAddress = `${address.lineOne} ${address.lineTwo}, ${address.city}, ${address.stateCode} ${address.postalCode}`
                    }
                    this.setState({ addressList: data.items })
                }
            })
            .catch(data => {
                console.log(data)
            })

    }

    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name
        const newFormData = Object.assign({}, this.state.formData)
        newFormData[name] = value

        this.setState({ formData: newFormData })
    }

    handleDateChange(moment) {
        if (typeof moment == "string") { return }
        const target = moment.toDate()
        this.setState((prevState) => {
            const newFormData = Object.assign({}, prevState.formData)
            newFormData.date = target
            return {
                formData: newFormData
            }
        })
    }

    onFormSubmit(event) {
        event.preventDefault()
        this.setState({ submitted: true })
        if (this.appointmentFormElement.checkValidity() === false) { return }
        let currentUser = getCookie()
        this.state.formData.participantIds.push(this.props.userId, currentUser.userId)
        appointmentService.create(this.state.formData)
            .then(data => {
                console.log(data)
                this.props.onAdd(this.state.formData)
            })
            .catch(data => {
                console.log(data)
            })
    }

    render() {
        return (
            <div className="panel panel-inverse">
                <div className="panel-heading">
                    <h4 className="panel-title">Journal Appointment</h4>
                </div>
                <div className="panel-body">
                    <form ref={ref => this.appointmentFormElement = ref} name="appointmentForm" onSubmit={this.onFormSubmit} noValidate>
                        <div className={"form-group " + (this.state.submitted && this.titleElement && !this.titleElement.validity.valid ? 'has-error has-feedback' : '')}>
                            <label className="control-label" htmlFor="title">Event Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="form-control"
                                value={this.state.formData.title}
                                onChange={this.handleChange}
                                ref={ref => this.titleElement = ref}
                                maxLength="50"
                                required
                            />
                            <span className="fa fa-times form-control-feedback"></span>
                            {this.state.submitted && this.titleElement && this.titleElement.validity.valueMissing && <p className="help-block">A title is required.</p>}
                        </div>
                        <div className={"form-group " + (this.state.submitted && this.addressElement && !this.addressElement.validity.valid ? 'has-error has-feedback' : '')}>
                            <label className="control-label" htmlFor="addressId">Address</label>
                            <select
                                name="addressId"
                                id="addressId"
                                className="form-control"
                                value={this.state.formData.addressId}
                                onChange={this.handleChange}
                                ref={ref => this.addressElement = ref}
                                required
                            >
                                <option value="">-Please Select-</option>
                                {this.state.addressList.map(address => { return <option key={address._id} value={address._id}>{address.fullAddress}</option> })}
                            </select>
                            {this.state.submitted && this.addressElement && this.addressElement.validity.valueMissing && <p className="help-block">An address is required.</p>}
                        </div>
                        <div className="form-group">
                            <label className="control-label">Teleconference Info (Optional)</label>
                            <input className="form-control" name="teleconferenceInfo" value={this.state.formData.teleconferenceInfo} onChange={this.handleChange} maxLength="1000" />
                        </div>
                        <div className={"form-group " + (this.state.submitted && this.descriptionElement && !this.descriptionElement.validity.valid ? 'has-error has-feedback' : '')}>
                            <label className="control-label" htmlFor="description">Description</label>
                            <input
                                type="text"
                                name="description"
                                id="description"
                                className="form-control"
                                value={this.state.formData.description}
                                onChange={this.handleChange}
                                ref={ref => this.descriptionElement = ref}
                                maxLength="50"
                                required
                            />
                            <span className="fa fa-times form-control-feedback"></span>
                            {this.state.submitted && this.descriptionElement && this.descriptionElement.validity.valueMissing && <p className="help-block">A description is required.</p>}
                        </div>
                        <div className={"form-group " + (this.state.submitted && this.dateValidationElement && this.state.formData.date == "" ? 'has-error has-feedback' : '')}>
                            <label htmlFor="dateValidation" className="control-label">Date
                                <div className="date input-group">
                                    <DateTime
                                        name="date"
                                        id="date"
                                        mode="date"
                                        timeFormat={false}
                                        value={this.state.formData.date}
                                        onChange={this.handleDateChange}
                                        inputProps={{ ref: (input) => { this.input = input; }, readOnly: true, required: true }}
                                        closeOnSelect={true}
                                    />
                                    <span className="input-group-addon" onClick={() => { this.input.focus() }}>
                                        <i className="glyphicon glyphicon-calendar" />
                                    </span>
                                    <input className="form-control" style={{ display: "none" }} ref={ref => this.dateValidationElement = ref} value={this.state.formData.date} required />
                                </div>
                            </label>
                            {this.state.submitted && this.state.formData.date == "" && <p className="help-block">A date is required.</p>}
                        </div>
                        <div>
                            <button type="submit" className="btn btn-success pull-right">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

module.exports = AppointmentForm