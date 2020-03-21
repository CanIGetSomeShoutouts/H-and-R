"use strict"

const React = require('react')
const supportInvitationService = require('../../../services/support.invitations.service')
const SupportInvitationLayout = require('./support.invitations.layout')

class SupportInvitationsList extends React.PureComponent {
    constructor(props, context) {
        super(props, context)

        this.read = this.read.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
        this.onCreateClick = this.onCreateClick.bind(this)

        this.state = {
            invitations: []
        }
    }

    componentDidMount() {
        this.read()
    }

    read() {
        supportInvitationService.read()
            .then(data => {
                this.setState({ invitations: data.items })
            })
            .catch(data => {
                console.log("Error", data)
            })
    }

    handleDeleteClick(id) {
        if(!window.confirm("Are you sure you want to delete this support invitation?")){return}
        event.preventDefault()
        supportInvitationService.delete(id)
            .then(result => {
                alert("Support Invitation successfully deleted.")
                this.setState(prevState => {
                    let invitationsCopy = prevState.invitations.slice()
                    let removeIndex = invitationsCopy.findIndex(element => element._id === id)
                    invitationsCopy.splice(removeIndex, 1)

                    return {
                        invitations: invitationsCopy
                    }
                })
            })
            .catch(result => {
                alert("There was a problem deleting this Support Invitation.")
            })
    }

    onCreateClick(event) {
        this.props.angularUrl('/admin/support-invitations/detail')
    }

    render() {
        let tableItems = this.state.invitations.map(item => (
            <tr key={item._id}>
                <td>{item.userId}</td>
                <td>{item.dateCreated}</td>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>
                    <div>
                        <button type="button" className="btn btn-danger" onClick={event => this.handleDeleteClick(item._id)}>Delete</button>
                    </div>
                </td>
            </tr>
        ))

        return (
            <div>
                <SupportInvitationLayout>
                    <button onClick={event => this.onCreateClick(event)} className="btn btn-success">Create</button>
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>User Id</th>
                                    <th>Date Created</th>
                                    <th>Recipient Email</th>
                                    <th>Recipient Username</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableItems}
                            </tbody>
                        </table>
                    </div>
                </SupportInvitationLayout>
            </div>
        )
    }
}

module.exports = SupportInvitationsList