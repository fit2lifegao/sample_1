import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const StyledContactButtons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  margin: 0em;
`;

const ContactButton = styled.a`
  i {
    color: ${props =>
      props.href ? props.theme.colors.orange4 : props.theme.colors.grey3};
    font-size: ${props => props.theme.scale.stepUp3};
  }
`;

const propTypes = {
  primaryPhone: PropTypes.string,
  cellPhone: PropTypes.string,
  emailAddress: PropTypes.string,
};

const defaultProps = {
  primaryPhone: undefined,
  cellPhone: undefined,
  emailAddress: undefined,
  notesUrl: undefined,
};

const ContactButtons = ({ primaryPhone, cellPhone, emailAddress }) => (
  <StyledContactButtons>
    <ContactButton href={primaryPhone && `tel:${primaryPhone}`}>
      <i className="fas fa-phone" />
    </ContactButton>
    <ContactButton href={cellPhone && `sms:${cellPhone}`}>
      <i className="fas fa-comment-dots" />
    </ContactButton>
    <ContactButton href={emailAddress && `mailto:${emailAddress}`}>
      <i className="fas fa-envelope" />
    </ContactButton>
  </StyledContactButtons>
);

ContactButtons.propTypes = propTypes;
ContactButtons.defaultProps = defaultProps;

export default withRouter(ContactButtons);
