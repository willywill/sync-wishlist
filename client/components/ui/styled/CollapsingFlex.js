import styled from 'styled-components';
import { Flex } from '..';

const CollapsingFlex = styled(Flex)`
  overflow: hidden;
  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

export default CollapsingFlex;
