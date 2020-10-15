import React from 'react';
import moment from 'moment';
import Card from '../../../../components/Card';
import InfoItem from '../../../../components/InfoItem';
import { combineStrings } from '../../../../utils';

const LeadDetailsCard = ({ lead }) => (
  <Card>
    <Card.Header>Details</Card.Header>
    <Card.Content>
      <InfoItem value={lead.form_data.lead_source} label="Source" />
      <InfoItem value={lead.form_data.form_name} label="Form" />

      <InfoItem
        value={combineStrings(
          lead.form_data.lead_direction,
          lead.form_data.lead_channel,
        )}
        label="Channel"
      />
      <InfoItem
        value={
          lead.assigneeNode ? lead.assigneeNode.display_name : lead.assignee
        }
        label="Assigned To"
      />
      <InfoItem value={lead.dealer.dealer_name} label="Dealership" />
      <InfoItem
        value={moment(lead.form_data.submitted_timestamp).format('LLLL')}
        label="Submitted"
      />
      <InfoItem
        value={
          lead.first_response &&
          moment(lead.first_response.responded).format('LLLL')
        }
        label="First Response Sent"
      />
      <InfoItem
        value={lead.is_archived ? moment(lead.archived).format('LLLL') : null}
        label="Archived"
      />
    </Card.Content>
  </Card>
);

export default LeadDetailsCard;
