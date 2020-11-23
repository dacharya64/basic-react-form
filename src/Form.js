import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class Form extends React.Component {
  state = {
    tag: "",
    firstNameError: "",
    name: "",
    lastNameError: "",
    occupation: "",
    usernameError: "",
    status: "",
    emailError: "",
    password: "",
    passwordError: "",
    information: "", 
    informationError: ""
  };

  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      firstNameError: "",
      lastNameError: "",
      usernameError: "",
      emailError: "",
      passwordError: "",
      informationError: ""
    };

    // if (this.state.username.length < 5) {
    //   isError = true;
    //   errors.usernameError = "Username needs to be atleast 5 characters long";
    // }

    // if (this.state.email.indexOf("@") === -1) {
    //   isError = true;
    //   errors.emailError = "Requires valid email";
    // }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onSubmit(this.state);
      // clear form
      this.setState({
        tag: "",
        firstNameError: "",
        name: "",
        lastNameError: "",
        occupation: "",
        usernameError: "",
        status: "",
        emailError: "",
        password: "",
        passwordError: "",
        information: "", 
        informationError: ""
      });
    }
  };

  render() {
    return (
      <form>
        <TextField
          name="tag"
          hintText="Tag"
          floatingLabelText="Tag"
          value={this.state.tag}
          onChange={e => this.change(e)}
          errorText={this.state.firstNameError}
          floatingLabelFixed
        />
        
        <TextField
          name="name"
          hintText="Name"
          floatingLabelText="Name"
          value={this.state.name}
          onChange={e => this.change(e)}
          errorText={this.state.lastNameError}
          floatingLabelFixed
        />
        
        <TextField
          name="occupation"
          hintText="Occupation"
          floatingLabelText="Occupation"
          value={this.state.occupation}
          onChange={e => this.change(e)}
          errorText={this.state.usernameError}
          floatingLabelFixed
        />
       
        <TextField
          name="status"
          hintText="Status"
          floatingLabelText="Status"
          value={this.state.status}
          onChange={e => this.change(e)}
          errorText={this.state.emailError}
          floatingLabelFixed
        />

        <TextField
          name="password"
          hintText="Password"
          floatingLabelText="Password"
          value={this.state.password}
          onChange={e => this.change(e)}
          errorText={this.state.passwordError}
          //type="password"
          floatingLabelFixed
        />
       
        <TextField
          name="information"
          hintText="Information"
          floatingLabelText="Information"
          value={this.state.information}
          onChange={e => this.change(e)}
          errorText={this.state.informationError}
          //type="password"
          floatingLabelFixed
        />
       
        <RaisedButton label="Submit" onClick={e => this.onSubmit(e)} primary />
      </form>
    );
  }
}
