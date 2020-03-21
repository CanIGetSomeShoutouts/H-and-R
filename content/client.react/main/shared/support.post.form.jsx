const React = require('react')
const Select = require('react-select').default
const SupportPostService = require('../../services/support.posts.service')
const authenticationService = require('../../services/authentication.service')
const userService = require('../../services/users.service')

class SupportPostForm extends React.PureComponent {
    constructor(props, context) {
        super(props, context)

        this.state = {
            formData: {
                subject: "Placeholder Subject",
                clientId: this.props.userId,
                viewerIds: []
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleViewerChange = this.handleViewerChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    handleChange(e) {
        const target = e.target
        const value = target.value
        const name = target.name

        this.setState((prevState) => {
            const newFormData = Object.assign({}, prevState.formData)
            newFormData[name] = value
            return {
                formData: newFormData
            }
        })
    }

    handleViewerChange(viewerIds) {
        viewerIds = viewerIds.map(viewer => {
            return viewer.value
        })
        this.setState((prevState) => {
            const newFormData = Object.assign({}, prevState.formData)
            newFormData.viewerIds = viewerIds
            return {
                formData: newFormData
            }
        })
    }

    submit(event) {
        let current = authenticationService.getCurrentUser()
        let form = Object.assign({},this.state.formData)
        form.userId = current.userId
        SupportPostService.create(this.state.formData)
            .then(data => {
                return userService.readById(current.userId)
            })
            .then(user=> {
                this.props.onCreate(form, user.item)
            })
            .catch(err => console.log(err))
        this.setState({
            formData: {
                subject: "Placeholder Subject",
                clientId: this.props.userId,
                viewerIds: []
            }
        })
    }

    render() {
        return (
            <div>
                <div className="panel panel-inverse">

                    <div className="panel-body">

                        <form action="" id="myForm">
                            <div className="form-group">
                             
                                <textarea className="form-control" name="contentHtml" id="" placeholder="Send a message" cols="30" rows="10" onChange={this.handleChange}></textarea>
                            </div>

                            <div className="form-group" className="form-group">
                                <label htmlFor="viewers" className="control-label">Viewers</label>
                                <Select multi={true} name="viewers" id="viewers" value={this.state.formData.viewerIds} onChange={this.handleViewerChange} options=
                                    {this.props.supporters.map(function (supporter) {
                                        return { value: supporter._id, label: supporter.username }
                                    })} placeholder="Please select your viewers"
                                />
                            </div>

                            <div className="form-group">
                                <button
                                    type="button"
                                    className="btn btn-success pull-right"
                                    onClick={this.submit}>
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = SupportPostForm
