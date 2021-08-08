import { Box } from '@rebass/grid';
import Router from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { Flex } from '.';
import Logo from './Logo';
import Text from './styled/Text';
// import { DARK_COLOR } from '../utils/theme';

const NavbarContainer = styled(Flex)`
  width: 100%;
  height: 55px;
  cursor: pointer;
`;

// const Circle = styled.div`
//   width: 6px;
//   height: 6px;
//   border-radius: 50%;
//   background-color: ${DARK_COLOR};
// `;

// const DotMenu = () => (
//   <Flex>
//     <Box mr={1}>
//       <Circle />
//     </Box>
//     <Box mr={1}>
//       <Circle />
//     </Box>
//     <Box>
//       <Circle />
//     </Box>
//   </Flex>
// );

const Navbar = () => (
  <NavbarContainer>
    <Flex alignItems="center" onClick={() => Router.push('/')}>
      <Flex justifyContent="flex-start" ml={3} mr={2} pt={2} width="40px">
        <Logo />
      </Flex>
      <Box mt={2}>
        <Text secondary thin medium>
          {'Wishlist Sync'}
        </Text>
      </Box>
    </Flex>
  </NavbarContainer>
);

export default Navbar;
