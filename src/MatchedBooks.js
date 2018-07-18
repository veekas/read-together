import React, { Component } from 'react';

// https://www.goodreads.com/book/show/[ID]

export default class MatchedBooks extends Component {
  state = {
    matchedBooks: {}, // { bookId: {bookInfo, [users] } }
    userMatched: {},
  };

  componentDidMount() {
    this.findMatchingBooks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userBooks !== this.props.userBooks) {
      this.findMatchingBooks();
    }
  }

  findMatchingBooks = () => {
    const { matchedBooks, userMatched } = this.state;
    const { userBooks } = this.props;
    const potentialMatches = {};

    for (let userId in userBooks) {
      if (!userBooks.hasOwnProperty(userId) || userMatched.hasOwnProperty(userId)) continue;

      const singleUserBooks = Object.values(userBooks[userId]);
      singleUserBooks.map(book => {
        const id = book.book.id._text;

        if (id in potentialMatches) {
          const prevUser = potentialMatches[id];
          const users = [prevUser, userId];

          if (id in matchedBooks) {
            const updatedBook = matchedBooks[id];
            const previousUsers = matchedBooks[id].users;
            const updatedUsers = [...new Set([...previousUsers, ...users])];
            updatedBook.users = updatedUsers;

            this.setState(prevState => ({
              matchedBooks: { ...prevState.matchedBooks, updatedBook },
            }));
          }

          else {
            const author = book.book.authors.author.name._text;
            const description = book.book.description._text;
            const imageUrl = book.book.small_image_url._text;
            const rating = book.book.average_rating._text;
            const title = book.book.title._text;
            const url = book.book.link._text;
            const bookObject = { author, description, imageUrl, rating, title, url, users };

            this.setState(prevState => ({
              matchedBooks: { ...prevState.matchedBooks, [id]: bookObject },
            }));
          }
        }

        potentialMatches[id] = userId;

        return book;
      });

      this.setState(prevState => ({
        userMatched: { ...prevState.userMatched, [userId]: true },
      }));
    }
  }

  renderMatchedBooks = () => {
    const { matchedBooks } = this.state;
    const { userNames } = this.props;
    const matchedBooksArray = Object.keys(matchedBooks);

    return matchedBooksArray.map(book => {
      const { author, description, imageUrl, rating, title, url, users } = matchedBooks[book];
      const names = users.map(userId => userNames[userId]).join(', ');

      return (
        <div key={url}>
          <div>
            <img src={imageUrl} />
          </div>

          <div>
            <div><a href={url}>{title}</a></div>
            <div>
              <div>by {author}</div>
              <div>{rating} stars</div>
            </div>
            <div>Shelved by: {names}</div>
            {/* <div>Description: {description}</div> */}
          </div>
        </div>
      );
    });
  }

  render() {
    const { matchedBooks } = this.state;
    console.log('matchedBooksState', this.state);
    console.log('loading status is' + this.props.loading);

    return (
      <div>
        <div>
          Matching books:
        </div>

        <div>
          {Object.keys(matchedBooks).length ? this.renderMatchedBooks() : 'No matched books yet'}
        </div>
      </div>
    );
  }
}
