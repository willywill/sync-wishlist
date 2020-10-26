import gql from 'graphql-tag';
import { func, string } from 'prop-types';
import React from 'react';
import { useMutation } from 'react-apollo';
import { useForm } from 'react-hook-form';
import {
  Box, Button, Flex, Text, TextInput, TextArea,
} from '../../ui';
import { DANGER_COLOR, LIGHT_COLOR } from '../../utils/theme';

const addWishlistItemMutation = gql`
  mutation addWishlistItem($input: AddWishlistItemInput!) {
    addWishlistItem(input: $input) {
      wishlist {
        id
        items {
          id
          name
          description
          url
          photoUrl
        }
      }
    }
  }
`;

const WishlistAddItemForm = ({ wishlistId, onCancel, onSuccess }) => {
  const { handleSubmit, register, errors } = useForm();
  const [addWishlistItem, { loading: submitting, error }] = useMutation(addWishlistItemMutation);

  const handleClick = (data) => addWishlistItem({
    variables: {
      input: {
        wishlistId,
        name: data.itemName,
        description: data.description,
        url: data.url,
        photoUrl: data.photoUrl,
      },
    },
  }).then(onSuccess);

  return (
    <Flex column>
      <Text bold>
        {'Name'}
      </Text>
      <TextInput name="itemName" placeholder="Name of the item - e.g. Jean Jacket" ref={register({ required: true })} />
      <Flex justifyContent="flex-end">
        {errors.itemName && (
          <Text color={DANGER_COLOR}>
            {errors.itemName && 'This field is required'}
          </Text>
        )}
      </Flex>
      <Text bold>
        {'Url'}
      </Text>
      <TextInput name="url" placeholder="Url for others (or yourself) to obtain this item" ref={register} />
      <Text bold>
        {'Photo Url'}
      </Text>
      <TextInput name="photoUrl" placeholder="URL of a picture associated with this item" ref={register} />
      <Text bold>
        {'Description'}
      </Text>
      <TextArea
        name="description"
        placeholder="A cool, clear and not-so-concise way of describing this item"
        ref={register}
      />
      <Flex alignItems="flex-end" column>
        {error && (
          <Text color={DANGER_COLOR}>
            {error.message}
          </Text>
        )}
        <Flex>
          <Box mr={1}>
            <Button color={LIGHT_COLOR} onClick={onCancel}>
              {'Cancel'}
            </Button>
          </Box>
          <Box style={{ minWidth: '100px' }}>
            <Button onClick={handleSubmit(handleClick)} disabled={submitting}>
              {submitting ? 'Adding...' : 'Add Item'}
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

WishlistAddItemForm.displayName = 'WishlistAddItemForm';

WishlistAddItemForm.propTypes = {
  onCancel: func.isRequired,
  onSuccess: func.isRequired,
  wishlistId: string.isRequired,
};

export default WishlistAddItemForm;
