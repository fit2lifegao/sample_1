import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { withRouter } from 'react-router-dom';
import compose from 'lodash.flowright';

import SummaryItem from '../../../components/SummaryItem';
import PageHeader from '../../../components/PageHeader';
import LoadingOverlay from '../../../components/LoadingOverlay';
import View from '../../../components/View';
import Container from '@material-ui/core/Container';
import app from '../../app';
import { LEADS_SUMMARY_BY_DEALER } from '../graphql/queries';

class LeadsDealerSummary extends Component {
  render() {
    const {
      data: { dealers, activeLeads, activeLeadsNotReplied, newLeads },
      history,
    } = this.props;
    if (!dealers || !activeLeads || !activeLeadsNotReplied) {
      return (
        <View resetScroll Header={null} Footer={null}>
          <div style={{ position: 'relative' }}>
            <LoadingOverlay showOverlay />
          </div>
        </View>
      );
    }
    const summaryData = dealers
      .slice()
      .sort((a, b) => (a.dealer_name > b.dealer_name ? 1 : -1))
      .map(dealer => {
        const facet = activeLeads.facets.dealer_id.find(
          f => f.value === dealer.dealer_id,
        );
        return {
          ...dealer,
          activeLeads: (facet && facet.total) || 0,
        };
      })
      .map(dealer => {
        const facet = activeLeadsNotReplied.facets.dealer_id.find(
          f => f.value === dealer.dealer_id,
        );
        return {
          ...dealer,
          activeLeadsNotReplied: (facet && facet.total) || 0,
        };
      })
      .map(dealer => {
        const facet = newLeads.facets.dealer_id.find(
          f => f.value === dealer.dealer_id,
        );
        return {
          ...dealer,
          newLeads: (facet && facet.total) || 0,
        };
      });

    return (
      <View resetScroll Footer={null}>
        <PageHeader caption="All Dealers" title="Leads Summary" icon="users" />
        <div>
          {summaryData.map(dealer => (
            <SummaryItem
              key={dealer.dealer_id}
              onClick={() =>
                history.push(`/leads/summary/${dealer.dealer_id}/types`)
              }
              label={dealer.dealer_name}
              metrics={[
                { label: 'New Today', value: dealer.newLeads },
                { label: 'Active', value: dealer.activeLeads },
                {
                  label: 'Not Replied',
                  value: dealer.activeLeadsNotReplied,
                },
              ]}
            />
          ))}
        </div>
      </View>
    );
  }
}

export default compose(
  graphql(LEADS_SUMMARY_BY_DEALER, {
    options: { fetchPolicy: 'cache-and-network' },
  }),
  withRouter,
)(LeadsDealerSummary);
