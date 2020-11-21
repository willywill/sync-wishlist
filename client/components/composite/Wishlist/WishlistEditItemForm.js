import gql from 'graphql-tag';
import { arrayOf, func, shape, string } from 'prop-types';
import React from 'react';
import { useMutation } from 'react-apollo';
import { useForm } from 'react-hook-form';
import {
  Box, Button, Flex, Text, TextInput, TextArea,
} from '../../ui';
import { DANGER_COLOR, LIGHT_COLOR } from '../../utils/theme';

const editWishlistItemMutation = gql`
  mutation editWishlistItem($input: EditWishlistItemInput!) {
    editWishlistItem(input: $input) {
      wishlist {
        id
        items {
          id
          name
          description
          url
          price
          photoUrl
        }
      }
    }
  }
`;

const WishlistEditItemForm = ({ wishlistId, item, onCancel, onSuccess }) => {
  const { handleSubmit, register, errors } = useForm({
    defaultValues: {
      itemName: item.name,
      description: item.description,
      url: item.url,
      price: item.price,
      photoUrl: item.photoUrl,
    },
  });
  const [editWishlistItem, { loading: submitting, error }] = useMutation(editWishlistItemMutation);

  const handleClick = (data) => editWishlistItem({
    variables: {
      input: {
        wishlistId,
        wishlistItemId: item.id,
        name: data.itemName,
        description: data.description,
        url: data.url,
        price: data.price,
        photoUrl: data.photoUrl,
      },
    },
  }).then(onSuccess);

  return (
    <Flex width="650px" mt={4} pl={2} pr={4} column>
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
        {'Price'}
      </Text>
      <TextInput name="price" placeholder="Price or price estimation of the item" ref={register} />
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
              {submitting ? 'Updating...' : 'Update Item'}
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

WishlistEditItemForm.displayName = 'WishlistEditItemForm';

WishlistEditItemForm.propTypes = {
  onCancel: func.isRequired,
  onSuccess: func.isRequired,
  wishlistId: string.isRequired,
  item: shape({
    id: string.isRequired,
    name: string.isRequired,
    description: string,
    url: string,
    photoUrl: string,
    price: string,
    participants: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired,
    })),
  }).isRequired,
};

export default WishlistEditItemForm;
