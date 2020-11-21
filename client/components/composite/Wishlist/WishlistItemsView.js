import React, { useState } from 'react';
import isEmpty from 'lodash/fp/isEmpty';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import styled from 'styled-components';
import { Box, Button, Flex, Text } from '../../ui';
import WishlistAddItemForm from './WishlistAddItemForm';
import WishlistItem from './WishlistItem';
import WishlistEditItemForm from './WishlistEditItemForm';
import { DARK_COLOR } from '../../utils/theme';

const ShrinkingText = styled(Text)`
  @media (max-width: 600px) {
    font-size: 28px;
  }
`;

const WishlistItemsView = ({ wishlistId, wishlistName, items, canManage, refetch }) => {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [edit, setIsEditingItem] = useState({ isEditing: false, item: {} });

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

  if (edit.isEditing) {
    return (
      <WishlistEditItemForm
        wishlistId={wishlistId}
        item={edit.item}
        onCancel={() => setIsEditingItem({ isEditing: false })}
        onSuccess={() => {
          refetch();
          return setIsEditingItem({ isEditing: false });
        }}
      />
    );
  }

  if (isEmpty(items) && canManage) {
    return (
      <Flex height="100%" alignItems="center" justifyContent="center" column>
        <Text center>
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
        <Text center>
          {'Looks like this wishlist doesn\'t have any items 😞 Contact the creator if possible and tell them to add some items!'}
        </Text>
      </Flex>
    );
  }

  return (
    <Box
      width={1}
      height="100%"
      pt={4}
      backgroundColor="#f5f8fb"
      column
      style={{ overflowY: 'scroll' }}
    >
      {wishlistName && (
        <Flex justifyContent="center" mb={4}>
          <ShrinkingText center large bold color={DARK_COLOR}>{wishlistName}{' Wishlist'}</ShrinkingText>
        </Flex>
      )}
      {canManage && (
        <Flex width="95%" pr={4} pt={2} alignItems="flex-end" justifyContent="flex-end">
          <Button
            style={{
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '20px',
              textAlign: 'center',
            }}
            onClick={() => setIsAddingItem(true)}
          >
            {'+'}
          </Button>
        </Flex>
      )}
      <Flex mt={1} justifyContent="center" alignItems="center" column>
        {items.map(item => (
          <WishlistItem
            key={item.id}
            item={item}
            wishlistId={wishlistId}
            canManage={canManage}
            onEdit={() => setIsEditingItem({ isEditing: true, item })}
          />
        ))}
      </Flex>
    </Box>
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
  wishlistName: string,
};

WishlistItemsView.defaultProps = {
  items: [],
  canManage: false,
};

export default WishlistItemsView;
