"use strict"

const React = require('react')
const Modal = require('react-bootstrap').Modal
const supporterService = require('../../services/users.service')
const supportInvitationService = require('../../services/support.invitations.service')
const authenticationService = require('../../services/authentication.service')

class SupportManagement extends React.PureComponent {
    constructor(props, context) {
        super(props, context)

        this.handleDeleteClick = this.handleDeleteClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onInputChange = this.onInputChange.bind(this)


        this.state = {
            formData: {
                username: '',
                imageUrl: ''
            },
            data: {

            },
            userdata: '',
            submitted: false,
            supporters: null,
            user: null,

        }
    }

    handleClose() {
        this.setState({ show: false })
    }

    handleShow() {
        this.setState({ show: true })
    }

    componentDidMount() {
        supporterService.currentUser()
            .then(data => {
                this.setState({
                    user: data.item
                })
            })
        supporterService.readMySupporters()
            .then(response => {
                this.setState({
                    supporters: response.items
                })
            })
            .catch(err => console.warn(err))
    }


    onInputChange(event) {
        this.setState({ userdata: event.target.value })
    }

    onFormSubmit(event) {
        let regex = /\S+@\S+\.\S+/
        event.preventDefault()
        this.setState({ submitted: true })
        let formData = {}
        if (this.supportFormElement.checkValidity() == true) {
            if (regex.test(this.state.userdata)) {
                formData.email = this.state.userdata
            } else {
                formData.username = this.state.userdata
            }
            supportInvitationService.create(formData)
                .then(data => {
                    alert("Support Invitation created!")
                    this.props.angularUrl("/admin/support-invitations/list")
                })
                .catch(data => {
                    console.log(data)
                })
        }
    }

    handleInputChange(event) {
        const value = event.target.value
        this.setState(prevState => {
            const nextState = {}
            const formData = Object.assign({}, prevState.formData)
            formData.name = value

            nextState.formData = formData

            if (prevState.formData._id) {
                const supporters = prevState.supporters.slice()
                const replaceIndex = supporters.findIndex(supporter => supporter._id === prevState.formData._id)
                supporters.splice(replaceIndex, 1, formData)

                nextState.supporters = supporters
            }
            return nextState
        })
    }

    handleDeleteClick(id, userId) {
        supporterService.deleteSupporter(id, userId)
            .then(data => {
                this.setState(prevState => {
                    let supportersCopy = prevState.supporters.slice()
                    let removeIndex = supportersCopy.findIndex(element => element._id === userId)
                    supportersCopy.splice(removeIndex, 1)

                    return {
                        formData: {
                            username: '',
                            imageUrl: ''
                        },
                        supporters: supportersCopy
                    }
                })
            })
            .catch(err => console.warn(`Error: ${err}`))
    }

    render() {
        if (this.state.supporters === null) { return null }
        let userSupporters = this.state.supporters.map(supporters => (
            <li key={supporters._id} >
                <a href={"profiles/" + supporters._id}>
                    <img src={supporters.imageUrl} width="100px" height="100px"></img>
                    <h4 className="username text-ellipsis">
                        {supporters.username}
                    </h4>
                </a>

                <div>
                    <button type="button" onClick={e => this.handleDeleteClick(this.state.user._id, supporters._id)} className="btn btn-danger">Remove</button>
                </div>
            </li>
        ))
        return (
            <div className="panel panel-inverse">
                <div className="panel-heading">
                    <h4 className="panel-title">My Supporters</h4>
                </div>
                <div className="panel-body">
                    <button className="btn btn-success" onClick={this.handleShow}>Invite</button>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Invite a user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form ref={ref => this.supportFormElement = ref} className="supportForm" noValidate>
                            <div className={"form-group " + (this.state.submitted && this.userElement && !this.userElement.validity.valid ? 'has-error has-feedback' : '')}>
                                <label className="control-label" htmlFor="user">Recipient Username / Email Address</label>
                                <input id="user" value={this.state.userdata} name="userdata" className="form-control" type="text"
                                    ref={ref => this.userElement = ref} onChange={(event) => this.onInputChange(event)} required />
                                {this.state.submitted && this.userElement && this.userElement.validity.valueMissing && <p className="help-block">A Username or Email is required.</p>}
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-success" onClick={this.onFormSubmit}>Send invite</button>
                        <button type="button" className="btn btn-default" onClick={this.handleClose}>Cancel</button>
                    </Modal.Footer>
                </Modal>
                <ul className="registered-users-list clearfix">
                    {userSupporters}
                </ul>
            </div>


        )
    }
}

module.exports = SupportManagement