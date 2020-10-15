import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { withRouter } from 'react-router-dom';
import View from '../../../components/View';
import app from '../../app';
import PageHeader from '../../../components/PageHeader';
import LoadingOverlay from '../../../components/LoadingOverlay';
import SummaryItem from '../../../components/SummaryItem';
import { LEADS_SUMMARY_BY_TYPE } from '../graphql/queries';
import LeadsNotifications from './LeadsNotifications';
import compose from 'lodash.flowright';

class LeadsTypeSummary extends Component {
  getSummaryData() {
    const {
      dealers,
      activeLeads,
      activeLeadsNotReplied,
      newLeads,
    } = this.props.data;
    if (!dealers || !activeLeads || !activeLeadsNotReplied) return [];
    const leadTypes = [
      ...new Set([
        ...activeLeads.facets.type.map(f => f.value),
        ...activeLeadsNotReplied.facets.type.map(f => f.value),
        ...newLeads.facets.type.map(f => f.value),
      ]),
    ];
    return leadTypes
      .sort()
      .map(type => ({ type }))
      .map(leadType => {
        const facet = activeLeads.facets.type.find(
          f => f.value === leadType.type,
        );
        return {
          ...leadType,
          typeName: facet && facet.typeName,
          activeLeads: (facet && facet.total) || 0,
        };
      })
      .map(leadType => {
        const facet = activeLeadsNotReplied.facets.type.find(
          f => f.value === leadType.type,
        );
        return {
          ...leadType,
          typeName: (facet && facet.typeName) || leadType.typeName,
          activeLeadsNotReplied: (facet && facet.total) || 0,
        };
      })
      .map(leadType => {
        const facet = newLeads.facets.type.find(f => f.value === leadType.type);
        return {
          ...leadType,
          typeName: (facet && facet.typeName) || leadType.typeName,
          newLeads: (facet && facet.total) || 0,
        };
      });
  }
  render() {
    const { data, dealerIds, history } = this.props;
    const summaryData = this.getSummaryData();
    const dealerIdsSlug = dealerIds.join(',');
    const dealerNames =
      (data.dealers && data.dealers.map(d => d.dealer_name).join(' / ')) ||
      'loading...';

    return (
      <View
        resetScroll
        Header={
          <div>
            <LeadsNotifications />
          </div>
        }
        footerActions={[
          {
            label: 'By Type',
            active: true,
            icon: 'tag',
          },
          {
            label: 'By Assignee',
            icon: 'user',
            onClick: () =>
              history.push(`/leads/summary/${dealerIdsSlug}/assignees`),
          },
        ]}
      >
        <PageHeader caption={dealerNames} title="Leads Summary" icon="users" />
        <div style={{ position: 'relative' }}>
          <LoadingOverlay showOverlay={data.loading && !summaryData.length} />
          {summaryData.map(leadType => (
            <SummaryItem
              key={leadType.type}
              label={leadType.typeName}
              onClick={() =>
                history.push(
                  `/leads/active/${dealerIdsSlug}/types/${leadType.type}`,
                )
              }
              metrics={[
                { label: 'New Today', value: leadType.newLeads },
                { label: 'Active', value: leadType.activeLeads },
                {
                  label: 'Not Replied',
                  value: leadType.activeLeadsNotReplied,
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
  graphql(LEADS_SUMMARY_BY_TYPE, {
    options: { fetchPolicy: 'cache-and-network' },
  }),
  withRouter,
)(LeadsTypeSummary);
