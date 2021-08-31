import { alphaNumerate } from 'chartist';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

export class Register extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',


      usernameErr: '',
      emailErr: '',
      passwordErr: '',

      message : '',

    }
  }

  handleChangeUsername = (e) => {
    this.setState({username: e.target.value})
  }


  handleChangeEmail = (e) => {
    this.setState({email: e.target.value})
  }

  handleChangePassword = (e) => {
    this.setState({password: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()


    if (this.state.username.length < 6){
      this.setState({
        usernameErr: "Minimum 6 characters needed!"
      })
      return
    }else{
      this.setState({
        usernameErr: ""
      })
    }

   let user = { 
      username : this.state.username,
      _id : this.state.email,
      password : this.state.password
    }

    axios.post("http://localhost:8080/register", user)
    .then(response => {
      console.log(response.data.res)
      this.setState({message:response.data.res})
    })
  }



  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0 h-100">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo.svg")} alt="logo" />
                </div>
                <h4>New here?</h4>
                <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                <form className="pt-3" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input type="text" value={this.state.username} name={this.state.username} onChange={this.handleChangeUsername} className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Username" />
                    <div> {this.state.usernameErr} </div>
                  </div>                  
                  <div className="form-group">
                    <input type="email"  value={this.state.email} name={this.state.email}  onChange={this.handleChangeEmail} className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <select className="form-control form-control-lg" id="exampleFormControlSelect2">
                      <option>Country</option>
                      <option>United States of America</option>
                      <option>United Kingdom</option>
                      <option>India</option>
                      <option>Germany</option>
                      <option>Argentina</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input type="password" value={this.state.password} name={this.state.password}  onChange={this.handleChangePassword} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" />
                  </div>
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        I agree to all Terms & Conditions
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</button>
                  </div>
                  <div> {this.state.message}</div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/user-pages/login" className="text-primary">Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
