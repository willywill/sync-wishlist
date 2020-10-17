import getConfig from 'next/config';

const { publicRuntimeConfig = {} } = getConfig() || {};

export const GRAPHQL_URL = publicRuntimeConfig.apiUrl;

export default {};
