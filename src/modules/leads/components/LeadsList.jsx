import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from '@apollo/react-hoc';
import compose from 'lodash.flowright';

import LoadingOverlay from '../../../components/LoadingOverlay';
import View from '../../../components/View';
import Card from '../../../components/Card';
import Stage from '../../../components/Stage';
import app from '../../app';
import { LIST_LEADS } from '../graphql/queries';
import Lead from './Lead';
import LeadsNotifications from './LeadsNotifications';

class LeadsList extends Component {
  render() {
    const { data, history } = this.props;
    if (!data.leads) {
      return (
        <View
          resetScroll
          footerActions={[
            { onClick: history.goBack, icon: 'chevron-left', label: 'Back' },
          ]}
        >
          <div style={{ position: 'relative' }}>
            <LoadingOverlay showOverlay />
          </div>
        </View>
      );
    }
    return (
      <View
        Header={
          <div>
            <LeadsNotifications />
          </div>
        }
        footerActions={[
          { onClick: history.goBack, icon: 'chevron-left', label: 'Back' },
        ]}
      >
        <Stage>
          {data.leads.results.length === 0 ? (
            <Card empty>
              <Card.Content>
                <div style={{ textAlign: 'center', fontSize: '1.5em' }}>
                  Nothing to see here.
                </div>
              </Card.Content>
            </Card>
          ) : (
            <div>
              {data.leads.results.map(lead => (
                <Lead lead={lead} key={lead._id} />
              ))}
            </div>
          )}
        </Stage>
      </View>
    );
  }
}

export default compose(
  withRouter,
  graphql(LIST_LEADS, {
    options: { fetchPolicy: 'cache-and-network' },
  }),
)(LeadsList);
