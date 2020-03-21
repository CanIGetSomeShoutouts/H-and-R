const React = require('react')

const journalTagIconsService = require('../../services/journal.tags.service')

class IconUploader extends React.PureComponent {
    constructor(props, context) {
        super(props, context)

        this.create = this.create.bind(this)
        this.handleSetInputChange = this.handleSetInputChange.bind(this)
        this.handleFileInputChange = this.handleFileInputChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)

        this.state = {
            file: '',
            set: '',
            submitted: false
        }
    }

    componentDidMount() {
    }

    handleSetInputChange(event) {
        this.setState({ set: event.target.value })
    }

    handleFileInputChange(event) {
        this.setState({ file: event.target.files[0] })
    }

    onFormSubmit(event) {
        event.preventDefault()
        this.setState({ submitted: true })
        if (this.fileFormElement.checkValidity() == true) {
            this.create(this.state.file, this.state.set)
        }
    }

    create(file, set) {
        const formData = new FormData()
        formData.append('set', set)
        formData.append('file', file)
        journalTagIconsService.createIcons(formData)
            .then(data => {
                window.alert("Icon Pack Uploaded")
            })
            .catch(err => {
                console.warn(err)
            })
    }

    render() {
        return (
            <div className="panel panel-inverse">
                <div className="panel-heading">
                    <h4 className="panel-title">Upload Icon Pack</h4>
                </div>
                <div className="panel-body">
                    <div>
                        <form ref={ref => this.fileFormElement = ref} className="fileForm" onSubmit={this.onFormSubmit} noValidate>
                            <div className={"form-group " + (this.state.submitted && this.setElement && !this.setElement.validity.valid ? 'has-error has-feedback' : '')}>
                                <label className="control-label" htmlFor="set">Set</label>
                                <input type="text" className="form-control" name="set" id="set" value={this.state.set} onChange={(event) => this.handleSetInputChange(event)}
                                    ref={ref => this.setElement = ref} pattern="([A-Za-z0-9\-]+)" required />
                                <span className="fa fa-times form-control-feedback"></span>
                                {this.state.submitted && this.setElement && this.setElement.validity.valueMissing && <p className="help-block">A name for the Set is required.</p>}
                                {this.state.submitted && this.setElement && this.setElement.validity.patternMismatch && <p className="help-block">Must only contain letters, numbers, and dashes.</p>}
                            </div>
                            <div className={"form-group " + (this.state.submitted && this.fileElement && !this.fileElement.validity.valid ? 'has-error' : 'has-feedback')}>
                                <label className="control-label" htmlFor="file">Icon Pack File</label>
                                <input type="file" name="file" onChange={(event) => this.handleFileInputChange(event)} required ref={ref => this.fileElement = ref} />
                                <span>Icon packs should be saved as ZIP files that contain only the image files and no extra folders or files</span>
                                {this.state.submitted && this.fileElement && this.fileElement.validity.valueMissing && <p className="help-block">A file is required.</p>}
                            </div>
                            <button type="submit" className="btn btn-success pull-right">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = IconUploader