import styled from 'styled-components';
import { DARK_COLOR, SECONDARY_FONT } from '../utils/theme';

const TextArea = styled.textarea`
  border-radius: 5px;
  border: 1px solid ${DARK_COLOR};
  padding: 8px;
  margin-bottom: 10px;
  font-family: ${SECONDARY_FONT};
  font-size: 14px;
`;

export default TextArea;
