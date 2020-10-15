import React from 'react';
import Card from '../../../../components/Card';

const LeadMessageCard = ({ lead }) => (
  <Card>
    <Card.Header>Message</Card.Header>
    <Card.Content>
      <div
        style={{
          overflow: 'hidden',
          whiteSpace: 'pre-line',
        }}
      >
        {lead.form_data.message}
      </div>
    </Card.Content>
  </Card>
);

export default LeadMessageCard;
