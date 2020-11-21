import styled from 'styled-components';
import { SECONDARY_FONT } from '../utils/theme';

const TextInput = styled.input`
  border-radius: 5px;
  border: 1px solid #b6c5da;
  padding: 8px;
  margin-bottom: 10px;
  font-family: ${SECONDARY_FONT};
  font-size: 14px;

  &:focus {
    outline-color: #b6c5da;
  }

  &::placeholder {
    color: #5b7790;
  }

  @media (max-width: 600px) {
    width: 105px;
  }
`;

export default TextInput;
