const convert = require('xml-js');

export const convertToObject = xml => {
  const json = convert.xml2js(xml, { compact: true, spaces: 2 });
  return json.GoodreadsResponse;
};

export const GOODREADS_KEY = process.env.REACT_APP_GOODREADS_KEY;
export const GOODREADS_SECRET = process.env.REACT_APP_GOODREADS_SECRET;
export const HEADER_CONFIG = { headers: { 'X-Requested-With': 'XMLHttpRequest' } };
export const CORS_URL = 'https://cors-anywhere.herokuapp.com';
