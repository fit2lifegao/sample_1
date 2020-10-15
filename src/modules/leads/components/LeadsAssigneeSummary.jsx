import React, { Component } from 'react';
import { graphql } from '@apollo/react-hoc';
import { withRouter } from 'react-router-dom';
import View from '../../../components/View';
import app from '../../app';
import SummaryItem from '../../../components/SummaryItem';
import PageHeader from '../../../components/PageHeader';
import LoadingOverlay from '../../../components/LoadingOverlay';
import compose from 'lodash.flowright';

import { LEADS_SUMMARY_BY_ASSIGNEE } from '../graphql/queries';

class LeadsAssigneeSummary extends Component {
  getSummaryData() {
    const {
      dealers,
      activeLeads,
      activeLeadsNotReplied,
      newLeads,
    } = this.props.data;
    if (!dealers || !activeLeads || !activeLeadsNotReplied) return [];
    const assignees = [
      ...new Set([
        ...activeLeads.facets.assignee.map(f => f.value),
        ...activeLeadsNotReplied.facets.assignee.map(f => f.value),
        ...newLeads.facets.assignee.map(f => f.value),
      ]),
    ];
    return assignees
      .sort((a, b) =>
        a === b ? 0 : a === null ? -1 : b === null ? 1 : a > b ? 1 : -1,
      )
      .map(assignee => ({ username: assignee }))
      .map(assignee => {
        const facet = activeLeads.facets.assignee.find(
          f => f.value === assignee.username,
        );
        return {
          ...assignee,
          user: (facet && facet.user) || assignee.user,
          activeLeads: (facet && facet.total) || 0,
        };
      })
      .map(assignee => {
        const facet = activeLeadsNotReplied.facets.assignee.find(
          f => f.value === assignee.username,
        );
        return {
          ...assignee,
          user: (facet && facet.user) || assignee.user,
          activeLeadsNotReplied: (facet && facet.total) || 0,
        };
      })
      .map(assignee => {
        const facet = newLeads.facets.assignee.find(
          f => f.value === assignee.username,
        );
        return {
          ...assignee,
          user: (facet && facet.user) || assignee.user,
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
        footerActions={[
          {
            label: 'By Type',
            icon: 'tag',
            onClick: () =>
              history.push(`/leads/summary/${dealerIdsSlug}/types`),
          },
          { label: 'By Assignee', active: true, icon: 'user' },
        ]}
      >
        <PageHeader caption={dealerNames} title="Leads Summary" icon="users" />
        <div style={{ position: 'relative' }}>
          <LoadingOverlay showOverlay={data.loading && !summaryData.length} />
          {summaryData.map(assignee => (
            <SummaryItem
              key={assignee.username}
              label={
                (assignee.user && assignee.user.display_name) || 'Unassigned'
              }
              onClick={() =>
                history.push(
                  `/leads/active/${dealerIdsSlug}/assignees/${assignee.username}`,
                )
              }
              metrics={[
                { label: 'New Today', value: assignee.newLeads },
                { label: 'Active', value: assignee.activeLeads },
                {
                  label: 'Not Replied',
                  value: assignee.activeLeadsNotReplied,
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
  graphql(LEADS_SUMMARY_BY_ASSIGNEE, {
    options: { fetchPolicy: 'cache-and-network' },
  }),
  withRouter,
)(LeadsAssigneeSummary);
