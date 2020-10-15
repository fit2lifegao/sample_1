import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import { CloudinaryContext } from 'cloudinary-react';

import '@fortawesome/fontawesome-pro/css/all.min.css';
import '@fortawesome/fontawesome-pro/css/v4-shims.min.css';

import appraisals from './modules/appraisals';
import sms from './modules/sms';
import app from './modules/app';
import deallog from './modules/deallog';
import opportunities from './modules/opportunities';
import View from './components/View';
import auctions from './modules/auctions';
import leads from './modules/leads';
import tasks from './modules/tasks';
import rotracker from './modules/rotracker';

import { theme, muiTheme } from './theme';

import { cloudinaryConfig } from './constants';

import './styles.css';

const {
  ErrorBar,
  ErrorPage,
  Login,
  Logout,
  LandingPage,
  PrivateRoute,
  NotFound404,
  withWindowEvents,
  MaintenancePage,
} = app.components;
const { Appraisals } = appraisals.components;
const { SMS } = sms.components;
const { DealLog } = deallog.components;
const { Opportunities } = opportunities.components;
const { Auctions } = auctions.components;
const { Leads } = leads.components;
const { Tasks } = tasks.components;
const { ROTracker } = rotracker.components;

const maintenance_mode = process.env.REACT_APP_MAINTENANCE;

const DecoratedView = withWindowEvents(View);

class App extends Component {
  render() {
    return (
      <div className="App-container">
        <ThemeProvider theme={theme}>
          <MUIThemeProvider theme={muiTheme}>
            <SnackbarProvider maxSnack={3}>
              <CloudinaryContext cloudName={cloudinaryConfig.cloud_name}>
                <Switch>
                  {maintenance_mode === 'true' && (
                    <Route path="*" component={MaintenancePage} status={503} />
                  )}
                  <Redirect exact from="/" to="/home" />
                  <Route path="/login" component={Login} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/403" component={ErrorPage} />
                  <Route path="/404" component={NotFound404} />
                  <PrivateRoute path="/home" component={LandingPage} />
                  {/* <PrivateRoute path="/appraisals" component={Appraisals} /> */}
                  <PrivateRoute path="/sms" component={SMS} />
                  <PrivateRoute path="/deallog" component={DealLog} />
                  <PrivateRoute path="/crm/tasks" component={Tasks} />
                  <PrivateRoute path="/crm" component={Opportunities} />
                  <PrivateRoute path="/auctions" component={Auctions} />
                  <PrivateRoute path="/leads" component={Leads} />
                  <PrivateRoute path="/rotracker" component={ROTracker} />
                  <PrivateRoute component={NotFound404} />
                </Switch>
              </CloudinaryContext>
            </SnackbarProvider>
          </MUIThemeProvider>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
