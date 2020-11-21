import React from 'react';
import CreateWishlistView from '../components/composite/CreateWishlist/CreateWishlistView';
import { Flex } from '../components/ui';
import Divider from '../components/ui/Divider';
import Layout from '../components/ui/Layout';

const CreateWishlistPage = () => (
  <Layout navbar>
    <Flex pt={2} width="100%" height="100%" justify="flex-start" column>
      <Flex width={1}>
        <Divider />
      </Flex>
      <CreateWishlistView />
    </Flex>
  </Layout>
);

CreateWishlistPage.displayName = 'CreateWishlistPage';

export default CreateWishlistPage;
