/* global window */
import React, { useState } from 'react';
import { arrayOf, bool, shape, string } from 'prop-types';
import isEmpty from 'lodash/fp/isEmpty';
import get from 'lodash/fp/get';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Box, Button, Flex, Icon, Text, TextInput,
} from '../../ui';
import WishlistItemImage from './WishlistItemImage';
import { DANGER_COLOR, DARK_COLOR, LIGHT_COLOR, SECONDARY_COLOR } from '../../utils/theme';
import { buildParticipantsList } from '../../utils';

const removeWishlistItemMutation = gql`
  mutation removeWishlistItem($input: RemoveWishlistItemInput!) {
    removeWishlistItem(input: $input) {
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

const addWishlistParticipantMutation = gql`
  mutation addWishlistParticipant($input: PaticpateInWishlistItemInput!) {
    particpateInWishlistItem(input: $input) {
      wishlist {
        id
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
  }
`;

const ensureStartsWithHttps = url => (url.startsWith('http') ? url : `https://${url}`);

const WishlistItem = ({ wishlistId, item, canManage }) => {
  const [isAddingParticipantName, setAddNameView] = useState(false);
  const [participantName, setParticipantName] = useState(false);
  const [removeWishlistItem, { loading: submittingRemove }] = useMutation(removeWishlistItemMutation);
  const [addParticipant, { loading: submittingAdd }] = useMutation(addWishlistParticipantMutation);

  const handleDelete = () => removeWishlistItem({
    variables: {
      input: {
        wishlistId,
        wishlistItemId: item.id,
      },
    },
  });

  const handleParticipate = () => addParticipant({
    variables: {
      input: {
        wishlistId,
        wishlistItemId: item.id,
        name: participantName,
      },
    },
  });

  return (
    <Flex height="100px" p={1}>
      <WishlistItemImage photoUrl={item.photoUrl} />
      <Flex width="80%" ml={2} my={1} column>
        <Text medium>
          {item.name}
        </Text>
        <Text lighter>
          {item.description}
        </Text>
        {isAddingParticipantName && (
          <Flex alignItems="center">
            <Box mr={1}>
              <TextInput
                placeholder="Enter your name"
                onChange={(event) => setParticipantName(get('target.value', event))}
              />
            </Box>
            <Box mr={1}>
              <Button small color={LIGHT_COLOR} onClick={() => setAddNameView(false)}>
                {'Cancel'}
              </Button>
            </Box>
            <Button
              color={SECONDARY_COLOR}
              small
              disabled={!participantName}
              onClick={() => {
                handleParticipate();
                return setAddNameView(false);
              }}
            >
              {"I'm Getting This Item"}
            </Button>
          </Flex>
        )}
        <Flex alignItems="center">
          {canManage && (
            <Box mr={2}>
              <Button small disabled={submittingRemove} color={DANGER_COLOR} onClick={handleDelete}>
                <Icon icon="trash" size="xs" />
              </Button>
            </Box>
          )}
          {!canManage && !isAddingParticipantName && (
            <Box mr={2}>
              <Button small disabled={submittingAdd} color={SECONDARY_COLOR} onClick={() => setAddNameView(true)}>
                {'Participate'}
              </Button>
            </Box>
          )}
          {item.url && (
            <Button small onClick={() => window.open(ensureStartsWithHttps(item.url))}>
              {'Product Link'}
            </Button>
          )}
          {!isEmpty(item.participants) && (
            <Flex alignItems="center" ml={3}>
              <Box mr={2}>
                <Icon icon="user-friends" color={DARK_COLOR} />
              </Box>
              <Text secondary small>{buildParticipantsList(item.participants)}</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

WishlistItem.displayName = 'WishlistItem';

WishlistItem.propTypes = {
  wishlistId: string.isRequired,
  item: shape({
    id: string.isRequired,
    name: string.isRequired,
    description: string,
    url: string,
    photoUrl: string,
    participants: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired,
    })),
  }).isRequired,
  canManage: bool,
};

WishlistItem.defaultProps = {
  canManage: false,
};

export default WishlistItem;
