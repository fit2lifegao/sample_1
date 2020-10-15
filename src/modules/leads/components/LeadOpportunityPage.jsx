import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from '@apollo/react-hoc';
import { branch, renderComponent, renderNothing } from 'recompose';
import compose from 'lodash.flowright';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withLeadActions } from '../graphql/mutations';
import { GET_LEAD } from '../graphql/queries';
import app from '../../app';
import dealers from '../../dealers';
import {
  NAME,
  CREATE_OPPORTUNITY_SUCCESS_NAME,
  LINK_OPPORTUNITY_TO_LEAD_SUCCESS_NAME,
} from '../../opportunities/constants';
import * as leadConstants from '../constants';
import { notificationTimeout } from '../../../constants';
import {
  ConfirmButton,
  CancelButton,
  Button,
  SlideOutSelectButton,
  LoadingOverlay,
  SlideOut,
  Modal,
} from '../../../components';
import OpportunitySelect from '../../opportunities/components/OpportunitySelect';
import DealerSelectSlideOut from '../../dealers/components/DealerSelectSlideOut';

const StyledConfirmText = styled.div`
  font-size: ${props => props.theme.scale.baseline};
  margin: 1em;
`;

const StyledConfirmTitle = styled.div`
  padding-top: 8em;
  font-size: ${props => props.theme.scale.stepUp1};
  font-weight: ${props => props.theme.fontSemiBold};
  margin: 1em;
`;

const StyledConfirmIcon = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.orange4};
  font-size: ${props => props.theme.scale.stepUp5};
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const StyledConfirmContent = styled.div``;
const StyledSlideOutSelectButton = styled(SlideOutSelectButton)`
  margin-top: 3rem;
  max-width: 100%;
  width: 100%;
`;

