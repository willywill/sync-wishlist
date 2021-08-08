import React from 'react';
import getOr from 'lodash/fp/getOr';
import { useRouter } from 'next/router';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import Layout from '../components/ui/Layout';
import { Flex } from '../components/ui';
import Divider from '../components/ui/Divider';
import WishlistItemsView from '../components/composite/Wishlist/WishlistItemsView';
import WishlistManageSidebar from '../components/composite/Wishlist/WishlistManageSidebar';

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
        price
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
    <Layout navbar={true}>
      <Flex
        width={1}
        pt={2}
        px={4}
        justifyContent="flex-start"
        alignItems="center"
        style={{ cursor: 'pointer' }}
      >
      </Flex>
      <Flex width={1}>
        <Divider />
      </Flex>
      <Flex width="100%" height="90%" justify="flex-start">
        {canManage && (
          <Flex width="25%" column>
            <WishlistManageSidebar wishlist={wishlist} />
          </Flex>
        )}
        <Flex width={canManage ? '75%' : '100%'} justifyContent="center">
          <WishlistItemsView
            wishlistName={wishlist.name}
            wishlistId={wishlist.id}
            items={wishlist.items}
            canManage={canManage}
            refetch={refetch}
          />
        </Flex>
      </Flex>
    </Layout>
  );
};

WishlistPage.displayName = 'WishlistPage';

export default WishlistPage;
