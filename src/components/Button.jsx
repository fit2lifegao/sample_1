import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.string,
};

const defaultProps = {
  disabled: false,
  fullWidth: false,
  onClick: null,
  icon: null,
};

class BaseButton extends Component {
  render() {
    const { icon, children, fullWidth, ...rest } = this.props;
    const btnIcon = icon ? <i className={`fas fa-${icon} fa-fw`} /> : null;

    return (
      <button {...rest}>
        {children}
        {btnIcon}
      </button>
    );
  }
}

BaseButton.propTypes = propTypes;
BaseButton.defaultProps = defaultProps;

export const Button = styled(BaseButton)`
  -webkit-appearance: none;
  border-radius: 0;
  color: ${props => props.theme.colors.orangetext2};
  background: ${props => props.theme.colors.white};
  font: ${props =>
    `${props.theme.fontNormal} ${props.theme.scale.stepUp4} ${props.theme.fontStack}`};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  border: none;
  width: 80%;
  max-width: 90%;
  max-height: 100%;
  padding: 1.2rem;

  &:hover {
    color: ${props => props.theme.colors.orange3};
  }

  &:disabled {
    color: ${props => props.theme.colors.greytext2};
    background-color: ${props => props.theme.colors.grey7};
  }
  margin: 0;
  ${props =>
    props.fullWidth
      ? css`
          max-width: 100%;
          width: 100%;
          padding-top: 1rem;
          padding-bottom: 1rem;
        `
      : ''};
`;

export const AlternateButton = styled(Button)`
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.orange4};

  &:hover {
    color: ${props => props.theme.colors.brown};
    background-color: ${props => props.theme.colors.orange3};
  }

  &:disabled {
    color: ${props => props.theme.colors.orangetext3};
    background-color: ${props => props.theme.colors.orange6};
  }
`;

export const TextButton = styled(Button)`
  color: ${props => props.theme.colors.grey2};
  background: transparent;
  text-align: left;
  padding: 0.1rem;
`;

export const CancelButton = styled(Button)`
  background-color: ${props => props.theme.colors.red4};
  color: ${props => props.theme.colors.red1};
  border: none;
  margin: 1.2rem auto 0rem auto;

  &:hover {
    background-color: ${props => props.theme.colors.red3};
    color: ${props => props.theme.colors.red1};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.red7};
    color: ${props => props.theme.colors.red5};
  }
`;

export const ProcessButton = styled(Button)`
  color: ${props => props.theme.colors.grey2};
  border: dashed 1px ${props => props.theme.colors.grey2};
  font-weight: ${props => props.theme.fontSemiBold};

  i {
    color: ${props => props.theme.colors.orange4};
  }
`;

export const ConfirmButton = styled(Button)`
  background-color: ${props => props.theme.colors.green5};
  color: ${props => props.theme.colors.greentext1};
  border: none;
  margin: 1.2rem auto 0rem auto;

  &:hover {
    background-color: ${props => props.theme.colors.green4};
    color: ${props => props.theme.colors.green1};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.green8};
    color: ${props => props.theme.colors.green6};
  }
`;

export const SlideOutSelectButton = styled(Button)`
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  background-color: ${props => props.theme.colors.grey5};
  &:first-of-type {
    border-top: 1px solid ${props => props.theme.colors.grey6};
  }
  & + & {
    border-top: 1px solid ${props => props.theme.colors.grey6};
  }
  &:last-of-type {
    border-bottom: 1px solid ${props => props.theme.colors.grey6};
  }
  :focus {
    outline: 0;
  }
`;
