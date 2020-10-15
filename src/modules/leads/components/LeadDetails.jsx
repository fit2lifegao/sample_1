import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from '@apollo/react-hoc';
import compose from 'lodash.flowright';

import Modal from '../../../components/Modal';
import PageHeader from '../../../components/PageHeader';
import ActionMenu from '../../../components/ActionMenu';
import LoadingOverlay from '../../../components/LoadingOverlay';
import app from '../../app';
import View from '../../../components/View';
import UserPickerSlideOut from '../../users/components/UserPickerSlideOut';
import Stage from '../../../components/Stage';

import {
  LeadContactCard,
  LeadCustomerVehicleCard,
  LeadDetailsCard,
  LeadInterestedVehicleCard,
  LeadMessageCard,
} from './cards';
import { withLeadActions } from '../graphql/mutations';
import { GET_LEAD } from '../graphql/queries';
import LeadResponder from './LeadResponder';
import LeadOpportunityPage from './LeadOpportunityPage';
import LeadsNotifications from './LeadsNotifications';

class LeadDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showActionDialog: false,
      showResponderDialog: false,
      showAssignmentDialog: false,
      showOpportunityFromLeadDialog: false,
    };
  }

  hideActionDialog = () =>
    this.setState({
      showActionDialog: false,
    });

  showActionDialog = () =>
    this.setState({
      showActionDialog: true,
    });

  closesActionDialog = f => (...args) =>
    Promise.resolve(f(...args))
      .then(this.hideActionDialog)
      .catch(this.hideActionDialog);

  hideResponderDialog = () =>
    this.setState({
      showResponderDialog: false,
    });

  showResponderDialog = () =>
    this.setState({
      showResponderDialog: true,
    });

  showAssignmentDialog = () =>
    this.setState({
      showAssignmentDialog: true,
    });

  hideAssignmentDialog = () =>
    this.setState({
      showAssignmentDialog: false,
    });

  showOpportunityFromLeadDialog = () =>
    this.setState({
      showOpportunityFromLeadDialog: true,
    });

  hideOpportunityFromLeadDialog = () =>
    this.setState({
      showOpportunityFromLeadDialog: false,
    });

  assignLead = username => {
    const {
      assignLead,
      data: {
        lead: { _id: leadId },
      },
    } = this.props;
    assignLead({
      variables: {
        leadId,
        username,
      },
    });
    this.hideAssignmentDialog();
  };

  render() {
    const { data, history, archiveLead } = this.props;
    const {
      showActionDialog,
      showResponderDialog,
      showAssignmentDialog,
      showOpportunityFromLeadDialog,
    } = this.state;
    const lead = data.lead;
    const isAutoOppsEnabled = lead
      ? lead.dealer.desking_settings.lead_setting
      : false;
    if (data.loading && !lead) {
      return (
        <View
          footerActions={[
            { onClick: history.goBack, icon: 'chevron-left', label: 'Back' },
          ]}
        >
          <div style={{ position: 'relative' }}>
            <LoadingOverlay showOverlay />
          </div>
        </View>
      );
    }
    if (!lead) {
      return (
        <div>
          <LeadsNotifications />
          Not Found
        </div>
      );
    }
    return (
      <View
        Header={
          <div>
            <LeadsNotifications />
          </div>
        }
        footerActions={[
          { onClick: history.goBack, icon: 'chevron-left', label: 'Back' },
        ]}
      >
        <PageHeader
          title={`${lead.form_data.first_name} ${lead.form_data.last_name}`}
          caption={`${lead.typeName} Lead`}
          icon="user-circle"
          menuAction={this.showActionDialog}
        />
        <Stage>
          <LeadMessageCard lead={lead} />
          <LeadDetailsCard lead={lead} />
          <LeadInterestedVehicleCard lead={lead} />
          <LeadCustomerVehicleCard lead={lead} />
          <LeadContactCard lead={lead} />
        </Stage>
        <Modal isOpen={showActionDialog} onDismiss={this.hideActionDialog}>
          <ActionMenu>
            <ActionMenu.Button
              disabled={!lead.permissions.can_assign_lead}
              label="Assign lead"
              icon="user-check"
              onClick={this.closesActionDialog(this.showAssignmentDialog)}
            />
            <ActionMenu.Button
              label="Respond to customer"
              icon="reply"
              onClick={this.closesActionDialog(this.showResponderDialog)}
            />
            <ActionMenu.Button
              disabled={
                !lead.permissions.can_create_or_link_opportunity ||
                isAutoOppsEnabled
              }
              label="Start opportunity"
              icon="thumbs-up"
              onClick={this.closesActionDialog(
                this.showOpportunityFromLeadDialog,
              )}
            />
            <ActionMenu.Button
              label="Go to customer profile"
              icon="user"
              onClick={() =>
                alert('Customer profiles not yet available on mobile')
              }
            />
            <ActionMenu.Button
              disabled={!lead.permissions.can_archive_lead}
              label="Archive"
              icon="archive"
              onClick={this.closesActionDialog(() =>
                archiveLead({ variables: { leadId: lead._id } }),
              )}
            />
          </ActionMenu>
        </Modal>
        <Modal
          isOpen={showResponderDialog}
          onDismiss={this.hideResponderDialog}
        >
          <LeadResponder lead={lead} onComplete={this.hideResponderDialog} />
        </Modal>
        <UserPickerSlideOut
          isOpen={showAssignmentDialog}
          onCancel={this.hideAssignmentDialog}
          dealerIds={[lead.dealer_id]}
          onSelect={username => this.assignLead(username)}
        />
        <LeadOpportunityPage
          isOpen={showOpportunityFromLeadDialog}
          leadId={lead._id}
          onDismiss={this.hideOpportunityFromLeadDialog}
        />
      </View>
    );
  }
}

export default compose(
  graphql(GET_LEAD, {
    options: { fetchPolicy: 'cache-and-network' },
  }),
  withRouter,
  withLeadActions,
)(LeadDetails);
