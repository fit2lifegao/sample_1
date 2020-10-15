import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllGateways } from '../../sms/selectors';
import { fetchGateways } from '../../sms/actions';
import { SMSApi } from '../../sms/api';
import compose from 'lodash.flowright';
import { Dropdown, TextField, Button } from 'office-ui-fabric-react';
import { withRouter } from 'react-router-dom';
import app from '../../app';
import { withLeadActions } from '../graphql/mutations';
import SectionHeader from '../../../components/SectionHeader';

class LeadSMSResponder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGatewayId: null,
      messageText: '',
    };
  }
  componentDidMount() {
    this.props.fetchGateways();
  }
  onSelectGateway = (event, data) => {
    const selectedGatewayId = Number(event.target.value);
    this.setState({ selectedGatewayId });
  };
  sendResponse = () => {
    const { selectedGatewayId, messageText } = this.state;
    const { token, history, lead, logLeadResponse } = this.props;
    const message = {
      body: messageText,
      sent_to: lead.form_data.primary_phone,
    };
    SMSApi.postToOutbox(token, selectedGatewayId, message).then(r => {
      const conversationId = r.message.conversation_id;
      logLeadResponse({ variables: { leadId: lead._id, responseType: 'sms' } });
      history.push(`/sms/gateways/${selectedGatewayId}/${conversationId}`);
    });
  };
  render() {
    const { gateways, lead } = this.props;
    const { selectedGatewayId, messageText } = this.state;
    const selectedGateway = gateways.find(g => g.id === selectedGatewayId);
    return (
      <div>
        <SectionHeader>Respond via SMS</SectionHeader>
        <TextField label="To" value={lead.form_data.primary_phone} disabled />
        <Dropdown
          label="From"
          className="LeadSMSResponder-Dropdown"
          placeHolder="Select SMS Gateway"
          selectedKey={selectedGatewayId}
          options={gateways.map(g => ({ key: g.id, text: g.name }))}
          onChanged={e => this.setState({ selectedGatewayId: e.key })}
        />
        {selectedGateway && (
          <div>
            <TextField
              label="Message"
              value={messageText}
              multiline
              onChanged={val => this.setState({ messageText: val })}
            />
            <Button onClick={this.sendResponse}>Send</Button>
          </div>
        )}
      </div>
    );
  }
}

export default compose(
  withRouter,
  withLeadActions,
  connect(
    state => ({
      gateways: getAllGateways(state),
      token: app.selectors.getToken(state),
    }),
    {
      fetchGateways,
    },
  ),
)(LeadSMSResponder);
