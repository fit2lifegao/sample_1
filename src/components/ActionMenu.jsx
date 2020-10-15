import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cx from 'classnames';

const ActionMenu = styled.div``;

const StyledActionMenuButton = styled.a`
  display: block;
  padding: 1em;
  border-bottom: solid 1px #dfdfdf;
  background-color: white;
  color: black;

  &:hover,
  &:focus {
    outline: none;
    background-color: #ffffff;
    color: #1495ff;
    cursor: pointer;
  }
  &.disabled {
    color: ${props => props.theme.colors.grey3};
  }

  i {
    margin-right: 0.75em;
  }
`;

const ActionMenuButton = ({ label, icon, onClick, iconStyle, disabled }) => (
  <StyledActionMenuButton
    className={cx({ disabled })}
    role="button"
    onClick={disabled ? null : onClick}
    tabIndex="0"
  >
    <i className={`${iconStyle} fa-${icon}`} />
    {label}
  </StyledActionMenuButton>
);

ActionMenuButton.propTypes = {
  label: PropTypes.node.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  iconStyle: PropTypes.string,
};

ActionMenuButton.defaultProps = {
  disabled: false,
  iconStyle: 'fas',
};

ActionMenu.Button = ActionMenuButton;

export default ActionMenu;
