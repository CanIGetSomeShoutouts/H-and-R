const React = require('react')
const UserSupportPosts = require('../shared/user.support.posts')
const supportPostService = require('../../services/support.posts.service')
const usersService = require('../../services/users.service')

class TestSupport extends React.PureComponent {
    constructor(props, context) {
        super(props, context)
        this.state = {

        }
    }

    render() {

        return (<UserSupportPosts userId={this.props.urlParams.userId} />
        )
    }
}

module.exports = TestSupport
