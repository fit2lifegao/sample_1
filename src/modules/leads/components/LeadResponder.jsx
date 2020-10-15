import React, { Component } from 'react';
import ActionMenu from '../../../components/ActionMenu';
import LeadSMSResponder from './LeadSMSResponder';
import LeadEmailResponder from './LeadEmailResponder';
import { withLeadActions } from '../graphql/mutations';
import { isEmpty } from 'underscore';
import './LeadResponder.css';

class LeadResponder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseType: null,
    };
  }

  setsResponseType = val => () => this.setState({ responseType: val });

  leadHasPhone = () =>
    !isEmpty(this.props.lead.form_data) &&
    !isEmpty(this.props.lead.form_data.primary_phone);

  renderMenu = () => (
    <ActionMenu>
      {this.leadHasPhone() && (
        <ActionMenu.Button
          label="Send SMS"
          icon="comment"
          onClick={this.setsResponseType('sms')}
        />
      )}
      <ActionMenu.Button
        label="Send email"
        icon="envelope"
        onClick={this.setsResponseType('email')}
      />
      {this.leadHasPhone() && (
        <ActionMenu.Button
          label="Log phone call"
          icon="phone"
          onClick={() => {
            this.props
              .logLeadResponse({
                variables: {
                  leadId: this.props.lead._id,
                  responseType: 'phone',
                },
              })
              .then(this.props.onComplete)
              .catch(this.props.onComplete);
          }}
        />
      )}
    </ActionMenu>
  );

  renderContent() {
    switch (this.state.responseType) {
      case 'sms':
        return (
          <div className="LeadResponder-container">
            <LeadSMSResponder
              lead={this.props.lead}
              onComplete={this.props.onComplete}
            />
          </div>
        );
      case 'email':
        return (
          <div className="LeadResponder-container">
            <LeadEmailResponder
              lead={this.props.lead}
              onComplete={this.props.onComplete}
            />
          </div>
        );
      case 'phone':
        return <div className="LeadResponder-container">phone</div>;
      default:
        return this.renderMenu();
    }
  }

  render() {
    const { lead } = this.props;
    return (
      <div className="LeadResponder">
        {lead.first_response ? (
          <div className="LeadResponder-container">
            Already responded via: {lead.first_response.response_type}
          </div>
        ) : (
          this.renderContent()
        )}
      </div>
    );
  }
}

export default withLeadActions(LeadResponder);
