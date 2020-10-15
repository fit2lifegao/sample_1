import gql from 'graphql-tag';
import moment from 'moment';
import { Status } from '../../../constants';

export const LEADS_SUMMARY_BY_DEALER = gql`
  query LeadsByDealer($dealerIds: [Int]!) {
    dealers(dealer_ids: $dealerIds) {
      dealer_name
      dealer_id
    }
    activeLeads: leads(
      page_size: 1
      page: 1
      query: { is_archived: false }
      filters: { dealer_id: $dealerIds }
    ) {
      total
      facets {
        dealer_id {
          value
          total
        }
      }
    }
    activeLeadsNotReplied: leads(
      page_size: 1
      page: 1
      query: { is_archived: false, is_responded: false }
      filters: { dealer_id: $dealerIds }
    ) {
      total
      facets {
        dealer_id {
          value
          total
        }
      }
    }
    newLeads: leads(
      page_size: 1
      page: 1
      query: { created: {gte: "${moment()
        .startOf('day')
        .toISOString()}" } }
      filters: { dealer_id: $dealerIds }
    ) {
      total
      facets {
        dealer_id {
          value
          total
        }
      }
    }
  }
`;

export const LEADS_SUMMARY_BY_TYPE = gql`
  query LeadsByType($dealerIds: [Int]!) {
    dealers(dealer_ids: $dealerIds) {
      dealer_name
      dealer_id
    }
    activeLeads: leads(
      page_size: 1
      page: 1
      query: { is_archived: false }
      filters: { dealer_id: $dealerIds, type: [] }
    ) {
      total
      facets {
        type {
          value
          total
          typeName
        }
      }
    }
    activeLeadsNotReplied: leads(
      page_size: 1
      page: 1
      query: { is_archived: false, is_responded: false }
      filters: { dealer_id: $dealerIds, type: [] }
    ) {
      total
      facets {
        type {
          value
          total
          typeName
        }
      }
    }
    newLeads: leads(
      page_size: 1
      page: 1
      query: { created: {gte: "${moment()
        .startOf('day')
        .toISOString()}" } }
      filters: { dealer_id: $dealerIds, type: [] }
    ) {
      total
      facets {
        type {
          value
          total
          typeName
        }
      }
    }
  }
`;

export const LEADS_SUMMARY_BY_ASSIGNEE = gql`
  query LeadsByAssignee($dealerIds: [Int]!) {
    dealers(dealer_ids: $dealerIds) {
      dealer_name
      dealer_id
    }
    activeLeads: leads(
      page_size: 1
      page: 1
      query: { is_archived: false }
      filters: { dealer_id: $dealerIds, assignee: [] }
    ) {
      total
      facets {
        assignee {
          value
          total
          user {
            username
            display_name
          }
        }
      }
    }
    activeLeadsNotReplied: leads(
      page_size: 1
      page: 1
      query: { is_archived: false, is_responded: false }
      filters: { dealer_id: $dealerIds, assignee: [] }
    ) {
      total
      facets {
        assignee {
          value
          total
          user {
            username
            display_name
          }
        }
      }
    }
    newLeads: leads(
      page_size: 1
      page: 1
      query: { created: {gte: "${moment()
        .startOf('day')
        .toISOString()}" } }
      filters: { dealer_id: $dealerIds, assignee: [] }
    ) {
      total
      facets {
        assignee {
          value
          total
          user {
            username
            display_name
          }
        }
      }
    }
  }
`;

export const LIST_LEADS = gql`
  query LeadsList($pageSize: Int, $page: Int, $query: LeadQuery) {
    leads(page_size: $pageSize, page: $page, query: $query) {
      total
      page
      results {
        _id
        strathcom_id
        dealer_id
        created
        is_archived
        typeName
        dealer {
          dealer_name
          desking_settings {
            lead_setting
          }
        }
        assigneeNode {
          username
          display_name
        }
        first_response {
          username
          response_type
          responded
        }
        customer {
          _id
          first_name
          last_name
        }
        form_data {
          lead_type
          first_name
          last_name
          form_name
          lead_source
        }
        permissions {
          can_create_or_link_opportunity
          can_assign_lead
          can_archive_lead
        }
      }
    }
  }
`;

export const GET_LEAD = gql`
  query GetLead($leadId: ID) {
    lead(_id: $leadId) {
      _id
      strathcom_id
      is_archived
      archived
      created
      typeName
      dealer_id
      first_response {
        response_type
        username
        responded
      }
      assigneeNode {
        display_name
      }
      customer {
        _id
        first_name
        last_name
        openOpportunities: opportunities(statuses: [${[...Status.OPEN_OPPS]}]) {
          _id
          created
          status_display
          dealer {
            dealer_id
            dealer_name
          }
          sales_rep_usernames
          sales_manager_usernames
          bdc_rep_usernames
          finance_manager_usernames
          permissions {
            can_add_opportunity_attachment
            can_assign_bdc_rep
            can_assign_salesperson
            can_assign_user
            can_delete_opportunity_attachment
            can_edit_deal_number
            can_edit_finance_checklist
            can_link_lead
            can_read_details
            can_update_carryover_date
          }
        }
      }
      dealer {
        dealer_name
        desking_settings {
          lead_setting
        }
      }
      form_data {
        submitted_timestamp
        casl_opt_in
        city
        customer_vehicle_amount_owing
        customer_vehicle_apr
        customer_vehicle_make
        customer_vehicle_model
        customer_vehicle_monthly_payment
        customer_vehicle_odometer
        customer_vehicle_trim
        customer_vehicle_year
        email
        first_name
        form_name
        interested_vehicle_make
        interested_vehicle_model
        interested_vehicle_odometer
        interested_vehicle_price
        interested_vehicle_stock
        interested_vehicle_trim
        interested_vehicle_vehicle_type
        interested_vehicle_vin
        interested_vehicle_year
        last_name
        lead_channel
        lead_direction
        lead_source
        lead_type
        message
        postal_code
        preferred_contact_method
        primary_phone
        province
        secondary_phone
        street_address_1
      }
      permissions {
        can_create_or_link_opportunity
        can_assign_lead
        can_archive_lead
      }
    }
  }
`;
