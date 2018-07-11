import React from 'react';

const QuerySection = ({ handleChange }) => (
  <div>
    <div>List usernames separated by commas:</div>
    <input onChange={handleChange}></input>
  </div>
);

export default QuerySection;
