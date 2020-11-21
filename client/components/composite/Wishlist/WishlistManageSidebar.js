import { shape } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text } from '../../ui';

const SidebarContainer = styled(Flex)`
  background-color: white;
  padding: 20px 20px;
`;

const SidebarItem = styled(Flex)`
  padding-top: 25px;
  padding-bottom: 25px;
  height: 20px;
  margin-top: 4px;
  margin-bottom: 4px;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  background-color: ${props => (props.selected ? '#edf1f7' : 'white')};

  &:hover {
    background-color: #e3e6ea;
  }

  &:active {
    background-color: #dfe4ea;
  }
`;

const WishlistManageSidebar = () => (
  <SidebarContainer width="100%" height="100%" justifyContent="flex-start" column>
    <SidebarItem selected width="100%" justifyContent="flex-start" alignItems="center" onClick={() => {}}>
      <Box width="24px" mr={3} ml={3}>
        <Text color="#55626d">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              // eslint-disable-next-line max-len
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Text>
      </Box>
      <Text secondary style={{ fontSize: '20px' }} color="#55626d">
        {'Home'}
      </Text>
    </SidebarItem>
    <SidebarItem width="100%" justifyContent="flex-start" alignItems="center" onClick={() => {}}>
      <Box width="24px" mr={3} ml={3}>
        <Text color="#55626d">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </Text>
      </Box>
      <Text secondary style={{ fontSize: '20px' }} color="#55626d">
        {'Change Name'}
      </Text>
    </SidebarItem>
    <SidebarItem width="100%" justifyContent="flex-start" alignItems="center" onClick={() => {}}>
      <Box width="24px" mr={3} ml={3}>
        <Text color="#55626d">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              // eslint-disable-next-line max-len
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </Text>
      </Box>
      <Text secondary style={{ fontSize: '20px' }} color="#55626d">
        {'Share'}
      </Text>
    </SidebarItem>
    <SidebarItem width="100%" justifyContent="flex-start" alignItems="center" onClick={() => {}}>
      <Box width="24px" mr={3} ml={3}>
        <Text color="#55626d">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              // eslint-disable-next-line max-len
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </Text>
      </Box>
      <Text secondary style={{ fontSize: '20px' }} color="#55626d">
        {'Delete'}
      </Text>
    </SidebarItem>
  </SidebarContainer>
);

WishlistManageSidebar.displayName = 'WishlistManageSidebar';

WishlistManageSidebar.propTypes = {
  wishlist: shape({}),
};

WishlistManageSidebar.defaultProps = {

};

export default WishlistManageSidebar;
