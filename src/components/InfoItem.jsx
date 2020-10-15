import React from 'react';
import styled from 'styled-components';

const StyledInfoItem = styled.div`
  flex: 1;
  display: flex;
  margin-bottom: 0.5em;
  padding-bottom: 0.6em;
  border-bottom: solid 1px ${props => props.theme.colors.grey4};
  .content {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    .label {
      color: ${props => props.theme.colors.grey2};
      font-size: 0.8em;
    }
    .value {
      font-size: 1.3em;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .icon {
    color: #1495ff;
    min-width: 1em;
    text-align: center;
    font-size: 2em;
  }
`;

const InfoItem = ({ icon, label, value }) => (
  <StyledInfoItem>
    <div className="content">
      <div className="label">{label}</div>
      <div className="value">{value || '-'}</div>
    </div>
    <div className="icon">
      <i className={`fa fa-${icon}`} />
    </div>
  </StyledInfoItem>
);

export default InfoItem;
