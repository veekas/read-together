import React from 'react';

const ResultsSection = ({ userIds }) => (
  <div>
    {
      userIds.map(id => (
        <div key={id}>
          {id}
        </div>
      ))
    }
  </div>
);

export default ResultsSection;
