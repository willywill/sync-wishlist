/* global window */
import React from 'react';
import gql from 'graphql-tag';
import isEmpty from 'lodash/fp/isEmpty';
import size from 'lodash/fp/size';
import { useQuery } from 'react-apollo';
import styled from 'styled-components';
import { Flex, Box, Text, Icon } from '../components/ui';
import Layout from '../components/ui/Layout';
import textMixin from '../components/utils/text';
import {
  DANGER_COLOR,
  DARK_COLOR, INFO_COLOR, LIGHT_COLOR, PRIMARY_FONT, SECONDARY_FONT, shiftHSL, WARNING_COLOR, WHITE,
} from '../components/utils/theme';

const WISHLIST_ID = 'F-NqZ5v4';

const Heading = styled.h1`
  ${textMixin};
`;

const Divider = styled.hr`
  border-color: ${DARK_COLOR};
  color: ${DARK_COLOR};
  background-color: ${DARK_COLOR};
  opacity: 0.05;
`;

const BadgeButton = styled.button`
  display: inline;
  width: fit-content;
  margin-top: 8px;
  margin-bottom: 8px;
  border: 0;
  font-family: ${PRIMARY_FONT};
  font-size: 14px;
  border-radius: 5px;
  background-color: ${props => props.color || INFO_COLOR};
  color: ${WHITE};
  padding: 4px 8px;
  cursor: pointer;
  will-change: background-color;
  transition: background-color 50ms ease-in-out;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: ${props => shiftHSL({ lightness: -7 }, props.color || INFO_COLOR)}
  }

  &:active {
    background-color: ${props => shiftHSL({ lightness: -15 }, props.color || INFO_COLOR)}
  }
`;

const TextInput = styled.input`
  border-radius: 5px;
  border: 1px solid ${DARK_COLOR};
  padding: 8px;
  margin-bottom: 10px;
  font-family: ${SECONDARY_FONT};
  font-size: 14px;
`;

const TextArea = styled.textarea`
  border-radius: 5px;
  border: 1px solid ${DARK_COLOR};
  padding: 8px;
  margin-bottom: 10px;
  font-family: ${SECONDARY_FONT};
  font-size: 14px;
`;

const getWishlistQuery = gql`
  query getWishlist {
    wishlist(id: "${WISHLIST_ID}") {
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
`;

const buildParticipantsList = participants => {
  if (size(participants) === 1) {
    return participants[0].name;
  }

  if (size(participants) === 2) {
    return `${participants[0].name} and ${participants[1].name}`;
  }

  const [firstParticipant, secondParticipant, ...remainingParticipants] = participants;

  return `${firstParticipant.name}, ${secondParticipant.name} and ${size(remainingParticipants)} others`;
};

const AddItemForm = () =>
  (
    <Flex column>
      <Text bold>
        {'Name'}
      </Text>
      <TextInput placeholder="Name of the item - e.g. Jean Jacket" />
      <Text bold>
        {'Url'}
      </Text>
      <TextInput placeholder="Url for others (or yourself) to obtain this item" />
      <Text bold>
        {'Photo Url'}
      </Text>
      <TextInput placeholder="URL of a picture associated with this item" />
      <Text bold>
        {'Description'}
      </Text>
      <TextArea placeholder="A cool, clear and not-so-concise way of describing this item" />
      <Flex justifyContent="flex-end">
        <Box mr={1}>
          <BadgeButton color={LIGHT_COLOR}>{'Cancel'}</BadgeButton>
        </Box>
        <BadgeButton>{'Add Item'}</BadgeButton>
      </Flex>
    </Flex>
  );

const ItemImage = ({ photoUrl }) => {
  if (!photoUrl) {
    return <div style={{ width: '100px', height: '90%', backgroundColor: '#f4f4f4', borderRadius: '10px' }} />;
  }

  return (
    <Box maxWidth="100px">
      <img
        style={{ borderRadius: '10px', maxWidth: '100%', maxHeight: '100%' }}
        width="auto"
        height="auto"
        src={photoUrl}
      />
    </Box>
  );
};

const Test = () => {
  const { data = {}, loading } = useQuery(getWishlistQuery);

  return <AddItemForm />;

  const items = (data && data.wishlist && data.wishlist.items) || [];

  if (isEmpty(items) && !loading) {
    return (
      <Flex height="100%" alignItems="center" justifyContent="center" column>
        <Text>
          {'Looks like you don\'t have any items in your wishlist 😞 Start by adding some below.'}
        </Text>
        <BadgeButton>+ Add Item</BadgeButton>
      </Flex>
    );
  }

  return (
    <Flex column>
      {items.map(item => (
        <Flex height="100px" key={item.id} p={1}>
          <ItemImage photoUrl={item.photoUrl} />
          <Flex width="80%" ml={2} my={1} column>
            <Text medium>
              {item.name}
            </Text>
            <Text lighter>
              {item.description}
            </Text>
            <Flex alignItems="center">
              {item.url && (
                <BadgeButton onClick={() => window.open(item.url)}>
                  {'Product Link'}
                </BadgeButton>
              )}
              {item.participants && (
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
      ))}
    </Flex>
  );
};

const Home = () => (
  <Layout>
    <Flex pt={2} width="100%" height="100%" justify="flex-start" column>
      <Box mx={4} mt={4}>
        <Heading bold color={DARK_COLOR}>Wishlist</Heading>
        <Box ml={1}>
          <Text lighter>ID: {WISHLIST_ID}</Text>
        </Box>
        <Divider />
        <Test />
      </Box>
    </Flex>
  </Layout>
);

export default Home;
