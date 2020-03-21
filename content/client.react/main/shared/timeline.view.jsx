"use strict"

const React = require("react")
const authenticationService = require('../../services/authentication.service')
const moment = require('moment')

class TimelineView extends React.PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    dateFormat(date) {
        const formattedDate = moment(date).format("ll");
        return formattedDate;
    }
    timeFormat(time) {
        const formattedTime = moment(time).format("h:mm A")
        return formattedTime
    }

    render() {
        let timelineData = this.props.traumas.map(trauma => (
            <li key={trauma._id}>
                <div className="timeline-time">
                    <span className="time">{this.dateFormat(trauma.beginDate)}</span>
                    {trauma.endDate !== trauma.beginDate &&
                        <div>
                            <span>to</span>
                            <span className="time">{this.dateFormat(trauma.endDate)}</span>
                        </div>
                    }
                </div>
                <div className="timeline-icon">
                    <a href="javascript:;"><i className="fa fa-edit"></i></a>
                </div>
                <div className="timeline-body">
                    <div className="timeline-header">
                        <span className="username text-muted">{trauma.type}</span>
                    </div>
                    <div className="timeline-content">
                        <p className="lead">
                            <i className="fa fa-quote-left fa-fw pull-left"></i>
                            {trauma.summary}
                            <i className="fa fa-quote-right fa-fw m-l-5"></i>
                        </p>
                    </div>
                    <div className="timeline-content">
                        <p> {trauma.description}</p>
                    </div>
                </div>
            </li>
        ))

        return (
            <ul className="timeline">
                {timelineData}
            </ul>
        )
    }
}

module.exports = TimelineView
