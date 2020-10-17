import React from 'react';
import { node, string } from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import normalizeCss from '../utils/reset';
import { Flex } from '.';
import { WHITE } from '../utils/theme';

const ResetStyles = createGlobalStyle`
  ${normalizeCss};
`;

const Page = props => (
  <Flex {...props} background={props.background} flexDirection="column">
    <ResetStyles />
    <Flex width="100%" height="100%">
      {props.children}
    </Flex>
  </Flex>
);

Page.propTypes = {
  background: string,
  children: node.isRequired,
};

Page.defaultProps = {
  background: WHITE,
};

export default Page;