const propTypes = {
  clearNotification: PropTypes.func.isRequired,
  createNotification: PropTypes.func.isRequired,
  createLeadNotification: PropTypes.func.isRequired,
  createOpportunityForLead: PropTypes.func.isRequired,
  dealerOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  isMultiDealer: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  leadId: PropTypes.string.isRequired,
  linkLeadToOpportunity: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

class LeadOpportunityPage extends Component {
  constructor(props) {
    super(props);

    // find all the open opportunities for the customer that the current user could assign
    const allowableDealerIDs = this.props.dealerOptions.map(dO =>
      parseInt(dO.key, 10),
    );
    this.openAssignableOpportunities = this.props.data.lead.customer.openOpportunities.filter(
      opp => opp.permissions.can_link_lead,
    );

    this.state = {
      showDealerSelect:
        !this.openAssignableOpportunities.length && this.props.isMultiDealer,
      showConfirm:
        !this.openAssignableOpportunities.length && !this.props.isMultiDealer,
      creating: false,
      linking: false,
    };
  }

  handleCreateOpportunityClick = () => {
    const {
      isMultiDealer,
      data: {
        lead: { dealer_id },
      },
    } = this.props;
    if (isMultiDealer) this.setState({ showDealerSelect: true });
    else this.createOpportunityForDealer(dealer_id);
  };

  handleLinkOpportunityClick = ({ _id: opportunityId, permissions }) => {
    this.setState({ linking: true });
    this.props
      .linkLeadToOpportunity({
        variables: {
          leadId: this.props.data.lead._id,
          opportunityId,
        },
      })
      .then(() => {
        this.props.clearNotification(LINK_OPPORTUNITY_TO_LEAD_SUCCESS_NAME);
        this.props.createNotification(
          LINK_OPPORTUNITY_TO_LEAD_SUCCESS_NAME,
          'Lead Successfully Attached',
          app.constants.NotificationType.SUCCESS,
          true,
          notificationTimeout,
        );
        if (permissions.can_read_details)
          this.props.history.push(`/crm/opportunities/${opportunityId}`);
        else this.props.history.push(`/crm/leads`);
      })
      .catch(({ message }) => {
        this.props.clearNotification(
          leadConstants.LINK_OPPORTUNITY_TO_LEAD_FAILURE_NAME,
        );
        this.props.createLeadNotification(
          leadConstants.LINK_OPPORTUNITY_TO_LEAD_FAILURE_NAME,
          `Failed to attach opportunity (${message})`,
          app.constants.NotificationType.ERROR,
          false,
          0,
        );
      })
      .finally(() =>
        this.setState({ linking: false }, () => this.props.onDismiss()),
      );
  };

  createOpportunityForDealer = dealerId => {
    const {
      createOpportunityForLead,
      data: {
        lead: { _id: leadId },
      },
      history,
      createNotification,
      clearNotification,
    } = this.props;
    this.setState({ creating: true });
    createOpportunityForLead({
      variables: {
        leadId,
        dealerId,
      },
    })
      .then(response => {
        clearNotification(CREATE_OPPORTUNITY_SUCCESS_NAME);

        createNotification(
          CREATE_OPPORTUNITY_SUCCESS_NAME,
          'New Opportunity Started',
          app.constants.NotificationType.SUCCESS,
          true,
          notificationTimeout,
        );
        history.push(`/crm/opportunities/${response.data.newOpportunity._id}`);
      })
      .catch(({ message }) => {
        this.props.clearNotification(
          leadConstants.CREATE_OPPORTUNITY_FROM_LEAD_FAILURE_NAME,
        );
        this.props.createLeadNotification(
          leadConstants.CREATE_OPPORTUNITY_FROM_LEAD_FAILURE_NAME,
          `Failed to create opportunity (${message})`,
          app.constants.NotificationType.ERROR,
          false,
          0,
        );
        this.props.history.goBack();
      })
      .finally(() => this.setState({ creating: false }));
  };

  render() {
    const {
      props: {
        data: { lead, loading },
        dealerOptions,
        onDismiss,
      },
      state: { showDealerSelect, showConfirm, linking, creating },
    } = this;

    if (!loading && !lead) return <div>Could not load lead</div>;

    const { dealer_id } = lead;
    const { lead_setting } = lead ? lead.dealer.desking_settings : false;

    return (
      <div>
        <SlideOut isOpen={creating || linking}>
          <LoadingOverlay
            showOverlay
            label={
              creating ? 'Creating opportunity...' : 'Linking opportunity...'
            }
          />
        </SlideOut>
        <SlideOut isOpen={!showDealerSelect}>
          <SlideOut.Header onClickRightButton={onDismiss}>
            Attach Lead To Opportunity
          </SlideOut.Header>
          <SlideOut.Content>
            <SlideOut.Instructions>
              Attach to an existing opportunity or Start a New Opportunity from
              this Lead
            </SlideOut.Instructions>
            <OpportunitySelect
              opportunities={this.openAssignableOpportunities}
              onClick={this.handleLinkOpportunityClick}
            />
          </SlideOut.Content>
          <SlideOut.Footer>
            <ConfirmButton
              onClick={this.handleCreateOpportunityClick}
              disabled={lead_setting}
            >
              Start New Opportunity
            </ConfirmButton>
          </SlideOut.Footer>
        </SlideOut>
        <DealerSelectSlideOut
          dealerOptions={dealerOptions}
          backButtonText="Attach Lead"
          onClickBack={
            this.openAssignableOpportunities.length
              ? () => this.setState({ showDealerSelect: false })
              : null
          }
          onClick={this.createOpportunityForDealer}
          onCancel={onDismiss}
          isOpen={showDealerSelect}
        />
        <SlideOut isOpen={showConfirm}>
          <SlideOut.Header>New Opportunity</SlideOut.Header>
          <SlideOut.Content>
            <StyledConfirmTitle>
              A new Opportunity will be created from this lead.
            </StyledConfirmTitle>
            <StyledConfirmText>
              Are you sure you want to continue?
            </StyledConfirmText>
            <StyledSlideOutSelectButton
              onClick={() => this.createOpportunityForDealer(dealer_id)}
            >
              Yes, Start New Opportunity
            </StyledSlideOutSelectButton>
          </SlideOut.Content>
          <SlideOut.Footer>
            <CancelButton onClick={onDismiss}>Cancel</CancelButton>
          </SlideOut.Footer>
        </SlideOut>
      </div>
    );
  }
}

LeadOpportunityPage.propTypes = propTypes;

const mapStateToProps = state => ({
  activeDealerId: dealers.selectors.getActiveDealerId(state),
  isMultiDealer: app.selectors.getIsMultiDealer(state),
  dealerOptions: dealers.selectors.getAllowedDealers(state).map(dealer => ({
    key: parseInt(dealer.dealer_id),
    text: dealer.dealer_name,
    ...dealer,
  })),
});

const mapDispatchToProps = dispatch => ({
  createNotification: (id, message, type, isDismissable, timeout) =>
    dispatch(
      app.actions.createNotification(
        id,
        NAME,
        message,
        type,
        isDismissable,
        timeout,
      ),
    ),
  clearNotification: id => dispatch(app.actions.clearNotification(id)),
  createLeadNotification: (id, message, type, isDismissable, timeout) =>
    dispatch(
      app.actions.createNotification(
        id,
        leadConstants.NAME,
        message,
        type,
        isDismissable,
        timeout,
      ),
    ),
});

const NoCustomerComponent = props => (
  <SlideOut>
    <SlideOut.Content>
      <StyledConfirmContent>
        <StyledConfirmTitle>
          <StyledConfirmIcon>
            <i className="fas fa-exclamation-circle" />
          </StyledConfirmIcon>
          Error Starting an Opportunity from This Lead
        </StyledConfirmTitle>
        <StyledConfirmText>
          Lead could not be attached to a customer on record.
        </StyledConfirmText>
      </StyledConfirmContent>
    </SlideOut.Content>
    <SlideOut.Footer>
      <Button fullWidth onClick={props.onDismiss}>
        Close
      </Button>
    </SlideOut.Footer>
  </SlideOut>
);

const renderIfNoCustomer = () =>
  branch(
    props => !props.data.lead.customer,
    renderComponent(NoCustomerComponent),
  );

const renderWhileLoading = (component, propName = 'data') =>
  branch(
    props => props[propName] && props[propName].loading,
    renderComponent(component),
  );

const nothingIfNotOpen = (propName = 'isOpen') =>
  branch(props => !props[propName], renderNothing);

const LoadingComponent = () => (
  <Modal isOpen>
    <LoadingOverlay showOverlay isDarkThemed />
  </Modal>
);

export default compose(
  nothingIfNotOpen(),
  withLeadActions,
  graphql(GET_LEAD, {
    options: { fetchPolicy: 'cache-and-network' },
  }),
  renderWhileLoading(LoadingComponent),
  connect(mapStateToProps, mapDispatchToProps),
  renderIfNoCustomer(),
  withRouter,
)(LeadOpportunityPage);
