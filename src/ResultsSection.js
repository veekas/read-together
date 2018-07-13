import React from 'react';

const ResultsSection = ({ userIds }) => (
  <div>
    <div>
      Click 'Submit' to search for books that each of the following users want to read:
    </div>

    <div>
      {userIds.join(', ')}
    </div>
  </div>
);

export default ResultsSection;
