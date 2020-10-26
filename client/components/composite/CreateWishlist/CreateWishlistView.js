import React, { useState } from 'react';
import { Box, Flex } from '../../ui';
import CollapsingFlex from '../../ui/styled/CollapsingFlex';
import CreateWishlistForm from './CreateWishlistForm';
import CreateWishlistSuccess from './CreateWishlistSuccess';

const Blob = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    {/* eslint-disable-next-line max-len */}
    <path fill="#0F62FE" d="M32.3,-52.1C40.3,-38.5,44.4,-27.1,47.4,-15.8C50.5,-4.6,52.6,6.6,53.2,21.2C53.9,35.8,53.1,53.9,44,62.5C34.9,71.1,17.4,70.3,5.9,62.2C-5.7,54.2,-11.4,38.8,-26.7,32.2C-41.9,25.6,-66.8,27.7,-77.6,19.3C-88.4,11,-85.2,-7.8,-73.4,-17.6C-61.5,-27.3,-41.2,-28,-27.6,-39.8C-13.9,-51.6,-7,-74.4,2.6,-77.9C12.1,-81.5,24.2,-65.7,32.3,-52.1Z" transform="translate(100 100)" />
  </svg>
);

const CreateWishlistView = () => {
  const [isSuccessful, setSuccessfulState] = useState(false);

  return (
    <CollapsingFlex height="100%" alignItems="center" justifyContent="center">
      <Flex width="50%" style={{ minWidth: '300px', maxWidth: '500px' }} mr="50px" column>
        {isSuccessful ? <CreateWishlistSuccess /> : <CreateWishlistForm onSuccess={() => setSuccessfulState(true)} />}
      </Flex>
      <Flex mt={4} column style={{ position: 'relative' }}>
        <Box px={4} width={1}>
          <img
            width="100%"
            height="auto"
            style={{ maxWidth: '375px', minWidth: '300px' }}
            src="/graphic2.svg"
            alt="Brand Logo"
          />
          <Box width="400px" style={{ position: 'absolute', top: '160px', left: '210px' }}>
            <Blob />
          </Box>
        </Box>
      </Flex>
    </CollapsingFlex>
  );
};

CreateWishlistView.displayName = 'CreateWishlistView';

export default CreateWishlistView;
