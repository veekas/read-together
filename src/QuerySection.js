import React from 'react';

const QuerySection = ({ clearValues, errorMessage, handleChange, handleSubmit }) => (
  <div>
    <div>List user IDs separated by commas: 23140177, 49558624</div>
    <input id="userIds" onChange={handleChange} placeholder="23140177" />
    <button type="submit" onClick={handleSubmit}>Search</button>
    <button onClick={clearValues}>Clear</button>
    {
      errorMessage
        ? <div>{errorMessage}</div>
        : null
    }
  </div>
);

export default QuerySection;
