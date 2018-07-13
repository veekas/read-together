import React, { Component } from 'react';
import QuerySection from './QuerySection';
import ResultsSection from './ResultsSection';
import { convertToObject, GOODREADS_KEY, HEADER_CONFIG, CORS_URL } from './utils/';
import './App.css';


class App extends Component {
  state = {
    userIds: [],
    userNames: [], // { userId: userNameOrName }
    errorMessage: null,
    loading: false, // true after search made
    userBooks: [], // [{user: '', books: [] }]
    matchedBooks: [], // {bookinfo: {}, users: []}
  }

  handleChange = event => {
    const value = event.target.value;
    const userIds = new Set();

    value
      .split(',')
      .map(id => userIds.add(id.trim()));

    this.setState({ userIds: [...userIds] });
  }

  handleSubmit = () => {
    const { userIds } = this.state;
    // let errorMessage = null;

    // if (!userIds.length) {
    //   errorMessage = 'Please input user IDs in the input field';
    // } else if (userIds.length === 1) {
    //   errorMessage = 'Please input at least two different users to compare';
    // } else {
    //   errorMessage = null;
      userIds.map(id => this.getBooks(id));
    // }

    // this.setState({ errorMessage })
  }

  getUserInfo = userId => {
    const { userNames } = this.state;

    fetch(
      `${CORS_URL}/https://www.goodreads.com/user/show/${userId}.xml?key=${GOODREADS_KEY}`,
      HEADER_CONFIG
    )
      .then(stream => stream.text())
      .then(xmlResponse => convertToObject(xmlResponse))
      .then(userInfo => {
        const usernameOrName = userInfo.user.user_name._text || userInfo.user.name._text;
        const newUserName = { [userId]: usernameOrName };
        this.setState({
          userNames: [...userNames, newUserName]
        });
      });
  }

  getBooks = userId => {
    const { userBooks } = this.state;

    this.getUserInfo(userId);

    let pageNumber = 1;
    let lastBookInResponse = 0;
    let totalBooksOnShelf = 99999;
    let allBooks = [];

    const extraParamsArr = [
      'shelf=to-read',
      'sort=date_added',
      'order=d',
      'per_page=2',
    ];
    const extraParams = extraParamsArr.join('&');

    const getBooksOnPage = (page = pageNumber) => {
      return fetch(
        `${CORS_URL}/https://www.goodreads.com/review/list/${userId}.xml?key=${GOODREADS_KEY}&v=2&page=${page}&${extraParams}`,
        HEADER_CONFIG
      )
        .then(stream => stream.text())
        .then(xmlResponse => convertToObject(xmlResponse))
        .then(books => {
          lastBookInResponse = books.reviews._attributes.end;
          totalBooksOnShelf = books.reviews._attributes.total;
          const currentBooks = books.reviews.review;
          allBooks = [...allBooks, ...currentBooks];
          pageNumber++;
        })
        .then(() => {
          if (lastBookInResponse < 5) {
            getBooksOnPage(pageNumber);
          }
        })
        .then(() => {
          if (lastBookInResponse >= 5) {
            const newBooks = { [userId]: allBooks };
            this.setState(prevState => ({
              userBooks: [ ...prevState.userBooks, newBooks ]
            }), () => console.log(this.state.userBooks));
          }
        });
    }

    getBooksOnPage(pageNumber)
  }

  clearValues = () => {
    document.getElementById('userIds').value = '';
    this.setState({
      userIds: [],
      userNames: [],
      errorMessage: null,
      userBooks: [],
      matchedBooks: [],
    });
  }

  render() {
    const { userIds, errorMessage } = this.state;

    return (
      <div className="App">

        <header className="query-section">
          <QuerySection
            getBooks={this.getBooks}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            errorMessage={errorMessage}
            clearValues={this.clearValues}
          />
        </header>

        <div className="results-section">

          {userIds.length ? (
          <ResultsSection
            userIds={userIds}
          />
            ) : null
          }
        </div>

      </div>
    );
  }
}

export default App;
