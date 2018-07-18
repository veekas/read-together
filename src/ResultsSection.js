import React from 'react';
import UserSelection from './UserSelection';
import MatchedBooks from './MatchedBooks';

const ResultsSection = ({ loading, userBooks, userIds, userNames }) => (
  <div>
    <div>
      <div>Click 'Submit' to search for books that each of the following users want to read:</div>
      <div>{userIds.join(', ')}</div>
    </div>

    {loading ? <h1>Loading</h1> : null}

    {
      Object.keys(userNames).length
        ? <UserSelection userNames={userNames} />
        : null
    }

    {
      Object.keys(userBooks).length > 1 || Object.keys(userNames).length > 1
        ? (
          <MatchedBooks
            userBooks={userBooks}
            userNames={userNames}
            loading={loading}
          />
        )
        : null
    }
  </div>
);

export default ResultsSection;
