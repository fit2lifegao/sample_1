import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import compose from 'lodash.flowright';
import { withRouter } from 'react-router-dom';
import { Card, ContextButton } from '../../../components';
import { withLeadActions } from '../graphql/mutations';
import LeadOpportunityPage from './LeadOpportunityPage';

import './Lead.css';

const propTypes = {
  lead: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    customer: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
    created: PropTypes.string.isRequired,
    permissions: PropTypes.shape({
      can_create_or_link_opportunity: PropTypes.bool.isRequired,
      can_archive_lead: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

class Lead extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOpportunityFromLeadDialog: false,
    };
  }
  statusColor = () => {
    const { lead } = this.props;
    if (lead.is_archived) return 'leadArchivedColor';
    if (lead.first_response) return 'leadFirstResponseColor';
    return 'leadColor';
  };
  showDetails = () => this.props.history.push(`/leads/${this.props.lead._id}`);

  archive = () =>
    this.props.archiveLead({ variables: { leadId: this.props.lead._id } });

  startOpportunity = () =>
    this.setState({ showOpportunityFromLeadDialog: true });

  render() {
    const {
      lead,
      lead: {
        permissions: {
          can_create_or_link_opportunity: canCreateOrLinkOpportunity,
          can_archive_lead: canArchiveLead,
        },
        dealer: { lead_setting: canStartOpportunity },
      },
    } = this.props;
    const { showOpportunityFromLeadDialog } = this.state;
    return (
      <Card>
        <Card.Header
          statusColor={this.statusColor()}
          text={lead.typeName}
          onClick={this.showDetails}
        />
        <Card.Content>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="Lead-details">
              <div className="Lead-details--header">
                {`${lead.form_data.first_name} ${lead.form_data.last_name}`}
              </div>
              <div>
                Submitted:{' '}
                {`${moment(lead.created).format('MMM DD, YYYY @ h:mm a')}`}
              </div>
              <div>
                Assignee:{' '}
                {(lead.assigneeNode && lead.assigneeNode.display_name) ||
                  'Unassigned'}
              </div>
              <div>Dealer: {lead.dealer.dealer_name}</div>
              <div>Source: {lead.form_data.lead_source}</div>
              <div>Form: {lead.form_data.form_name}</div>
            </div>
          </div>
        </Card.Content>

        <Card.Buttons>
          <ContextButton onClick={this.showDetails} icon="info" />
          <ContextButton
            onClick={this.startOpportunity}
            disabled={!canCreateOrLinkOpportunity || canStartOpportunity}
            icon="thumbs-up"
          />
          <ContextButton
            onClick={this.archive}
            icon="archive"
            disabled={!canArchiveLead}
          />
        </Card.Buttons>
        <LeadOpportunityPage
          isOpen={showOpportunityFromLeadDialog}
          leadId={lead._id}
          onDismiss={() =>
            this.setState({ showOpportunityFromLeadDialog: false })
          }
        />
      </Card>
    );
  }
}

Lead.propTypes = propTypes;

export default compose(withRouter, withLeadActions)(Lead);
