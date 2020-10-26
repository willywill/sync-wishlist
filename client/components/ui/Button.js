const { default: styled } = require('styled-components');
const { PRIMARY_FONT, INFO_COLOR, shiftHSL, WHITE, LIGHT_COLOR } = require('../utils/theme');

const Button = styled.button`
  display: inline;
  width: fit-content;
  margin-top: 8px;
  margin-bottom: 8px;
  border: 0;
  font-family: ${PRIMARY_FONT};
  font-size: ${props => (props.small ? '14px' : '18px')};
  border-radius: 5px;
  background-color: ${props => props.color || INFO_COLOR};
  color: ${WHITE};
  padding: ${props => (props.small ? '4px 8px' : '8px 10px')};
  cursor: pointer;
  will-change: background-color;
  transition: background-color 50ms ease-in-out;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${props => shiftHSL({ lightness: -7 }, props.color || INFO_COLOR)}
  }

  &:active {
    background-color: ${props => shiftHSL({ lightness: -15 }, props.color || INFO_COLOR)}
  }

  &:disabled {
    background-color: ${LIGHT_COLOR};
    cursor: not-allowed;
  }
`;

export default Button;
