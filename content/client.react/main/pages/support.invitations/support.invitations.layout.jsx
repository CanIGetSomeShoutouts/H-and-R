"use strict"

const React = require('react')

class SupportInvitationsLayout extends React.PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="panel panel-inverse">
                <div className="panel-heading">
                    <h4 className="panel-title">Support Invitations</h4>
                </div>
                <div className="panel-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

module.exports = SupportInvitationsLayout