"use strict"

const React = require('react')
const hackersService = require('../services/hackers.service')

class HackersList extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.create = this.create.bind(this)
        this.update = this.update.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
        this.handleDetailClick = this.handleDetailClick.bind(this)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)

        this.state = {
            tagline: 'Hack The Planet!',
            formData: {
                name: ''
            },
            hackers: null
        }
    }

    componentDidMount() {
        hackersService.read()
            .then(data => {
                this.setState({ hackers: data.items })
            })
            .catch(err => console.warn(err))
    }

    create() {
        hackersService.create(this.state.formData)
            .then(data => {
                this.setState(prevState => {
                    // see handleInputChange for notes about changing properties in state objects/array
                    prevState.formData._id = data.item

                    let hackersCopy = prevState.hackers.slice()
                    hackersCopy.push(prevState.formData)

                    return {
                        formData: { name: '' },
                        hackers: hackersCopy
                    }
                })
            })
            .catch(err => console.warn(err))
    }

    update() {
        hackersService.update(this.state.formData)
            .then(data => {
                this.setState({ formData: { name: '' } })
            })
            .catch(err => console.warn(`Error: ${err}`))
    }

    handleInputChange(event) {
        // copy anything you need out of the event for use in the setState function.
        // by the time the setState function runs, the contents of the event object
        // will have changed.
        const value = event.target.value

        // in general, when you want to modify a property of an object or array
        // within state, you want to create a copy of the whole object and then
        // modify that copy.

        // on top of that, whenever you need to work with a copy of the original
        // data, you also need to use a different form of the setState function
        // that accepts a function.

        this.setState(prevState => {
            const nextState = {}

            // use prevState to refer to the latest data in the state. it is
            // safe to make copies of data in `prevState` for modification. you
            // don't want to make copies of data in `this.state`.

            const formData = Object.assign({}, prevState.formData) // creates a copy
            formData.name = value                                // modifies the copy

            nextState.formData = formData

            if (prevState.formData._id) {
                // in this particular case, we also want to update the data displayed
                // in the list for the hacker we're editing. this is not a typical thing
                // to do but that is how the original example behaved so this is how we
                // can replicate that behavior in react. since hackers is an array, we
                // need to copy the array.

                const hackers = prevState.hackers.slice() // creates a copy of the array.
                // this is a "shallow" copy,
                // meaning the array container
                // itself is new/separate, but
                // the items in the array are
                // the same objects as in the
                // original array - they are
                // not copies of those objects
                const replaceIndex = hackers.findIndex(hacker => hacker._id === prevState.formData._id)
                hackers.splice(replaceIndex, 1, formData) // replace the old hacker object with the updated hacker object

                nextState.hackers = hackers
            }

            // return the updated state properties
            return nextState
        })
    }

    handleDetailClick(id) {
        // this url function is provided by the magical reactLoader angular component
        // and allows us to use the UI router to change to a new URL/page/state from
        // react javascript
        this.props.angularUrl("/hackers/react-detail/" + id)
    }

    handleEditClick(hacker) {
        // load the selected hacker into the form
        this.setState({ formData: hacker })
    }

    handleDeleteClick(id) {
        hackersService.delete(id)
            .then(data => {
                this.setState(prevState => {
                    // see notes in handleInputChange regarding changes to state objects/arrays
                    let hackersCopy = prevState.hackers.slice()
                    let removeIndex = hackersCopy.findIndex(element => element._id === id)
                    hackersCopy.splice(removeIndex, 1)

                    return {
                        formData: { name: '' },
                        hackers: hackersCopy
                    }
                })
            })
            .catch(err => console.warn(`Error: ${err}`))
    }

    render() {
        // if there's no data, as in the ajax call hasn't happened yet - don't display anything at all.
        if (this.state.hackers === null) { return null }

        // setup a variable to hold an array of react elements. we use this in a template expression below.
        let tableRows = this.state.hackers.map(hacker => (
            <tr key={hacker._id}>
                <td>{hacker.name}</td>
                <td>
                    {/*
                        if you need to pass something into your handler, you have to use an arrow
                        function to invoke the handler, rather than just referencing the handler by name
                    */}
                    <button type="button" onClick={e => this.handleDetailClick(hacker._id)} className="btn btn-primary">View</button>
                    <button type="button" id="edit" onClick={e => this.handleEditClick(hacker)} className="btn btn-primary">Edit</button>
                    <button type="button" onClick={e => this.handleDeleteClick(hacker._id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        ))

        return (
            <div>
                <div className="jumbotron text-center">
                    <h1>Hackers and Proud</h1>

                    <p>{this.state.tagline}</p>
                </div>

                <div className="clearfix">
                    <form className="form-inline">
                        <div className="form-group">
                            <label className="control-label" htmlFor="Name">Name</label>
                            <input type="text" value={this.state.formData.name} className="form-control" id="Name" placeholder="Name" name="name" onChange={this.handleInputChange} />
                        </div>
                        {/* we don't need to pass anything into these handlers so we just reference the handler by name */}
                        <button type="button" onClick={this.create} className="btn btn-default">Send</button>
                        <button type="button" onClick={this.update} className="btn btn-default">Update</button>
                    </form>

                </div>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Hacker</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                    </table>
                </div>
                <pre>{JSON.stringify(this.state, null, 4)}</pre>
            </div>
        )
    }
}

module.exports = HackersList