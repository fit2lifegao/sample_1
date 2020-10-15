import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from '@apollo/react-hoc';
import compose from 'lodash.flowright';
import { TextField, Button } from 'office-ui-fabric-react';
import { withRouter } from 'react-router-dom';
import { withLeadActions } from '../graphql/mutations';
import SectionHeader from '../../../components/SectionHeader';
import { getCurrentUser } from '../../app/selectors';
import { USER_PROFILE_QUERY } from '../../users/graphql/queries';

class LeadEmailResponder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      messageSubject: '',
    };
  }

  sendResponse = () => {
    const {
      lead,
      logLeadResponse,
      sendLeadEmailResponse,
      onComplete,
    } = this.props;
    const { messageText, messageSubject } = this.state;
    const emailVars = {
      customerId: lead.customer._id,
      customerEmail: lead.form_data.email,
      dealerId: lead.dealer_id,
      subject: messageSubject,
      body: messageText,
    };
    sendLeadEmailResponse({ variables: emailVars });
    logLeadResponse({ variables: { leadId: lead._id, responseType: 'sms' } });
    onComplete();
  };

  render() {
    const {
      lead,
      data: { user, loading, error },
    } = this.props;
    const { messageSubject, messageText } = this.state;

    if (loading) return <div />;
    if (error) return <div>Something went wrong</div>;
    return (
      <div>
        <SectionHeader>Respond via Email</SectionHeader>
        <TextField label="To:" value={lead.form_data.email} disabled />
        <TextField label="From:" value={user.profile.email_address} disabled />
        <TextField
          label="Subject"
          value={messageSubject}
          onChanged={val => this.setState({ messageSubject: val })}
        />
        <TextField
          label="Message"
          value={messageText}
          multiline
          onChanged={val => this.setState({ messageText: val })}
        />
        <Button onClick={this.sendResponse}>Send</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
});

export default compose(
  connect(mapStateToProps),
  withRouter,
  withLeadActions,
  graphql(USER_PROFILE_QUERY, {
    options: ownProps => ({
      variables: { username: ownProps.currentUser.username },
      fetchPolicy: 'cache-and-network',
    }),
  }),
)(LeadEmailResponder);
