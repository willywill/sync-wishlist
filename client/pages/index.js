import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '../components/ui';
import Layout from '../components/ui/Layout';
import textMixin from '../components/utils/text';
import { DARK_COLOR } from '../components/utils/theme';

const Heading = styled.h1`
  ${textMixin};
`;

const Divider = styled.hr`
  border-color: ${DARK_COLOR};
  color: ${DARK_COLOR};
  background-color: ${DARK_COLOR};
  opacity: 0.025;
`;

const Home = () => (
  <Layout>
    <Flex pt={2} width="100%" height="100%" justify="flex-start" column>
      <Box mx={4} mt={4}>
        <Heading bold color={DARK_COLOR}>Wishlist</Heading>
        <Divider />
      </Box>
    </Flex>
  </Layout>
);

export default Home;
