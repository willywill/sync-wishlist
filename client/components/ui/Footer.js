import React from 'react';
import styled from 'styled-components';
import { Flex, Box, Text } from '.';
import { DARK_COLOR, WHITE } from '../utils/theme';

const FooterContainer = styled.footer`
  width: 100%;
`;

const Divider = styled.hr`
  border-color: ${DARK_COLOR};
  color: ${DARK_COLOR};
  background-color: ${DARK_COLOR};
  opacity: 0.025;
`;

const Footer = () => (
  <FooterContainer>
    <Divider />
    <Flex
      px={3}
      justify="space-between"
      align="center"
      height="60px"
      background={WHITE}
    >
      <Box>
        <Text color={DARK_COLOR}>
          Copyright © {(new Date().getFullYear())}
        </Text>
      </Box>
    </Flex>
  </FooterContainer>
);

export default Footer;
