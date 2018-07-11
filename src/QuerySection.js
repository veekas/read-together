import React from 'react';

const QuerySection = ({ handleChange, handleSubmit }) => (
  <div>
    <div>List usernames separated by commas:</div>
    <input id="userIds" onChange={handleChange} />
    <button type="submit" onClick={handleSubmit}>Search</button>
  </div>
);

export default QuerySection;
