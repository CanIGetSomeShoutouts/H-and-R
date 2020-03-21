const React = require('react')
const JournalService = require('../../services/journal.events.service')
const TraumaTypeService = require('../../services/trauma.type.js')
const JournalTagServices = require('../../services/journal.tags.service.js')


class JournalDetail extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {

            journalEvent: {
                traumaTypeIds: [],
                comments: [],
                emotionalTags: [],
                physicalTags: [],
                triggerTags: [],
                socialTags: []

            },
            traumaTypes: [],
            emoTag: [],
            physicalTag: [],
            triggerTag: [],
            socialTag: [],
            emotionalTagIcons: [],
            physicalTagIcons: [],
            triggerTagIcons: [],
            socialTagIcons: []
        }
    }

    componentWillReceiveProps(props) {
        if (props.urlParams !== this.props.urlParams) {
            this.setState({
                journalEvent: {
                    traumaTypeIds: [],
                    comments: [],
                    emotionalTags: [],
                    physicalTags: [],
                    triggerTags: [],
                    socialTags: []

                },
                traumaTypes: [],
                emoTag: [],
                physicalTag: [],
                triggerTag: [],
                socialTag: [],
                emotionalTagIcons: [],
                physicalTagIcons: [],
                triggerTagIcons: [],
                socialTagIcons: []
            })
            this.updatePage(props.urlParams)
        } else { return }
    }

    componentDidMount() {
        this.updatePage(this.props.urlParams)
    }


    updatePage(journalId) {
        JournalService.readById(journalId)
            .then(response => {
                this.setState({
                    journalEvent: response.item
                })

                this.state.journalEvent.traumaTypeIds.forEach((traumaTypeIds) => {
                    let id = traumaTypeIds

                    TraumaTypeService.readTraumaTypeId(id)
                        .then(response => {
                            this.setState(prevState => {
                                let array = prevState.traumaTypes.slice()
                                array.push(response.item)
                                return {
                                    traumaTypes: array
                                }
                            })
                        })
                        .catch(err => console.warn(err))
                })

                this.state.journalEvent.emotionalTags.forEach((emotionalTags) => {
                    let id = emotionalTags.id

                    JournalTagServices.readById(id)
                        .then(response => {
                            this.setState(prevState => {

                                let tagArray = prevState.emoTag.slice()
                                tagArray.push(response.item)
                                return {
                                    emoTag: tagArray
                                }
                            })

                            this.state.emoTag.forEach((tag) => {
                                let id = tag.iconId

                                JournalTagServices.readIconById(id)
                                    .then(response => {
                                        this.setState(prevState => {
                                            let array = prevState.emotionalTagIcons.slice()
                                            array.push(response.item)
                                            return {
                                                emotionalTagIcons: array
                                            }
                                        })
                                    })
                                    .catch(err => console.warn(err))
                            })
                        })
                        .catch(err => console.warn(err))
                })


                this.state.journalEvent.physicalTags.forEach((physicalTags) => {
                    let id = physicalTags.id

                    JournalTagServices.readById(id)
                        .then(response => {
                            this.setState(prevState => {

                                let tagArray = prevState.physicalTag.slice()
                                tagArray.push(response.item)
                                return {
                                    physicalTag: tagArray
                                }
                            })

                            this.state.physicalTag.forEach((tag) => {
                                let id = tag.iconId

                                JournalTagServices.readIconById(id)
                                    .then(response => {
                                        this.setState(prevState => {
                                            let array = prevState.physicalTagIcons.slice()
                                            array.push(response.item)
                                            return {
                                                physicalTagIcons: array
                                            }
                                        })
                                    })
                                    .catch(err => console.warn(err))
                            })

                        })
                        .catch(err => console.warn(err))
                })

                this.state.journalEvent.triggerTags.forEach((triggerTags) => {
                    let id = triggerTags.id

                    JournalTagServices.readById(id)
                        .then(response => {
                            this.setState(prevState => {

                                let tagArray = prevState.triggerTag.slice()
                                tagArray.push(response.item)
                                return {
                                    triggerTag: tagArray
                                }
                                console.log(this.state.journalTags)

                            })
                            this.state.triggerTag.forEach((tag) => {
                                let id = tag.iconId

                                JournalTagServices.readIconById(id)
                                    .then(response => {
                                        this.setState(prevState => {
                                            let array = prevState.triggerTagIcons.slice()
                                            array.push(response.item)
                                            return {
                                                triggerTagIcons: array
                                            }
                                        })
                                    })
                                    .catch(err => console.warn(err))
                            })
                        })
                        .catch(err => console.warn(err))
                })

                this.state.journalEvent.socialTags.forEach((socialTags) => {
                    let id = socialTags.id

                    JournalTagServices.readById(id)
                        .then(response => {
                            this.setState(prevState => {

                                let tagArray = prevState.socialTag.slice()
                                tagArray.push(response.item)
                                return {
                                    socialTag: tagArray
                                }
                                console.log(this.state.journalTags)

                            })
                            this.state.socialTag.forEach((tag) => {
                                let id = tag.iconId

                                JournalTagServices.readIconById(id)
                                    .then(response => {
                                        this.setState(prevState => {
                                            let array = prevState.socialTagIcons.slice()
                                            array.push(response.item)
                                            return {
                                                socialTagIcons: array
                                            }
                                        })
                                    })
                                    .catch(err => console.warn(err))
                            })
                        })
                        .catch(err => console.warn(err))
                })
            })
    }

    render() {
        return (
            <div>
                <div className="form-group col-md-3">
                    <div className="panel panel-inverse " data-sortable-id="form-stuff-3">
                        <div className="panel-heading">
                            <h4 className="panel-title">Event</h4>
                        </div>
                        <div className="panel-body">
                            <h4 className="text-justify">{this.state.journalEvent.title} </h4>
                            <div className="panel panel-inverse" data-sortable-id="ui-general-2">
                            </div>
                            <div>
                                <div className="">
                                    <p className="text-justify"> {this.state.traumaTypes.map((index, i) => <span key={index.name}>{!!i && ","} {index.name}</span>)}</p>
                                    <hr />
                                    <div>
                                        <p><strong>Emotional Tags</strong></p>
                                        {this.state.journalEvent.emotionalTags.map(emotionalTags => {
                                            let journalTag = this.state.emoTag.find(tag => tag._id === emotionalTags.id)
                                            let icon = this.state.emotionalTagIcons.find(tagIcon => tagIcon._id === journalTag.iconId)
                                            if (journalTag && icon) {
                                                return (
                                                    <p key={journalTag._id}>
                                                        <span> <img src={`data:image/image;base64,${icon.data}`} height="25" width="25" /> {journalTag.name} {emotionalTags.severity}  ({journalTag.severityMin} to {journalTag.severityMax})</span>
                                                    </p>
                                                )
                                            }
                                        }
                                        )}
                                    </div>
                                    <hr />
                                    <div>
                                        <p><strong>Physical Tags</strong></p>
                                        {this.state.journalEvent.physicalTags.map(physicalTags => {
                                            let journalTag = this.state.physicalTag.find(tag => tag._id === physicalTags.id)
                                            let icon = this.state.physicalTagIcons.find(tagIcon => tagIcon._id === journalTag.iconId)
                                            if (journalTag && icon) {
                                                return (
                                                    <p key={journalTag._id}>
                                                        <span> <img src={`data:image/image;base64,${icon.data}`} height="25" width="25" /> {journalTag.name} {physicalTags.severity}  ({journalTag.severityMin} to {journalTag.severityMax})</span>
                                                    </p>
                                                )
                                            }
                                        }
                                        )}
                                    </div>
                                    <hr />
                                    <div>
                                        <p><strong>Trigger Tags</strong></p>
                                        {this.state.journalEvent.triggerTags.map(triggerTags => {
                                            let journalTag = this.state.triggerTag.find(tag => tag._id === triggerTags.id)
                                            let icon = this.state.triggerTagIcons.find(tagIcon => tagIcon._id === journalTag.iconId)
                                            if (journalTag && icon) {
                                                return (
                                                    <p key={journalTag._id}>
                                                        <span> <img src={`data:image/image;base64,${icon.data}`} height="25" width="25" /> {journalTag.name} {triggerTags.severity}  ({journalTag.severityMin} to {journalTag.severityMax})</span>
                                                    </p>
                                                )
                                            }
                                        }
                                        )}
                                    </div>
                                    <hr />
                                    <div>
                                        <p><strong>Social Tags</strong></p>
                                        {this.state.journalEvent.socialTags.map(socialTags => {
                                            let journalTag = this.state.socialTag.find(tag => tag._id === socialTags.id)
                                            let icon = this.state.socialTagIcons.find(tagIcon => tagIcon._id === journalTag.iconId)
                                            if (journalTag && icon) {
                                                return (
                                                    <p key={journalTag._id}>
                                                        <span> <img src={`data:image/image;base64,${icon.data}`} height="25" width="25" /> {journalTag.name} {socialTags.severity}  ({journalTag.severityMin} to {journalTag.severityMax})</span>
                                                    </p>
                                                )
                                            }
                                        }
                                        )}
                                    </div>
                                    <hr />
                                    <div>
                                        <h5 className='text-justify'> <div dangerouslySetInnerHTML={{ __html: this.state.journalEvent.contentHtml }} /></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='panel-footer'>
                            <button type="button" onClick={this.props.close} className="btn btn-default col-sm-offset-9">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = JournalDetail
