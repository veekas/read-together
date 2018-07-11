import { convert } from 'xml-js';

export const convertToObject = xml => (
  convert.xml2json(xml, {compact: true, spaces: 2})
);

export const GOODREADS_KEY = process.env.REACT_APP_GOODREADS_KEY;
export const GOODREADS_SECRET = process.env.REACT_APP_GOODREADS_SECRET;

export const headerConfig = { headers: { 'X-Requested-With': 'XMLHttpRequest' } };
