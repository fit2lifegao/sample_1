import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CancelButton, SlideOut, SlideOutSelectButton, Stage } from '.';

const StyledSlideOutSelectButton = styled(SlideOutSelectButton)`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;

const propTypes = {
  header: PropTypes.node,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    }),
  ).isRequired,
};

const defaultProps = {
  header: '',
  isOpen: false,
};

const ContextMenu = ({ header, isOpen, onCancel, options }) => (
  <SlideOut isOpen={isOpen} transparent alignBottom>
    <SlideOut.Content alignBottom transparent>
      <Stage>
        <SlideOut.Header>{header}</SlideOut.Header>
        {options.map(option => (
          <StyledSlideOutSelectButton
            key={option.text}
            fullWidth
            onClick={option.onClick}
          >
            {option.text}
          </StyledSlideOutSelectButton>
        ))}
      </Stage>
    </SlideOut.Content>
    <SlideOut.Footer transparent>
      <CancelButton fullWidth onClick={onCancel}>
        Cancel
      </CancelButton>
    </SlideOut.Footer>
  </SlideOut>
);

ContextMenu.propTypes = propTypes;
ContextMenu.defaultProps = defaultProps;

export default ContextMenu;
