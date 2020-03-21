  const React = require("react");
  const userService = require("../../services/users.service");
  const authenticationService = require("../../services/authentication.service");

  class ChangeEmailForm extends React.PureComponent {
    constructor(props, context) {
      super(props, context);

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = { formData: { currentEmail: "", newEmail: "" }, submitted: false };
    }

    handleChange(event) {
      this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
      let regex = /\S+@\S+\.\S+/
      event.preventDefault()
      this.setState({ submitted: true})
          if(this.emailFormElement.checkValidity() == true) {
              alert("Congrats, your email has been updated.");
          } else {
              alert('Oh snap, we encountered a problem. Please try again.')    
          }        
        }
   
    componentDidMount() {
      let id = authenticationService.getCurrentUser().userId;
      userService
        .readById(id)
        .then(data => {
          this.setState({ user: data.item.email });
        })
        .catch(err => console.warn(err));
    }

    render() {
      return <div>
          <div className="panel panel-inverse">
            <div className="panel-heading">
              <h4 className="panel-title">Update Email Address</h4>
            </div>
            <div className="panel-body">
              <form>
                <div className="form-group">
                  <label htmlFor="newEmail">Current Email</label>
                  <p className="form-control-static">{this.state.user}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="newEmail">Enter New Email</label>
                  <input name="newEmail" id="newEmail" maxLength="24" minLength="7" type="email" className="form-control" placeholder="Please provide a new email" ref={ref => (this.emailFormElement = ref)} value={this.state.newEmail} onChange={this.handleChange.bind(this)} required />
                </div>
                <div className="form-group pull-right">
                  <button onClick={event => this.handleSubmit(event)} className="btn btn-success">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>;  
    }
  }

  module.exports = ChangeEmailForm;
