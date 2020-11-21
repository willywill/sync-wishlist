const { default: styled } = require('styled-components');
const { PRIMARY_FONT, INFO_COLOR, shiftHSL, LIGHT_COLOR } = require('../utils/theme');

const BadgeButton = styled.button`
  display: inline;
  width: fit-content;
  margin-top: 8px;
  margin-bottom: 8px;
  border: 2px solid #b6c5da;
  font-family: ${PRIMARY_FONT};
  font-size: ${props => (props.small ? '14px' : '18px')};
  font-weight: 600;
  border-radius: 12px;
  background-color: transparent;
  color:  #5b7790;
  padding: ${props => (props.small ? '4px 16px' : '8px 10px')};
  cursor: pointer;
  transition: color 70ms ease-in-out, border-color 70ms ease-in-out;

  &:focus {
    outline: none;
  }

  &:hover {
    border-color: ${props => shiftHSL({ lightness: -7 }, props.color || INFO_COLOR)};
    color: ${props => shiftHSL({ lightness: -7 }, props.color || INFO_COLOR)};
  }

  &:active {
    border-color: ${props => shiftHSL({ lightness: -15 }, props.color || INFO_COLOR)};
    color: ${props => shiftHSL({ lightness: -15 }, props.color || INFO_COLOR)};
  }

  &:disabled {
    background-color: ${LIGHT_COLOR};
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

export default BadgeButton;
