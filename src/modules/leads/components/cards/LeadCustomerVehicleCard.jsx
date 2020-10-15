import React from 'react';
import Card from '../../../../components/Card';
import InfoItem from '../../../../components/InfoItem';
import { combineStrings, formatPrice as _formatPrice } from '../../../../utils';

// Format price with no decimal places and preserve nulls
const formatPrice = v => (v !== null ? _formatPrice(v, '$', true) : v);

const LeadCustomerVehicleCard = ({ lead }) => (
  <Card>
    <Card.Header>Customer's Vehicle</Card.Header>
    <Card.Content>
      <InfoItem
        value={combineStrings(
          lead.form_data.customer_vehicle_year,
          lead.form_data.customer_vehicle_make,
          lead.form_data.customer_vehicle_model,
        )}
        icon="car"
        label="Vehicle Model"
      />
      <InfoItem
        value={lead.form_data.customer_vehicle_trim}
        label="Vehicle Trim"
        icon="info"
      />
      <InfoItem
        value={lead.form_data.customer_vehicle_odometer}
        label="Odometer"
        icon="tachometer"
      />
      <InfoItem
        value={formatPrice(lead.form_data.customer_vehicle_amount_owing)}
        label="Amount Owing"
        icon="money"
      />
    </Card.Content>
  </Card>
);

export default LeadCustomerVehicleCard;
