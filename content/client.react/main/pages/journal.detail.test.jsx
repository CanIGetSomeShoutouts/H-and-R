const React = require('react')
const JournalService = require('../../services/journal.events.service')
const JournalDetail = require('../shared/Journal.Detail')

class JournalDetailTest extends React.PureComponent {
    constructor(props, context) {

        super(props, context)
        this.state = {
        }
    }

    render() {
        return (
            <JournalDetail urlParams={this.props.urlParams}></JournalDetail>
        )
    }
}

module.exports = JournalDetailTest
