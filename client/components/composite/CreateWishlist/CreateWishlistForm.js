import gql from 'graphql-tag';
import { func } from 'prop-types';
import React from 'react';
import { useMutation } from 'react-apollo';
import { useForm } from 'react-hook-form';
import { Box, Button, Flex, Text, TextInput } from '../../ui';
import { DANGER_COLOR } from '../../utils/theme';

const submitWishlistMutation = gql`
  mutation submitWishlist($name: String!, $email: String!) {
    createWishlist(name: $name, email: $email) {
       wishlist {
        id
        name
       }
    }
  }
`;

const CreateWishlistForm = ({ onSuccess }) => {
  const { handleSubmit, register, errors } = useForm();
  const [submitWishlist, { loading: submitting, error }] = useMutation(submitWishlistMutation);

  const handleClick = (variables) => submitWishlist({ variables }).then(onSuccess);

  return (
    <Flex column>
      <Box mb={4}>
        <Text large bold>
          {'Create Your Wishlist'}
        </Text>
      </Box>
      <Text bold>
        {'Wishlist Name'}
      </Text>
      <TextInput name="name" placeholder="Enter Wishlist Name" ref={register({ required: true })} />
      <Flex justifyContent="flex-end">
        {errors.email && (
          <Text color={DANGER_COLOR}>
            {errors.name && 'This field is required'}
          </Text>
        )}
      </Flex>
      <Text bold>
        {'Email'}
      </Text>
      <TextInput name="email" placeholder="Email Address" ref={register({ required: true })} />
      <Flex justifyContent="flex-end">
        {errors.email && (
          <Text color={DANGER_COLOR}>
            {errors.email && 'This field is required'}
          </Text>
        )}
      </Flex>
      <Flex alignItems="flex-end" column>
        {error && (
          <Text color={DANGER_COLOR}>
            {error.message}
          </Text>
        )}
        <Button type="submit" onClick={handleSubmit(handleClick)} disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Flex>
    </Flex>
  );
};

CreateWishlistForm.displayName = 'CreateWishlistForm';

CreateWishlistForm.propTypes = {
  onSuccess: func.isRequired,
};

export default CreateWishlistForm;
