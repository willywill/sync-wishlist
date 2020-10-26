import React, { useState } from 'react';
import isEmpty from 'lodash/fp/isEmpty';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { Box, Button, Flex, Text } from '../../ui';
import WishlistAddItemForm from './WishlistAddItemForm';
import WishlistItem from './WishlistItem';

const WishlistItemsView = ({ wishlistId, items, canManage, refetch }) => {
  const [isAddingItem, setIsAddingItem] = useState(false);

  if (isAddingItem) {
    return (
      <WishlistAddItemForm
        wishlistId={wishlistId}
        onCancel={() => setIsAddingItem(false)}
        onSuccess={() => {
          refetch();
          return setIsAddingItem(false);
        }}
      />
    );
  }

  if (isEmpty(items) && canManage) {
    return (
      <Flex height="100%" alignItems="center" justifyContent="center" column>
        <Text>
          {'Looks like you don\'t have any items in your wishlist 😞 Start by adding some below.'}
        </Text>
        <Box mt={2}>
          <Button onClick={() => setIsAddingItem(true)}>{'Add Item'}</Button>
        </Box>
      </Flex>
    );
  }

  if (isEmpty(items) && !canManage) {
    return (
      <Flex height="100%" alignItems="center" justifyContent="center" column>
        <Text>
          {'Looks like this wishlist doesn\'t have any items 😞 Contact the creator if possible and tell them to add some items!'}
        </Text>
      </Flex>
    );
  }

  return (
    <Flex column>
      {canManage && (
        <Flex justifyContent="flex-end">
          <Button small onClick={() => setIsAddingItem(true)}>{'Add New Item'}</Button>
        </Flex>
      )}
      {items.map(item => (
        <WishlistItem
          key={item.id}
          item={item}
          wishlistId={wishlistId}
          canManage={canManage}
        />
      ))}
    </Flex>
  );
};

WishlistItemsView.displayName = 'WishlistItemsView';

WishlistItemsView.propTypes = {
  wishlistId: string.isRequired,
  items: arrayOf(shape({
    id: string.isRequired,
    name: string.isRequired,
    description: string,
    url: string,
    photoUrl: string,
  })),
  refetch: func.isRequired,
  canManage: bool,
};

WishlistItemsView.defaultProps = {
  items: [],
  canManage: false,
};

export default WishlistItemsView;
