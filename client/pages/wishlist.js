import React from 'react';
import getOr from 'lodash/fp/getOr';
import { useRouter } from 'next/router';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import Layout from '../components/ui/Layout';
import { Box, Flex, Text } from '../components/ui';
import { DARK_COLOR } from '../components/utils/theme';
import Divider from '../components/ui/Divider';
import WishlistItemsView from '../components/composite/Wishlist/WishlistItemsView';

const getWishlistQuery = gql`
  query getWishlist($id: String!, $privateKey: String) {
    wishlist(id: $id, privateKey: $privateKey) @connection(key: "wishlist", filter: ["id"]) {
      id
      name
      canManage
      items {
        id
        name
        description
        url
        photoUrl
        participants {
          id
          name
        }
      }
    }
  }
`;

const WishlistPage = () => {
  const router = useRouter();
  const { data, loading, refetch } = useQuery(getWishlistQuery, {
    variables: { id: router.query.wishlistId, privateKey: router.query.privateKey },
  });

  if (loading) return null;

  const wishlist = getOr({}, 'wishlist', data);
  const canManage = getOr(false, 'canManage', wishlist);

  return (
    <Layout navbar={canManage}>
      <Flex
        width={1}
        pt={2}
        px={4}
        justifyContent="flex-start"
        alignItems="center"
        onClick={() => router.push('/')}
        style={{ cursor: 'pointer' }}
      >
        <Text medium>
          {'Wishlist Sync'}
        </Text>
      </Flex>
      <Flex width={1}>
        <Divider />
      </Flex>
      <Flex pt={2} width="100%" height="100%" justify="flex-start" column>
        <Box mx={4} height="75%">
          <Text large bold color={DARK_COLOR}>{wishlist.name ? `${wishlist.name}` : 'Wishlist'}</Text>
          <Box ml={1}>
            <Text lighter>{'ID:'} {wishlist.id}</Text>
          </Box>
          <WishlistItemsView
            wishlistId={wishlist.id}
            items={wishlist.items}
            canManage={canManage}
            refetch={refetch}
          />
        </Box>
      </Flex>
    </Layout>
  );
};

WishlistPage.displayName = 'WishlistPage';

export default WishlistPage;
