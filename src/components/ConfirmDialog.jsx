import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button, Stage } from '.';
import SlideOut from './SlideOut';

const propTypes = {
  text: PropTypes.node,
  isOpen: PropTypes.bool,
  yesText: PropTypes.string,
  noText: PropTypes.string,
  onClickOk: PropTypes.func.isRequired,
  onClickNo: PropTypes.func.isRequired,
};

const StyledButton = styled(Button)`
  width: 50%;
  &:first-of-type {
    border-right: 1px solid ${props => props.theme.colors.grey6};
  }
  & + & {
    border-right: 1px solid ${props => props.theme.colors.grey6};
  }
`;

const defaultProps = {
  text: 'Confirm Dialog Text',
  isOpen: false,
  noText: 'No',
  yesText: 'Yes',
};

const AddSpacingAround = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
`;

const AlignHeight = styled.div`
  display: flex;
`;

const ConfirmDialog = ({
  text,
  onClickOk,
  onClickNo,
  isOpen,
  noText,
  yesText,
}) => (
  <SlideOut isOpen={isOpen} transparent alignBottom>
    <SlideOut.Content alignBottom transparent>
      <Stage>
        <SlideOut.Header>
          <AddSpacingAround>{text}</AddSpacingAround>
        </SlideOut.Header>
        <AlignHeight>
          <StyledButton onClick={onClickNo}>{noText}</StyledButton>
          <StyledButton onClick={onClickOk}>{yesText}</StyledButton>
        </AlignHeight>
      </Stage>
    </SlideOut.Content>
  </SlideOut>
);

ConfirmDialog.propTypes = propTypes;
ConfirmDialog.defaultProps = defaultProps;

export default ConfirmDialog;
