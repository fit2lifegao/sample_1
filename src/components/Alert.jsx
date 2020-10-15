import styled from 'styled-components';

const Alert = styled.div`
  color: ${props => props.theme.colors.white};
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: ${props => props.theme.scale.stepUp2};
  font-weight: ${props => props.theme.fontSemiBold};
`;

export const AlertSuccess = styled(Alert)`
  background-color: ${props => props.theme.colors.green5};
`;

export const AlertError = styled(Alert)`
  background-color: ${props => props.theme.colors.red1};
`;

export const AlertInfo = styled(Alert)`
  background-color: ${props => props.theme.colors.blue2};
`;

export const AlertWarning = styled(Alert)`
  background-color: ${props => props.theme.colors.yellow1};
`;
