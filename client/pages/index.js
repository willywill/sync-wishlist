import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Flex, Box, Text } from '../components/ui';
import Layout from '../components/ui/Layout';
import { DARK_COLOR } from '../components/utils/theme';
import Button from '../components/ui/Button';

const Divider = styled.hr`
  width: 100%;
  border-color: ${DARK_COLOR};
  color: ${DARK_COLOR};
  background-color: ${DARK_COLOR};
  opacity: 0.05;
`;

const CollapsingFlex = styled(Flex)`
  overflow: hidden;
  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const Blob = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    {/* eslint-disable-next-line max-len */}
    <path fill="#0F62FE" d="M34.4,-32.4C49.1,-19.8,68.5,-9.9,74,5.5C79.5,20.9,71.1,41.8,56.5,56.7C41.8,71.5,20.9,80.3,2,78.3C-16.9,76.4,-33.9,63.6,-42.7,48.7C-51.5,33.9,-52.3,16.9,-54.5,-2.2C-56.7,-21.4,-60.4,-42.8,-51.6,-55.4C-42.8,-68,-21.4,-71.8,-5.8,-66.1C9.9,-60.3,19.8,-45,34.4,-32.4Z" transform="translate(100 100)" />
  </svg>
);

const HomePage = () => (
  <Layout navbar={false}>
    <Flex pt={2} width="100%" height="100%" justify="flex-start" column>
      <Flex pt={2} px={4} justifyContent="space-between" alignItems="center">
        <Text medium>
          {'Wishlist Sync'}
        </Text>
        <Button>
          {'Get Started'}
        </Button>
      </Flex>
      <Flex width={1}>
        <Divider />
      </Flex>
      <CollapsingFlex height="100%" alignItems="center" justifyContent="center">
        <Flex pl={4} mr="50px" column>
          <Text large bold>
            {'Create Synchronized Wishlists'}
          </Text>
          <Text medium>
            {'No User Accounts Required'}
          </Text>
          <Box mt={2}>
            <Button onClick={() => Router.push('/create')}>
              {'Create Wishlist'}
            </Button>
          </Box>
        </Flex>
        <Flex mt={4} column style={{ position: 'relative' }}>
          <Box px={4} width={1}>
            <img
              width="100%"
              height="auto"
              style={{ maxWidth: '375px', minWidth: '300px' }}
              src="/graphic.svg"
              alt="Brand Logo"
            />
            <Box width="400px" style={{ position: 'absolute', top: '190px', left: '-255px' }}>
              <Blob />
            </Box>
          </Box>
        </Flex>
      </CollapsingFlex>
    </Flex>
  </Layout>
);

HomePage.displayName = 'HomePage';

export default HomePage;
