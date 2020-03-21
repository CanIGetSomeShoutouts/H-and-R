"use strict"

const React = require('react')
const Modal = require('react-bootstrap').Modal

class JournalTagMenu extends React.PureComponent {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        let rows = this.props.journalTags
            .filter(journalTag => journalTag.type === this.props.category)
            .map(journalTag => {
                // Create buttons based off of severity options
                let severityButtons = []
                for (let i = journalTag.severityMin; i <= journalTag.severityMax; i += journalTag.severityStep) {
                    severityButtons.push(<button key={"severity-options" + i} className="btn btn-sm btn-default" onClick={() => { this.props.severityOptionOnClick(journalTag, i) }}>{i}</button>)
                }

                return (
                    <div className="row m-b-10" key={journalTag._id}>
                        <div className="col-sm-2">
                            <img alt={journalTag.icon.name} src={"data:image/image;base64," + journalTag.icon.data} height="30" width="30" />
                        </div>
                        <div className="col-sm-5 journalTagsDetail-tagPreview">
                            {journalTag.name}
                        </div>
                        <div className="col-sm-5">
                            {severityButtons}
                        </div>
                    </div>
                )
            })

        return (
            <div>
                <Modal bsSize="small" show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.category} Tags</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {rows}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-default" onClick={this.props.handleClose}>Close</button>
                    </Modal.Footer>
                </Modal>
            </div >
        )

    }
}

module.exports = JournalTagMenu
