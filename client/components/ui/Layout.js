import React from 'react';
import { bool, node, string } from 'prop-types';
import styled from 'styled-components';
import Page from './Page';
import Navbar from './Navbar';
import Footer from './Footer';
import { Flex } from '.';

const PageContainer = styled(Flex)`
  width: 100%;
  min-height: 100vh;
`;

const Layout = props => (
  <Page height="100%" background={props.background}>
    <PageContainer justifyContent="space-between" alignItems="center" column>
      {props.navbar && <Navbar />}
      {props.children}
      <Footer />
    </PageContainer>
  </Page>
);

Layout.propTypes = {
  navbar: bool,
  background: string,
  children: node.isRequired,
};

Layout.defaultProps = {
  navbar: true,
  background: undefined,
};

export default Layout;
