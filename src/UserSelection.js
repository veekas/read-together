import React from 'react';

const UserSelection = ({ userNames }) => (
  <div>
    <div>
      Currently matching books between the following users:
    </div>

    <div>
      {
        Object.values(userNames).join(', ')
      }
    </div>
  </div>
);

export default UserSelection;
