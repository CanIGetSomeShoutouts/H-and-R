const React = require('react')
const traumasService = require('../../services/traumas.service')
const authenticationService = require('../../services/authentication.service')
const moment = require('moment')
const TimelineView = require('../shared/timeline.view')
const usersService = require('../../services/users.service')

class UserTimeline extends React.PureComponent {
    constructor(props, context) {
        super(props, context)

        this.state = {
            traumas: [],
            username: ""
        }
    }

    componentDidMount() {
        traumasService.readByUserId(this.props.urlParams.userId)
            .then(data => {
                this.setState({ traumas: data.items })
            })
            .catch(err => console.warn(err))
        usersService.readById(this.props.urlParams.userId)
            .then(user => {
                this.setState({ username: user.item.username })
            })
    }

    render() {
        return (
            <div>
                <div id="content">
                    <h1 className="page-header">{this.state.username}'s Timeline</h1>
                    <TimelineView
                        traumas={this.state.traumas}
                    />
                </div>
            </div>
        )
    }
}

module.exports = UserTimeline
