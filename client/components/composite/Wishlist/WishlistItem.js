/* global window */
import React, { useState } from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import isEmpty from 'lodash/fp/isEmpty';
import get from 'lodash/fp/get';
import take from 'lodash/fp/take';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import {
  Box, Flex, Icon, Text, TextInput,
} from '../../ui';
import WishlistItemImage from './WishlistItemImage';
import {
  DANGER_COLOR, INFO_COLOR, SECONDARY_COLOR, WARNING_COLOR,
} from '../../utils/theme';
import { buildParticipantsList, nameToHueRotation, isEven } from '../../utils';
import BadgeButton from '../../ui/BadgeButton';

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
          price
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
          price
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

const WishlistItemContainer = styled(Flex)`
  width: 550px;
  height: 250px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  margin-bottom: 50px;
  border-radius: 10px;
  background-color: white;

  @media (max-width: 600px) {
    width: 350px;
  }
`;

const ShrinkingText = styled(Text)`
  @media (max-width: 600px) {
    font-size: ${props => props.shrinkTo};
  }
`;

const WishlistItem = ({ wishlistId, item, canManage, onEdit }) => {
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

  const handleEdit = () => onEdit();

  return (
    <WishlistItemContainer column>
      <Flex width={1} justifyContent="space-between" height="75%">
        <WishlistItemImage photoUrl={item.photoUrl} />
        <Flex minWidth="60%" ml={2} my={1} column>
          <Box ml={3} mt={4}>
            <ShrinkingText shrinkTo="20px" medium secondary color="#55626d" style={{ fontWeight: 500 }}>
              {item.name}
            </ShrinkingText>
          </Box>
          {item.price && (
            <Box ml={3} mt={2}>
              <Text medium secondary color="#697d8e" style={{ fontWeight: 500, fontSize: '24px' }}>
                {item.price}
              </Text>
            </Box>
          )}
          <Box ml={3} mt={3}>
            <ShrinkingText shrinkTo="12px" secondary color="#55626d" style={{ fontWeight: 100 }}>
              {item.description}
            </ShrinkingText>
          </Box>
        </Flex>
        {item.url && (
          <Flex
            pt={3}
            pr={3}
            style={{ cursor: 'pointer' }}
            justifyContent="flex-end"
            onClick={item.url ? () => window.open(ensureStartsWithHttps(item.url)) : undefined}
          >
            <Icon icon="external-link-square-alt" size="lg" color="#798c9c" />
          </Flex>
        )}
      </Flex>
      <Flex justifyContent="flex-end" height="25%" style={{ borderTop: '1px solid #cbd6de' }}>
        {isAddingParticipantName && (
          <Flex alignItems="center" pr={2}>
            <Box height="50%" mr={2}>
              <TextInput
                placeholder="Type Your Name"
                onChange={(event) => setParticipantName(get('target.value', event))}
              />
            </Box>
            <Flex>
              <BadgeButton
                color={SECONDARY_COLOR}
                small
                onClick={() => {
                  if (participantName) {
                    handleParticipate();
                    setAddNameView(false);
                  }
                }}
              >
                {"I'm Getting This Item"}
              </BadgeButton>
              <Box ml={1}>
                <BadgeButton small color={WARNING_COLOR} onClick={() => setAddNameView(false)}>
                  {'Cancel'}
                </BadgeButton>
              </Box>
            </Flex>
          </Flex>
        )}
        <Flex alignItems="center">
          {!isEmpty(item.participants) && !isAddingParticipantName && (
            <Flex mr={2} alignItems="center" ml={3}>
              {take(4, item.participants).map((participant, index) => (
                <Box key={participant.name} style={{ filter: nameToHueRotation(participant.name) }} mr={2}>
                  <img src={isEven(index + 1) ? '/female.svg' : '/male.svg'} width="35px" height="35px" />
                </Box>
              ))}
              <Text secondary small>{buildParticipantsList(item.participants)}</Text>
            </Flex>
          )}
          {!canManage && !isAddingParticipantName && (
            <Box mr={2}>
              <BadgeButton small disabled={submittingAdd} color={SECONDARY_COLOR} onClick={() => setAddNameView(true)}>
                {'Participate'}
              </BadgeButton>
            </Box>
          )}
          {canManage && (
            <Box mr={2}>
              <BadgeButton small disabled={submittingRemove} color={DANGER_COLOR} onClick={handleDelete}>
                {'Delete'}
              </BadgeButton>
            </Box>
          )}
          {canManage && (
            <Box mr={2}>
              <BadgeButton small color={INFO_COLOR} onClick={handleEdit}>
                {'Edit'}
              </BadgeButton>
            </Box>
          )}
        </Flex>
      </Flex>
    </WishlistItemContainer>
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
    price: string,
    participants: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired,
    })),
  }).isRequired,
  canManage: bool,
  onEdit: func.isRequired,
};

WishlistItem.defaultProps = {
  canManage: false,
};

export default WishlistItem;
