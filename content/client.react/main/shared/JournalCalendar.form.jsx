// Misc Requires
window.$ = window.jQuery = require('jquery');
const React = require('react')

// CSS Styles
// NOTE: Affects calendar form and switchery
const display = { display: 'block' }
const hide = { display: 'none' }

// Components
const Switch = require('react-switchery-component')
const ReactSummernote = require('react-summernote').default
const JournalTagsMenu = require('../shared/journal.tags.menu')
const Select = require('react-select').default
const DateTime = require('react-datetime')

// Services
const intakeFormService = require("../../services/intake.form.service")
const usersService = require('../../services/users.service')
const journalEventsService = require('../../services/journal.events.service')
const journalTagsService = require('../../services/journal.tags.service')
const authenticationService = require('../../services/authentication.service')

class JournalCalendarForm extends React.Component {
  constructor(props) {
    super(props);
    this.traumaHandler = this.traumaHandler.bind(this)
    this.viewerHandler = this.viewerHandler.bind(this)
    this.switcheryChange = this.switcheryChange.bind(this)
    this.contentChange = this.contentChange.bind(this)
    this.titleChange = this.titleChange.bind(this)
    this.dateChange = this.dateChange.bind(this)
    this.dateOpen = this.dateOpen.bind(this)
    this.closeForm = this.closeForm.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.showJournalTagsMenu = this.showJournalTagsMenu.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.addJournalTag = this.addJournalTag.bind(this)

    this.state = {
      content: "Enter Content Here",
      category: '',
      open: false,
      traumaList: [],
      traumaSelected: [],
      traumaTypeIds: [],
      viewerList: [],
      viewerSelected: [],
      viewerIds: [],
      isChecked: false,
      selectedDate: this.props.eventData,
      show: false,
      journalTags: [],
      emotionalTags: [],
      physicalTags: [],
      socialTags: [],
      triggerTags: [],
      formData: {}
    }
  }

  addJournalTag(selectedJournalTag, selectedSeverity) {
    this.setState(prevState => {
      // Creating the property name to select correct journal tag
      let journalTagCategory = this.state.category.toLowerCase() + "Tags"
      const newTags = prevState[journalTagCategory].slice()
      newTags.push({
        id: selectedJournalTag._id,
        severity: selectedSeverity
      })

      return {
        [journalTagCategory]: newTags
      }
    })
    // Close modal
    this.setState({ show: false })
  }



  componentDidMount() {
    intakeFormService.readTraumaTypes()
      .then(data => {
        this.setState({ traumaList: data.items })
        return usersService.readSupporters()
      })
      .then(data => {
        this.setState({ viewerList: data.items })
      })
      .catch(err => { console.log(err) })

    this.setState({ selectedDate: this.props.eventData })

    // When this component renders, get journal tags
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
      .catch(err => { console.warn(err) })
  }

  showJournalTagsMenu(tagCategory) {
    this.setState({
      category: tagCategory,
      show: true
    })
  }

  handleClose() {
    this.setState({ show: false })
  }

  traumaHandler(selected) {
    this.setState({ traumaSelected: selected, traumaTypeIds: selected.map(item => item.value) })
  }

  viewerHandler(selected) {
    this.setState({ viewerSelected: selected, viewerIds: selected.map(item => item.value) })

  }

  dateOpen() {
    this.setState(prevState => ({ open: !prevState.open }))
  }

  dateChange(data) {
    this.setState({ selectedDate: data.toDate(), open: false })
  }

  titleChange(event) {
    this.setState({ title: event.target.value })
  }

  contentChange(data) {
    this.setState({ content: data })
  }

  switcheryChange(event) {
    if (event.target.checked) {
      this.setState({
        isChecked: event.target.checked,
        viewerIds: this.state.traumaList.map(trauma => trauma._id),
        viewerSelected: []
      })
    } else {
      this.setState({
        isChecked: event.target.checked,
        viewerIds: [],
        viewerSelected: []
      })
    }
  }

  closeForm(event) {
    this.props.showForm(false)
    this.setState({
      isChecked: false,
      viewerSelected: [],
      viewerIds: [],
      title: '',
      content: '',
      traumaSelected: [],
      traumaTypeIds: [],

    })
  }

