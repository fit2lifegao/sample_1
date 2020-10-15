import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import compose from 'lodash.flowright';

export const ARCHIVE_LEAD = gql`
  mutation archiveLead($leadId: ID!) {
    archiveLead(_id: $leadId) {
      _id
      is_archived
      archived
    }
  }
`;

export const LOG_RESPONSE = gql`
  mutation logLeadResponse($leadId: ID!, $responseType: String!) {
    logLeadResponse(_id: $leadId, response_type: $responseType) {
      _id
      first_response {
        response_type
        username
        responded
      }
    }
  }
`;

export const SEND_EMAIL_RESPONSE = gql`
  mutation sendLeadEmailResponse(
    $customerId: ID
    $customerEmail: String!
    $dealerId: Int!
    $subject: String!
    $body: String!
  ) {
    sendLeadEmailResponse(
      customer_id: $customerId
      customer_email: $customerEmail
      dealer_id: $dealerId
      subject: $subject
      body: $body
    )
  }
`;

export const ASSIGN_LEAD = gql`
  mutation assignLead($leadId: ID!, $username: String!) {
    assignLead(_id: $leadId, username: $username) {
      _id
      assignee
      assigned
      assigneeNode {
        username
        display_name
      }
    }
  }
`;

export const CREATE_OPPORTUNITY_FOR_LEAD = gql`
  mutation createOpportunityForLead($leadId: String!, $dealerId: Int!) {
    newOpportunity: createOpportunityForLead(
      leadId: $leadId
      input: { dealer_id: $dealerId }
    ) {
      _id
    }
  }
`;

export const LINK_LEAD_TO_OPPORTUNITY = gql`
  mutation linkLeadToOpportunity($leadId: String!, $opportunityId: ID!) {
    linkLeadToOpportunity(_id: $opportunityId, leadId: $leadId) {
      _id
    }
  }
`;

export const withLeadActions = compose(
  graphql(ARCHIVE_LEAD, {
    name: 'archiveLead',
    options: { refetchQueries: ['LeadsList'] },
  }),
  graphql(LOG_RESPONSE, { name: 'logLeadResponse' }),
  graphql(SEND_EMAIL_RESPONSE, { name: 'sendLeadEmailResponse' }),
  graphql(ASSIGN_LEAD, {
    name: 'assignLead',
    options: { refetchQueries: ['LeadsList'] },
  }),
  graphql(CREATE_OPPORTUNITY_FOR_LEAD, { name: 'createOpportunityForLead' }),
  graphql(LINK_LEAD_TO_OPPORTUNITY, { name: 'linkLeadToOpportunity' }),
);
