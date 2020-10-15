import React from 'react';
import styled from 'styled-components';

import goLogo from '../assets/go.svg';
import Box from '@material-ui/core/Box';

const StyledGoHeaderDiv = styled.div`
  display: flex;
  margin-bottom: 1rem;
  .logo > img {
    height: 100px;
    width: 100px;
  }
  .title {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: flex-start;
  }
`;

const GoHeader = ({ title, subtitle }) => (
  <StyledGoHeaderDiv>
    <div className="logo">
      <img src={goLogo} alt="Go Auto Logo" />
    </div>
    <div className="title">
      <Box component="h1" fontSize="1.75rem" color="primary.main">
        {title || 'Market Platform'}
      </Box>
      {subtitle !== null && (
        <Box component="h2" fontSize="1rem" color="text.secondary">
          {subtitle || 'MOBILE'}
        </Box>
      )}
    </div>
  </StyledGoHeaderDiv>
);

export default GoHeader;
