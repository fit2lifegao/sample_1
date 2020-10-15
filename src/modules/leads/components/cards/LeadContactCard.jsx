import React from 'react';
import Card from '../../../../components/Card';
import InfoItem from '../../../../components/InfoItem';

const LeadContactCard = ({ lead }) => (
  <Card>
    <Card.Header>Contact</Card.Header>
    <Card.Content>
      <InfoItem
        value={`${lead.form_data.first_name} ${lead.form_data.last_name}`}
        icon="user"
        label="Name"
      />
      <InfoItem
        value={lead.form_data.casl_opt_in ? 'Opt In' : 'Opt Out'}
        icon={lead.form_data.casl_opt_in ? 'circle-check' : 'ban'}
        label="CASL"
      />
      <InfoItem
        value={lead.form_data.preferred_contact_method}
        icon="bullhorn"
        label="Preferred Contact Method"
      />
      <InfoItem value={lead.form_data.email} icon="at" label="Email" />
      <InfoItem
        value={lead.form_data.primary_phone}
        icon="phone"
        label="Primary Phone"
      />
      <InfoItem
        value={lead.form_data.street_address_1}
        icon="map-pin"
        label="Address"
      />
      <InfoItem value={lead.form_data.city} icon="building" label="City" />
      <InfoItem value={lead.form_data.province} icon="globe" label="Province" />
      <InfoItem
        value={lead.form_data.postal_code}
        icon="envelope"
        label="Postal Code"
      />
    </Card.Content>
  </Card>
);

export default LeadContactCard;
