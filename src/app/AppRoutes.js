import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Angel = lazy(() => import('./jobs/Angel'));
const Binance = lazy(() => import('./jobs/Binance'));
const Admin = lazy(() => import('./jobs/Admin'));
const Chart = lazy(() => import('./charts/ChartJs'));

const Dropdown = lazy(() => import('./basic-ui/Dropdowns'));
const Icons = lazy(() => import('./icons/Mdi'));



class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <Route exact path="/dashboard" component={ Dashboard } />
          <Route exact broker="angel" path="/angel" component={ Angel } />
          <Route exact broker="binance" path="/binance" component={ Binance } />
          <Route exact broker="admin" path="/admin" component={ Admin } />
          
          <Route exact path="/dropdown" component={ Dropdown } />
          <Route exact path="/icons" component={ Icons } />
          <Route exact path="/chart" component={ Chart } />

          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
