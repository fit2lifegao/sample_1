import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import app from '../../app';
import LeadsList from './LeadsList';
import LeadDetails from './LeadDetails';
import LeadsDealerSummary from './LeadsDealerSummary';
import LeadsTypeSummary from './LeadsTypeSummary';
import LeadsAssigneeSummary from './LeadsAssigneeSummary';

const SHOW_SUMMARY_TO = [
  'internet_sales_rep',
  'sales_manager',
  'bdc_manager',
  'general_manager',
  'organization_admin',
];

class Leads extends Component {
  render() {
    const { match, currentUser } = this.props;

    return (
      <app.components.Layout>
        <Switch>
          <Route
            exact
            path={`${match.url}/summary`}
            render={() => (
              <LeadsDealerSummary dealerIds={currentUser.dealer_ids} />
            )}
          />
          <Route
            exact
            path={`${match.url}/summary/:dealerId/types`}
            render={({ match }) => (
              <LeadsTypeSummary
                dealerIds={[parseInt(match.params.dealerId, 10)]}
              />
            )}
          />
          <Route
            exact
            path={`${match.url}/summary/:dealerId/assignees`}
            render={({ match }) => (
              <LeadsAssigneeSummary
                dealerIds={[parseInt(match.params.dealerId, 10)]}
              />
            )}
          />
          <Route
            exact
            path={`${match.url}/active/:dealerId/types/:leadType`}
            render={({ match }) => (
              <LeadsList
                pageSize={50}
                page={1}
                query={{
                  dealer_id: parseInt(match.params.dealerId, 10),
                  type: match.params.leadType,
                  is_archived: false,
                }}
              />
            )}
          />
          <Route
            exact
            path={`${match.url}/active/:dealerId/assignees/:username`}
            render={({ match }) => (
              <LeadsList
                pageSize={50}
                page={1}
                query={
                  match.params.username === 'null'
                    ? {
                        dealer_id: parseInt(match.params.dealerId, 10),
                        is_archived: false,
                        is_assigned: false,
                      }
                    : {
                        dealer_id: parseInt(match.params.dealerId, 10),
                        assignee: match.params.username,
                        is_archived: false,
                      }
                }
              />
            )}
          />
          <Route
            exact
            path={`${match.url}/active`}
            render={() => (
              <LeadsList
                pageSize={50}
                page={1}
                query={{
                  assignee: currentUser.username,
                  is_archived: false,
                }}
              />
            )}
          />
          <Route
            exact
            path={`${match.url}/:leadId`}
            render={({ match }) => <LeadDetails leadId={match.params.leadId} />}
          />
          <Route
            path={`${match.url}`}
            render={() =>
              SHOW_SUMMARY_TO.includes(currentUser.role) ? (
                <Redirect to={`${match.url}/summary`} />
              ) : (
                <Redirect to={`${match.url}/active`} />
              )
            }
          />
        </Switch>
      </app.components.Layout>
    );
  }
}

export default connect(state => ({
  currentUser: app.selectors.getCurrentUser(state),
}))(Leads);
