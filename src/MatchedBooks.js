import React, { Component } from 'react';

// https://www.goodreads.com/book/show/[ID]

export default class MatchedBooks extends Component {
  state = { matchedBooks: {} }; // { bookId: {bookInfo, [users] } }

  componentDidMount() {
    this.findMatchingBooks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userBooks !== this.props.userBooks) {
      this.findMatchingBooks();
    }
  }

  findMatchingBooks = () => {
    const { matchedBooks } = this.state;
    const { userBooks, userNames } = this.props;

    // if (Object.keys(matchedBooks).length) {
    //   console.log('logic for comparing against matched books');
    // }

    // else {
      const potentialMatches = {};

      for (let userId in userBooks) {
        if (!userBooks.hasOwnProperty(userId)) continue;

        const singleUserBooks = Object.values(userBooks[userId]);
        singleUserBooks.map(book => {
          const id = book.book.id._text;

          if (id in potentialMatches) {
            const prevUser = potentialMatches[id];
            const users = [prevUser, userId];

            if (id in matchedBooks) {
              console.log('matchedBooks', matchedBooks)
              console.log('id', id)
              console.log('matchedBooks[id]', matchedBooks[id])
              const updatedBook = matchedBooks[id];
              console.log('updatedBook', updatedBook);
              const previousUsers = matchedBooks[id].users;
              console.log('previousUsers', previousUsers);
              const updatedUsers = [...previousUsers, ...users];
              console.log('updatedUsers', updatedUsers);
              updatedBook[users] = updatedUsers;

              console.log('updatedBook just before setting state', updatedBook)
              // this.setState(prevState => ({
              //   matchedBooks: { ...prevState.matchedBooks, updatedBook },
              // }));
            }

            else {
              const title = book.book.title._text;
              const imageUrl = book.book.small_image_url._text;
              const url = book.book.link._text;
              const rating = book.book.average_rating._text;
              const description = book.book.description._text;
              const author = book.book.authors.author.name._text;
              const bookObject = { title, author, url, imageUrl, rating, description, users };

              this.setState(prevState => ({
                matchedBooks: { ...prevState.matchedBooks, [id]: bookObject },
              }));
            }
          } else {
            potentialMatches[id] = userId;
          }

          return book;
        });
      }
    // }
  }

  render() {
    const { matchedBooks } = this.state;
    console.log(matchedBooks);

    return (
      <div>
        <div>
          Matching books:
        </div>

        <div>
          will go here
        </div>
      </div>
    );
  }
}
