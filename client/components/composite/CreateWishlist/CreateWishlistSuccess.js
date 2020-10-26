import { Box } from '@rebass/grid';
import React from 'react';
import { Flex, Icon, Text } from '../../ui';
import { INFO_COLOR } from '../../utils/theme';

const CreateWishlistSuccess = () => (
  <Flex column>
    <Flex mb={2} alignItems="center">
      <Text large>
        {'Congratulations!'}
      </Text>
      <Box ml={2}>
        <Icon icon="check-circle" color={INFO_COLOR} size="2x" />
      </Box>
    </Flex>
    <Text>
      {'You\'ve created a new wishlist.'} <strong>{'Please check your email to access the link to manage your wishlist.'}</strong>
    </Text>
  </Flex>
);

CreateWishlistSuccess.displayName = 'CreateWishlistSuccess';

export default CreateWishlistSuccess;
