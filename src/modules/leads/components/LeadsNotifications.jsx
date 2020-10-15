import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NAME } from '../constants';
import app from '../../app';

const { Notifications } = app.components;

class LeadsNotifications extends Component {
  render() {
    return <Notifications {...this.props} />;
  }
}

const mapStateToProps = state => ({
  notifications: app.selectors.getNotifications(state, NAME),
});

export default connect(mapStateToProps)(LeadsNotifications);
