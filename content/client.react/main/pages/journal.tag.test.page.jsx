"use strict"

const React = require('react')
const journalTagsService = require('../../services/journal.tags.service')
const authenticationService = require('../../services/authentication.service')
const JournalTagsMenu = require('../shared/journal.tags.menu')


class TestPage extends React.PureComponent {
    constructor(props, context) {
        super(props, context)

        this.showJournalTagsMenu = this.showJournalTagsMenu.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.protoTypeFunction = this.protoTypeFunction.bind(this)

        this.state = {
            show: false,
            category: '',
            journalTags: [],
            journalTagIcons: []
        }
    }

    protoTypeFunction(selectedTag, selectedTagIcon, selectedSeverity) {

        window.alert(`
        Ok so this is going to alert the _id and severity of the selected tag
        
        ${selectedTag._id} is the journalTag _id
        ${selectedTagIcon._id} is the journalTagIcon _id
        "${selectedSeverity}"  is the selected severity
        `)
    }

    handleClose() {
        this.setState({ show: false })
    }

    componentDidMount() {
        Promise.all([journalTagsService.readSiteWide(), journalTagsService.readByClientId(authenticationService.getCurrentUser().userId),])
            // NOTE: Promise.all will return an array of responses
            .then(datas => {
                const nextStateJournalTags = []
                const iconPromises = []

                // Pushing our journal tag entities to the nextState object
                for (let data of datas) {
                    nextStateJournalTags.push(...data.items)
                }

                // Need to update our nextState object and grab icon information
                for (let nextStateJournalTag of nextStateJournalTags) {
                    iconPromises.push(
                        // Creating another array of promises for journal tag icons
                        journalTagsService.readIconById(nextStateJournalTag.iconId)
                            .then(data => {
                                nextStateJournalTag.icon = data.item
                                delete nextStateJournalTag.iconId
                            }))
                }

                // After all of the icons have been retrieved and put in our nextState object, update this.state.journalTags
                Promise.all(iconPromises)
                    .then(() => {
                        this.setState({ journalTags: nextStateJournalTags })
                    })
            })
            .catch(err => {
                console.warn(err)
            })
    }

    showJournalTagsMenu(tagCategory) {
        this.setState({
            category: tagCategory,
            show: true
        })
    }

    render() {
        if (this.props.journalTags === null) { return null }

        return (
            <div>
                <h1>Main Menu Test Page</h1>
                <h3>Filter by Journal Tag Categories</h3>

                <button className="btn btn-success" onClick={() => { this.showJournalTagsMenu('Emotional') }}>Emotional</button>
                <button className="btn btn-success" onClick={() => { this.showJournalTagsMenu('Physical') }}>Physical</button>
                <button className="btn btn-success" onClick={() => { this.showJournalTagsMenu('Social') }}>Social</button>
                <button className="btn btn-success" onClick={() => { this.showJournalTagsMenu('Trigger') }}>Trigger</button>

                <JournalTagsMenu
                    show={this.state.show}
                    handleClose={this.handleClose}
                    category={this.state.category}
                    journalTags={this.state.journalTags}
                    severityOptionOnClick={this.protoTypeFunction}
                />

            </div>
        )
    }
}

module.exports = TestPage
