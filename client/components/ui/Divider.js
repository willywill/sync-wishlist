import styled from 'styled-components';
import { DARK_COLOR } from '../utils/theme';

const Divider = styled.hr`
  width: 100%;
  border-color: ${DARK_COLOR};
  color: ${DARK_COLOR};
  background-color: ${DARK_COLOR};
  opacity: 0.05;
`;

export default Divider;
