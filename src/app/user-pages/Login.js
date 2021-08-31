import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

export class Login extends Component {


  constructor(props){
    super(props);
    this.state = {
      username : "",
      password : "",
      usernameErr : "",
      passwordErr : ""
    }
  }

  

  handleUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  handlepassowrd = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.username)

   
  }




  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form className="pt-3" onSubmit= {this.handleSubmit}>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="text" value={this.state.username} onChange={this.handleUsername} placeholder="Username" size="lg" className="h-auto" />
                    <div > {this.state.usernameErr}</div>
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" value={this.state.password} onChange={this.handlepassowrd} placeholder="Password" size="lg" className="h-auto" />
                    <div> {this.state.passwordErr}</div>
                  </Form.Group>
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"  >SIGN IN</button> 
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-muted">Forgot password?</a>
                  </div>
                  <div className="mb-2">
                    <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                      <i className="mdi mdi-facebook mr-2"></i>Connect using facebook
                    </button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/user-pages/register" className="text-primary">Create</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default Login
