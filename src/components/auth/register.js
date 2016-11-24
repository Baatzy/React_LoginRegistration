import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Register extends Component {
  handleFormSubmit(formProps){
    //call action creator to register user
    this.props.registerUser(formProps);
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong> Error </strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render(){
    const { handleSubmit, fields: { first_name, last_name, email, password, passwordConfirm }} = this.props;
    return (
      <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className = "form-group">
          <label>First Name: </label>
          <input className="form-control" { ...first_name } />
          { first_name.touched && first_name.error && <div className="error">{first_name.error}</div> }
          <label>Last Name: </label>
          <input className="form-control" { ...last_name } />
          { last_name.touched && last_name.error && <div className="error">{last_name.error}</div> }
          <label>Email: </label>
          <input className="form-control" { ...email } />
          { email.touched && email.error && <div className="error">{email.error}</div> }
          <label>Password: </label>
          <input className="form-control" { ...password } type="password" />
          { password.touched && password.error && <div className="error">{password.error}</div> }
          <label>Confirm Password: </label>
          <input className="form-control" { ...passwordConfirm } type="password" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className = "btn btn-primary">Register</button>
      </form>
    );
  }
}

function validate(formProps){
  const errors = {};

  if(!formProps.first_name){
    errors.first_name= "First name must be at least 2 characters";
  }
  if(!formProps.last_name){
    errors.last_name = "Last name must be at least 2 characters";
  }
  if(!formProps.email){
    errors.email = "Please enter a valid Email";
  }
  if(!formProps.password){
    errors.password = "Please enter a valid Password";
  }
  if(!formProps.passwordConfirm){
    errors.password = "Please enter Password Confirmation"
  }
  if(formProps.password !== formProps.passwordConfirm){
    errors.password = "Password and Confirm Password do not match";
  }

  return errors;
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error };
}

//always remember to add your actions as third argument to redux form
export default reduxForm({
  form: 'register',
  fields: ['first_name', 'last_name', 'email', 'password', 'passwordConfirm'],
  validate // == validate : validate
}, mapStateToProps, actions)(Register);
