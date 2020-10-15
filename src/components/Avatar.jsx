import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Persona,
  PersonaSize,
} from 'office-ui-fabric-react/lib-commonjs/Persona';

const propTypes = {
  /** Specify the main display text for the avatar */
  text: PropTypes.string.isRequired,
  /** Text shown inside the avatar */
  avatarText: PropTypes.string,
  /** hide all details about the avatar (text, etc.) */
  hideDetails: PropTypes.bool,
  /** image url for the avatar */
  imageUrl: PropTypes.string,
  /** size of the avatar */
  size: PropTypes.oneOf(['extraSmall', 'small', 'medium', 'large', 'default']),
};

const defaultProps = {
  avatarText: '',
  imageUrl: null,
  hideDetails: false,
  size: 'default',
};

const sizeOptions = {
  default: PersonaSize.size48,
  extraSmall: PersonaSize.extraSmall,
  small: PersonaSize.size24,
  medium: PersonaSize.size40,
  large: PersonaSize.size72,
};

const StyledPersonaWrapper = styled.div`
  .ms-Persona .ms-Persona-coin .ms-Persona-initials {
    background-color: ${props => props.theme.colors.grey6};
    color: ${props => props.theme.colors.black};
  }
`;

const Avatar = ({ text, avatarText, hideDetails, imageUrl, size }) => (
  <StyledPersonaWrapper>
    <Persona
      text={text}
      size={sizeOptions[size]}
      imageUrl={imageUrl}
      hidePersonaDetails={hideDetails}
      imageInitials={avatarText}
    />
  </StyledPersonaWrapper>
);

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
