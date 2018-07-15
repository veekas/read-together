const convert = require('xml-js');

export const convertToObject = xml => {
  try {
    const json = convert.xml2js(xml, { compact: true, spaces: 2 });
    return json.GoodreadsResponse;
  }
  catch (error) {
    return error.compact;
  }
};

export const GOODREADS_KEY = process.env.REACT_APP_GOODREADS_KEY;
export const GOODREADS_SECRET = process.env.REACT_APP_GOODREADS_SECRET;
export const HEADER_CONFIG = { headers: { 'X-Requested-With': 'XMLHttpRequest' } };
export const CORS_URL = 'https://veecors.herokuapp.com';
export const ERRORS = {
  INVALID_ID: 'One or more of the IDs you entered does not exist.',
  EMPTY_INPUT: 'Please input user IDs in the input field.',
  TWO_USERS_NEEDED: 'Please input at least two different users to compare.',
}
