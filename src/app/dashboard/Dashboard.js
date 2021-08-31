import React, { Component } from 'react';
import {Line, Bar, Doughnut, Pie, Scatter} from 'react-chartjs-2';
import axios from 'axios';
import Constants from '../util/Constants';

export class Dashboard extends Component {

  constructor(props){
    super(props);

    this.state = {
      jobs: [],
      profitdata: [],
      profit: 0,
      loss: 0,
    }
    
}


componentDidMount(){
  this.getRefresh()
}

getRefresh(){
  axios.get(Constants.HOSTNAME+'/getallorders')
  .then(res => {
      console.log(res.data)
      const jobs = res.data.result;
      this.setState({ jobs });
      this.state.jobs.map(job => 
        (job.profit > 0) ? 
          (this.setState({profit: this.state.profit+job.profit})):
          (this.setState({loss: this.state.loss+job.profit}))
        )

      this.setState({profitdata: {
        datasets: [{
          data: [this.state.loss, this.state.profit],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
        }],    
        labels: [
          'Loss',
          'Profit',
        ]
      }})

  })
}

  render () {
    return (
      <div className="center">        
        <div className="col-md-10 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Profit Chart</h4>
                    <Doughnut data={this.state.profitdata} />
                </div>
            </div>
        </div>
          <div className="col-lg-10 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Orders</h4>
                <p className="card-description"> All Orders </p>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Symbol</th>
                        <th>Interval</th>
                        <th>Action</th>
                        <th>Base Buy</th>
                        <th>Base Sell</th>
                        <th>Buy Amount</th>
                        <th>Sell Amount</th>
                        <th>Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                       { 
                            this.state.jobs.map(job => 
                                <tr>
                                    <td> {job.symbol} </td>
                                    <td> {job.interval} </td>
                                    {
                                      (job.action === 'Completed') ?
                                      (<td className="text-warning">  {job.action} </td>) :
                                      (<td className="text-secondary">  {job.action} </td>)
                                    }
                                    <td> {job.buy_base} </td>
                                    <td> {job.sell_base} </td>
                                    <td> {job.buy_amt} </td>
                                    <td> {job.sell_amt} </td>
                                    {
                                      (job.profit > 0) ? 
                                        (<td className="text-success">  {job.profit} </td>) :
                                        (<td className="text-danger">  {job.profit} </td>)
                                    }
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
    );
  }
}

export default Dashboard;