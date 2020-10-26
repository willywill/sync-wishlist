import React from 'react';
import CreateWishlistView from '../components/composite/CreateWishlist/CreateWishlistView';
import { Flex, Text } from '../components/ui';
import Divider from '../components/ui/Divider';
import Layout from '../components/ui/Layout';

const CreateWishlistPage = () => (
  <Layout navbar={false}>
    <Flex pt={2} width="100%" height="100%" justify="flex-start" column>
      <Flex pt={2} px={4} justifyContent="space-between" alignItems="center">
        <Text medium>
          {'Wishlist Sync'}
        </Text>
      </Flex>
      <Flex width={1}>
        <Divider />
      </Flex>
      <CreateWishlistView />
    </Flex>
  </Layout>
);

CreateWishlistPage.displayName = 'CreateWishlistPage';

export default CreateWishlistPage;
