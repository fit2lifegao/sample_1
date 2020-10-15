import React from 'react';
import styled from 'styled-components';

const StyledContextButton = styled.button`
  border: none;
  background-color: Transparent;
  outline: none;
  padding: 0 1em 0 0;
  margin: 0;
  font-size: ${({ theme: t }) => t.scale.stepUp2};
  width: auto;
  height: auto;
  i {
    color: ${props => props.theme.colors.orange4};
  }

  &:disabled {
    & > i {
      color: ${props => props.theme.colors.grey3};
    }
  }
`;

const ContextButton = ({ disabled, onClick, icon = 'ellipsis-v' }) => (
  <StyledContextButton onClick={disabled ? null : onClick} disabled={disabled}>
    <i className={`fas fa-${icon}`} />
  </StyledContextButton>
);

export default ContextButton;
