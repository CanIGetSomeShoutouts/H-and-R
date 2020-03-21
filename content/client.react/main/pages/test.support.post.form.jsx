const React = require('react')
const SupportPost = require('../shared/support.post.form')
const usersService = require('../../services/users.service')

class TestSupportPostForm extends React.PureComponent {
    constructor(props, context) {
        super(props, context)
        this.state = {
            supporters: []
        }
    }

    componentDidMount() {
        let id = this.props.urlParams.clientId

        usersService.readSupportersById(id)
            .then(response => {
                this.setState({ supporters: response.data.items })
            })
    }

    onCreate(data, user) {
        console.log(data)
        console.log(user)
    }

    render() {
        return (
            <SupportPost userId={this.props.urlParams.clientId} supporters={this.state.supporters} onCreate={this.onCreate}>
            </SupportPost>
        )
    }
}

module.exports = TestSupportPostForm
