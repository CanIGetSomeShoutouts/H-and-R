const React = require('react')
const IntakeFormService = require("../../services/intake.form.service")
const TraumaTypeService = require("../../services/trauma.type")
const authenticationService = require('../../services/authentication.service')

class ViewUserIntakeform extends React.Component {
    constructor(props, context) {
        super(props, content)

        this.state = {
            intakeformData: {},
            traumaTypes: []
        }
    }

    componentDidMount() {
        IntakeFormService.readByUserIdAndTherapistId(this.props.urlParams.id)
            .then(data => {
                this.setState({ intakeformData: data.item })

        this.state.intakeformData.traumaTypeIds.forEach((traumaTypeIds) => {
            let id = traumaTypeIds
            TraumaTypeService.readTraumaTypeId(id)
                .then(data => {
                    this.setState(prevState => {
                        let array = prevState.traumaTypes.slice()
                        array.push(data.item)
                        return {
                            traumaTypes: array
                        }
                    })
                })
                .catch(err => console.warn(err))
        })
            })
            .catch(err => console.warn(err))


    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="panel-group">
                        <div className="panel-heading">Insurance Provider:</div>
                        <div className="panel-body form-control-static">{this.state.intakeformData.insuranceProvider}</div>
                    </div>
                    <div className="panel-group">
                        <div className="panel-heading">Trauma Types:</div>
                        <div className="panel-body form-control-static">{this.state.traumaTypes.map((index, i) => <span key={index.name}>{!!i && ","} {index.name}</span>)}</div>
                    </div>
                    <div className="panel-group">
                        <div className="panel-heading">Current Place:</div>
                        <div className="panel-body form-control-static">{this.state.intakeformData.currentPlace}</div>
                    </div>
                    <div className="panel-group">
                        <div className="panel-heading">History:</div>
                        <div className="panel-body form-control-static">{this.state.intakeformData.history}</div>
                    </div>
                </div>
            </div>

        )
    }
}
module.exports = ViewUserIntakeform