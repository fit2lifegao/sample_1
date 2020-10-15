import React from 'react';
import Card from '../../../../components/Card';
import InfoItem from '../../../../components/InfoItem';
import { combineStrings, formatPrice as _formatPrice } from '../../../../utils';

// Format price with no decimal places and preserve nulls
const formatPrice = v => (v !== null ? _formatPrice(v, '$', true) : v);

const LeadInterestedVehicleCard = ({ lead }) => (
  <Card>
    <Card.Header>Vehicle of Interest</Card.Header>
    <Card.Content>
      <InfoItem
        value={combineStrings(
          lead.form_data.interested_vehicle_year,
          lead.form_data.interested_vehicle_make,
          lead.form_data.interested_vehicle_model,
        )}
        icon="car"
        label="Vehicle Model"
      />
      <InfoItem
        value={lead.form_data.interested_vehicle_trim}
        label="Vehicle Trim"
        icon="info"
      />
      <InfoItem
        value={lead.form_data.interested_vehicle_vehicle_type}
        label="Stock Type"
        icon="shopping-cart"
      />
      <InfoItem
        value={lead.form_data.interested_vehicle_stock}
        label="Stock #"
        icon="tag"
      />
      <InfoItem
        value={formatPrice(lead.form_data.interested_vehicle_price)}
        label="Price"
        icon="money"
      />
    </Card.Content>
  </Card>
);

export default LeadInterestedVehicleCard;
