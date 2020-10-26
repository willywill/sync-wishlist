import React from 'react';
import styled from 'styled-components';
import { Flex, Box, Text } from '.';
import { DARK_COLOR, DARK_COLOR_TRANSPARENT, WHITE } from '../utils/theme';

const FooterContainer = styled.footer`
  width: 100%;
  border-top: 1px solid ${DARK_COLOR_TRANSPARENT};
`;

const Footer = () => (
  <FooterContainer>
    <Flex
      px={3}
      justify="space-between"
      align="center"
      height="60px"
      background={WHITE}
    >
      <Box>
        <Text color={DARK_COLOR}>
          Copyright © {(new Date().getFullYear())} - Created by William Germany
        </Text>
      </Box>
    </Flex>
  </FooterContainer>
);

export default Footer;
