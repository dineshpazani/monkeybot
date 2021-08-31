import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Constants from '../util/Constants';

export class AddJobs extends Component {


    constructor(props){
        super(props);

        this.state = {
          jobs: [],
          _id: '',
          symbol: '',
          coin: '',
          qty: '',
          interval: '1m',
          username: 'dineshpazanee@gmail.com',
          is_active: 'active',
          broker: props.broker
        }
    }

    componentDidMount(){
      this.getRefresh()
    }

    getRefresh(){
      axios.get(Constants.HOSTNAME+'/getjobs/'+this.state.broker)
      .then(res => {
          console.log(res.data)
          const jobs = res.data.result;
          this.setState({ jobs });
      })
    }


    handleRun = (parameter, event) => {
      event.preventDefault()
      const params = {
        _id : parameter._id,
        is_active : true
      }

      axios.post(Constants.HOSTNAME+'/jobs/update', params)
      .then(res => {
        this.getRefresh() 
      })      
     
    }

    handlePause = (parameter, event) => {
      event.preventDefault()
      const params = {
        _id : parameter._id,
        is_active : false
      }

      axios.post(Constants.HOSTNAME+'/jobs/update', params)
      .then(res => {
        this.getRefresh() 
      })      
    }

    handleDelete = (parameter, event) => {
      event.preventDefault()
      console.log(parameter)
      console.log(event)

      const params = {
        _id : parameter._id
      }

      axios.post(Constants.HOSTNAME+'/jobs/delete', params)
      .then(res => {
        console.log(res.data)
        this.getRefresh() 
      })      
    }

    handleEdit = (parameter, event) => {
      event.preventDefault()
      this.setState({
        _id: parameter._id,
        symbol: parameter.symbol,
        coin: parameter.coin,
        qty: parameter.qty,
        interval: parameter.interval,
      })
    }
    
    

    handleSaveJobs = (event) => {
      event.preventDefault() 
      let params = null;
      if(this.state._id == ''){
        params = {
          symbol: this.state.symbol,
          coin: this.state.coin,
          is_active : this.state.is_active,
          qty: this.state.qty,
          interval: this.state.interval,
          username: this.state.username,
          is_active: this.validActiveJobs(this.state.is_active),
          broker: this.state.broker
        }
        let jobs ={
          _id: this.state._id,
          params: params
  
        }
        axios.post(Constants.HOSTNAME+'/add-tasks', jobs)
        .then(res => {
          this.getRefresh() 
        }) 
      }else{
        params = {          
          symbol: this.state.symbol,
          coin: this.state.coin,
          is_active : this.state.is_active,
          qty: this.state.qty,
          interval: this.state.interval,
          username: this.state.username,
          is_active: this.validActiveJobs(this.state.is_active),
          broker: this.state.broker
        }
        let jobs ={
          _id: this.state._id,
          params: params
  
        }
        axios.post(Constants.HOSTNAME+'/update-tasks', jobs)
        .then(res => {
          this.getRefresh() 
        }) 
      } 
    }

    validActiveJobs(val){
      if(val == "active"){
        return true
      }
      return false
    }
    clearForm = (event) => {
      event.preventDefault()
      this.setState({
        _id: '',
        symbol: '',
        coin: '',
        qty: 1,
        interval: "1m",
      })
    }

    render() {
        return (
            <div>
            <div className="col-md-10 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Binance Job</h4>
                <p className="card-description">Add Binance Job </p>
                <form className="forms-sample" onSubmit={this.handleSaveJobs} >
                  <Form.Group>
                    <label htmlFor="symbol">Symbol</label>
                    <Form.Control type="text" value={this.state.symbol} id="symbol" onChange={e => this.setState({symbol: e.target.value}) }placeholder="Symbol" />                    
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="coin">Token</label>
                    <Form.Control type="text"  value={this.state.coin} className="form-control" id="coin" onChange={e => this.setState({coin: e.target.value}) } placeholder="Token" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="qty">Quantity</label>
                    <Form.Control type="number" value={this.state.qty} className="form-control" id="qty" onChange={e => this.setState({qty: e.target.value}) } placeholder="Quantity" />
                  </Form.Group>
                  <Form.Group>
                    <label htmlFor="interval">Interval</label>
                    <div className="form-group">
                    <select className="form-control form-control-lg" value={this.state.interval} onChange={e => this.setState({interval: e.target.value}) }>
                      <option>1m</option>
                      <option>3m</option>
                      <option>5m</option>
                      <option>15m</option>
                      <option>30m</option>
                      <option>1h</option>
                      <option>1d</option>
                    </select>
                  </div>
                  </Form.Group>
                  
                  <Form.Group>
                    <label htmlFor="interval">Status</label>
                    <div className="form-group">
                    <select className="form-control form-control-lg" value={this.state.is_active} onChange={e => this.setState({is_active: e.target.value}) }>
                      <option>Active</option>
                      <option>InActive</option>
                    </select>
                  </div>
                  </Form.Group>
                 
                  <button type="submit" className="btn btn-primary mr-2">Submit</button>
                  <button className="btn btn-dark"onClick={this.clearForm} >Cancel</button>
                </form>
              </div>
            </div>
          </div>

            <div className="col-lg-10 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Angel Jobs</h4>
                <p className="card-description"> Job List </p>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Symbol</th>
                        <th>Token</th>
                        <th>Quantity</th>
                        <th>Interval</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                       { 
                            this.state.jobs.map(job => 
                                <tr>
                                    <td> {job.symbol} </td>
                                    <td> {job.coin} </td>
                                    <td> {job.qty} </td>
                                    <td> {job.interval} </td>
                                    {job.is_active ? (
                                        <td className="text-success">  Running </td>
                                    ) : (
                                        <td className="text-danger"> Stopped </td>
                                    )}                                    
                                    <td>
                                      <span className="col-sm-6 col-md-4 col-lg-3">
                                        <a href="!#" onClick={this.handleEdit.bind(this, job)} className="mdi mdi-pen">  </a> 
                                      </span>
                                      <span className="col-sm-6 col-md-4 col-lg-3">
                                        <a href="!#" onClick={this.handleRun.bind(this, job)} className="mdi mdi-reload"></a> 
                                      </span>
                                      <span className="col-sm-6 col-md-4 col-lg-3">
                                        <a href="!#" onClick={this.handlePause.bind(this, job)} className="mdi mdi-pause-octagon"></a> 
                                      </span>
                                      <span className="col-sm-6 col-md-4 col-lg-3">
                                        <a href="!#" onClick={this.handleDelete.bind(this, job)} className="mdi mdi-close"></a> 
                                      </span>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
    }
}

export default AddJobs
