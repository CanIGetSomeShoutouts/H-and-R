"use strict"

const React = require('react')
const hackersService = require('../services/hackers.service')

class HackersDetail extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            hacker: {
                name: ''
            },
            date: new Date().getTime()
        }
    }

    componentWillReceiveProps(props) {
        this.update(props.urlParams.id)
    }

    componentDidMount() {
        this.update(this.props.urlParams.id)
    }

    update(id){
        // urlParams comes from the UI Router resolve
        hackersService.readById(id)
            .then(data => {
                this.setState({ hacker: data.item })
            })
            .catch(err => console.warn(err))
    }

    render() {
        console.log('rendering')
        return (
            <div className="jumbotron text-center">
                <h1>{this.state.hacker.name} - {this.state.date}</h1>
            </div>
        )
    }
}

module.exports = HackersDetail