  onSubmit() {
    // Create payload
    let formData = {
      eventDate: this.state.selectedDate.toString() || this.props.eventData.toString(),
      title: this.state.title,
      contentHtml: this.state.content,
      traumaTypeIds: this.state.traumaTypeIds,
      emotionalTags: this.state.emotionalTags,
      physicalTags: this.state.physicalTags,
      triggerTags: this.state.triggerTags,
      socialTags: this.state.socialTags,
      comments: [],
      viewerIds: this.state.viewerIds,
      isVisibleToCurrentSupporters: this.state.isChecked
    }
    journalEventsService.create(formData)
      .then(response => {
        console.log(response)
        formData._id = response.item._id
        formData.userId = response.item.userId
        formData.dateCreated = response.item.dateCreated
        formData.dateModified = response.item.dateModified
        this.props.showForm(false)
        this.props.onCreate(formData)
      })
      .catch(err => console.log(err))
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
              <div className={this.props.eventData && this.props.modal ? 'journalFormTransition' : 'journalFormTransitionHidden'}>
                <form>
               
                  <div className={"form-group"}>
                    <label className="control-label" htmlFor="dateTime">Date</label>
                    <div className="input-group">
                      <DateTime
                        value={this.state.selectedDate || this.props.eventData}
                        input={true}
                        open={this.state.open}
                        inputProps={{ className: "form-control", onClick: this.dateOpen, readOnly: true }}
                        name="dateTime"
                        onChange={this.dateChange}
                        timeFormat={false}
                      />
                      <span className="input-group-addon" onClick={this.dateOpen}>
                        <i className="glyphicon glyphicon-calendar" />
                      </span>
                    </div>
                  </div>
                  <div className={"form-group"}>
                    <label className="control-label" htmlFor="title">Title</label>
                    <input
                      name="title"
                      className="form-control"
                      onChange={this.titleChange}
                      type="text"
                      placeholder="Please enter a title"
                    />
                  </div>
                  <div className={"form-group"}>
                    <label className="control-label" htmlFor="trauma">Trauma</label>
                    <Select
                      value={this.state.traumaSelected}
                      options={this.state.traumaList.map(trauma => {
                        return { value: trauma._id, label: trauma.name }
                      })}
                      placeholder="Please select a trauma"
                      onChange={this.traumaHandler}
                      multi={true}
                      name="trauma"
                    />
                  </div>
                  <div className={"form-group"}>
                    <label htmlFor="summernote" className="control-label">Event Details</label>
                    <ReactSummernote
                      name="summernote"
                      value={this.state.content}
                      options={{
                        height: 200,
                        dialogsInBody: true,
                        disableResizeEditor: false,
                        toolbar: [
                          ['style', ['style']],
                          ['font', ['bold', 'underline', 'clear', 'color']],
                          ['fontname', ['fontname']],
                          ['para', ['ul', 'ol', 'paragraph']],
                          ['table', ['table']],
                          ['insert', ['link']],
                        ]
                      }}
                      onChange={this.contentChange}
                    />
                  </div>
                  <label htmlFor="switch" className="control-label">Make this entry visible to current supporters?</label>
                  <div style={{ height: 10 }} />
                  <Switch
                    id="switch"
                    name="switch"
                    color="#00acac"
                    secondaryColor="#C9C9C9"
                    checked={this.state.isChecked}
                    onChange={this.switcheryChange}
                  />
                  <div style={{ height: 10 }} />
                  <div className={this.state.isChecked ? 'form-group journalFormTransitionHidden' : 'form-group journalFormTransition'}>
                    <label htmlFor="viewers" className="control-label">Viewers</label>
                    <div style={{ height: 10 }} />
                    <Select
                      value={this.state.viewerSelected}
                      options={this.state.viewerList.map(viewer => {
                        return { value: viewer._id, label: viewer.username }
                      })}
                      placeholder="Please select a viewer"
                      onChange={this.viewerHandler}
                      multi={true}
                    />
                  </div>
                  <label className="control-label">Journal Tags</label>
                  <div className="form-group">
                    <p>Emotional Tags: {this.state.emotionalTags.length}</p>
                    <p>Physical Tags: {this.state.physicalTags.length}</p>
                    <p>Social Tags: {this.state.socialTags.length}</p>
                    <p>Trigger Tags: {this.state.triggerTags.length}</p>
                  </div>
                  <div className="form-group">
                    <button type="button" className="btn btn-default m-r-5" onClick={() => { this.showJournalTagsMenu('Emotional') }}>Emotional</button>
                    <button type="button" className="btn btn-default m-r-5" onClick={() => { this.showJournalTagsMenu('Physical') }}>Physical</button>
                    <button type="button" className="btn btn-default m-r-5" onClick={() => { this.showJournalTagsMenu('Social') }}>Social</button>
                    <button type="button" className="btn btn-default" onClick={() => { this.showJournalTagsMenu('Trigger') }}>Trigger</button>
                  </div>
                  <JournalTagsMenu
                    show={this.state.show}
                    handleClose={this.handleClose}
                    category={this.state.category}
                    journalTags={this.state.journalTags}
                    severityOptionOnClick={this.addJournalTag}
                  />
                </form>
                <div style={{ height: 10 }} />
                <div className="text-center">
                  <a className="btn btn-success" onClick={this.onSubmit}>Create Event</a>
                  <button type="reset" className="btn btn-default" onClick={this.closeForm}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

module.exports = JournalCalendarForm
