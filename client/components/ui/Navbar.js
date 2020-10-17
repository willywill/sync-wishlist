import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '.';
import { DARK_COLOR } from '../utils/theme';

const NavbarContainer = styled(Flex)`
  width: 100%;
  height: 20px;
`;

const Circle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${DARK_COLOR};
`;

const DotMenu = () => (
  <Flex>
    <Box mr={1}>
      <Circle />
    </Box>
    <Box mr={1}>
      <Circle />
    </Box>
    <Box>
      <Circle />
    </Box>
  </Flex>
);

const Navbar = () => (
  <NavbarContainer>
    <Flex width={1} mr={4} mt={4} justify="flex-end" align="center">
      <DotMenu />
    </Flex>
  </NavbarContainer>
);

export default Navbar;
