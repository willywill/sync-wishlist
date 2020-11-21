import getConfig from 'next/config';

const { publicRuntimeConfig = {} } = getConfig() || {};

export const GRAPHQL_URL = publicRuntimeConfig.apiUrl;

export const BASE_URL = publicRuntimeConfig.baseUrl;

export default {};
