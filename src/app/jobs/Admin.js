import React, { Component } from 'react'
import axios from 'axios';
import Constants from '../util/Constants';

export default class Admin extends Component {

    constructor(props){
        super(props);
        this.state = {
            result: ''
        }
    }

    runAllAngel = (e) =>{
        axios.get(Constants.HOSTNAME+'/run-angel')
        .then(res => {
            this.setState({ result: res.data.res });
        })
    }

    runAllBinance = (e) =>{
        axios.get(Constants.HOSTNAME+'/run-binance')
        .then(res => {
            this.setState({ result: res.data.res });
        })
    }

    stopAllAngel = (e) =>{
        axios.get(Constants.HOSTNAME+'/stop-angel')
        .then(res => {
            this.setState({ result: res.data.res });
        })
    }

    stopAllBinance = (e) =>{
        axios.get(Constants.HOSTNAME+'/stop-binance')
        .then(res => {
            this.setState({ result: res.data.res });
        })
    }


    render() {
        return (
            <div>
                <div className="card-body">
                    <h4 className="card-title">Job Admin</h4>
                    <div className="template-demo">
                    <button type="button"  onClick={this.runAllAngel}  className="btn btn-inverse-primary btn-fw">Run All Angel Jobs</button>                 
                    </div>
                    <div className="template-demo">
                        <button type="button" onClick={this.stopAllAngel} className="btn btn-inverse-danger btn-fw">Stop All Angel Jobs</button>         
                    </div>

                    <div className="template-demo">
                    <button type="button"  onClick={this.runAllBinance} className="btn btn-inverse-primary btn-fw">Run All Binance Jobs</button>                 
                    </div>                
                    <div className="template-demo">
                        <button type="button"  onClick={this.stopAllBinance} className="btn btn-inverse-danger btn-fw">Stop All Binance Jobs</button>         
                    </div>
                 
              </div>
                <div className="spinner-wrapper">
                    <div className="donut">{this.state.result}</div>
                </div>
            </div>
        )
    }
}
