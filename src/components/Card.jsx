import React from 'react';
import cx from 'classnames';
import styled, { css } from 'styled-components';
import { ContextButton } from '../components';

const statusColors = t => ({
  taskOverdueColor: t.colors.red4,
  taskColor: t.colors.green5,
  leadArchivedColor: t.colors.grey2,
  leadFirstResponseColor: t.colors.green2,
  leadColor: t.colors.orange4,
});

const StyledCard = styled.div`
  flex: 1;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
  border: 1px solid ${props => props.theme.colors.grey4};
  background-color: ${({ theme: t }) => t.colors.white};
  &.empty {
    border: 1px dashed ${props => props.theme.colors.grey4};
  }
  &.borderless {
    border: none;
  }
`;

const StyledCardHeader = styled.div`
  background-color: ${({ theme: t }) => t.colors.white};
  padding: 0.56rem;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  display: flex;
  justify-content: space-between;
  color: ${({ theme: t }) => t.colors.grey1};
  font: ${({ theme: t }) =>
    css`
      ${t.fontLight} ${t.scale.baseline} ${t.fontStack};
    `};
  ${({ statusColor, theme: t }) =>
    statusColor
      ? css`
          border-left: 5px solid ${statusColors(t)[statusColor] || statusColor};
        `
      : ''};

  .text {
    flex-basis: 100%;
    text-align: left;
  }
`;

const StyledCardButtons = styled.div`
  background-color: ${({ theme: t }) => t.colors.grey6};
  color: ${({ theme: t }) => t.colors.black};
  display: flex;
  justify-content: space-around;
  padding: 4px;
  a {
    color: ${({ theme: t }) => t.colors.orange4};
    font-size: ${props => props.theme.scale.stepUp3};
    &:hover {
      color: #1495ff;
      cursor: pointer;
    }
    &:disabled {
      color: ${props => props.theme.colors.grey3};
    }
  }
`;

const StyledCardContent = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
`;

const StyledCardContentItem = styled.div`
  &.modifier {
    font-size: ${({ theme: t }) => t.scale.stepDown1};
    font-weight: ${({ theme: t }) => t.fontNormal};
    color: ${({ theme: t }) => t.colors.greytext1};
  }

  &.primary {
    font-size: ${({ theme: t }) => t.scale.stepUp2};
    font-weight: ${({ theme: t }) => t.fontSemiBold};
    color: ${({ theme: t }) => t.colors.black};
  }

  &.trailers {
    font-size: ${({ theme: t }) => t.scale.stepUp1};
    color: ${({ theme: t }) => t.colors.greytext1};
  }

  &.details {
    font-size: ${({ theme: t }) => t.scale.baseline};
    color: ${({ theme: t }) => t.colors.greytext1};
  }

  &.secondary {
    font-size: ${({ theme: t }) => t.scale.stepUp1};
    font-weight: ${({ theme: t }) => t.fontSemiBold};
    color: ${({ theme: t }) => t.colors.black};
  }

  &.secondaryTrailers {
    font-size: ${({ theme: t }) => t.scale.baseline};
    color: ${({ theme: t }) => t.colors.greytext1};
  }

  &.conditionSelection {
    font-size: ${({ theme: t }) => t.scale.baseline};
    color: ${({ theme: t }) => t.colors.greytext1};
    .subheader {
      font-weight: ${({ theme: t }) => t.fontSemiBold};
    }
  }

  &.primaryInfo {
    font-size: ${({ theme: t }) => t.scale.baseline};
    color: ${({ theme: t }) => t.colors.greytext1};
  }

  &.appraisalRoles {
    font-size: ${({ theme: t }) => t.scale.stepDown1};
    color: ${({ theme: t }) => t.colors.greytext1};
  }

  &.primaryRoles {
    font-size: ${({ theme: t }) => t.scale.baseline};
    color: ${({ theme: t }) => t.colors.greytext1};
  }

  &.clickable {
    color: ${({ theme: t }) => t.colors.orangetext2};

    &:hover {
      cursor: pointer;
    }
  }

  &.capitalize {
    text-transform: capitalize;
  }
`;

const CardHeader = ({
  text,
  onClick,
  children,
  statusColor,
  onClickContext = null,
  contextDisabled = false,
}) => (
  <StyledCardHeader statusColor={statusColor}>
    {onClickContext && (
      <ContextButton onClick={onClickContext} disabled={contextDisabled} />
    )}
    {!children && <div className="text">{text}</div>}
    {children}
    {onClick && <ContextButton icon="chevron-right" onClick={onClick} />}
  </StyledCardHeader>
);

const CardContent = ({ children }) => (
  <StyledCardContent>{children}</StyledCardContent>
);

const CardContentItem = ({
  children,
  capitalize,
  modifier,
  primary,
  secondary,
  secondaryTrailers,
  conditionSelection,
  primaryInfo,
  appraisalRoles,
  primaryRoles,
  clickable,
  ...rest
}) => (
  <StyledCardContentItem
    className={cx({
      capitalize,
      modifier,
      primary,
      secondary,
      secondaryTrailers,
      conditionSelection,
      primaryInfo,
      appraisalRoles,
      primaryRoles,
      clickable,
    })}
    {...rest}
  >
    {children}
  </StyledCardContentItem>
);

const CardButtons = ({ children }) => (
  <StyledCardButtons>{children}</StyledCardButtons>
);

const Card = ({ children, empty, borderless, onClick }) => (
  <StyledCard
    className={cx({ empty, borderless })}
    onClick={onClick}
    role="button"
    tabIndex="0"
  >
    {children}
  </StyledCard>
);

Card.Buttons = CardButtons;
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Content.Item = CardContentItem;

export default Card;
