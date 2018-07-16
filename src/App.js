import React, { Component } from 'react';
import QuerySection from './QuerySection';
import ResultsSection from './ResultsSection';
import { convertToObject, CORS_URL, ERRORS, GOODREADS_KEY, HEADER_CONFIG } from './utils/';
import './App.css';


class App extends Component {
  state = {
    errorMessage: null,
    loading: false,
    userBooks: {},
    userComplete: {},
    userIds: [],
    userNames: {},
  }

  handleChange = event => {
    const value = event.target.value;
    const userIds = new Set();

    value
      .split(',')
      .map(id => {
        const cleanId = id.trim();
        if (cleanId.match(/^[0-9]*$/g) && cleanId.length) {
          userIds.add(cleanId);
        }
        return cleanId;
      });

    this.setState({
      userIds: [...userIds],
      errorMessage: null,
    });
  }

  handleSubmit = () => {
    const { userComplete, userIds } = this.state;
    let errorMessage = null;

    const totalUsersSearched = userIds.length + Object.keys(userComplete).length;

    if (!totalUsersSearched) {
      errorMessage = ERRORS.EMPTY_INPUT;
    } else if (totalUsersSearched === 1) {
      errorMessage = ERRORS.TWO_USERS_NEEDED;
    } else {
      userIds.map(id => this.getBooks(id));
    }

    this.setState({ errorMessage })
  }

  getUserInfo = userId => {
    const { userNames } = this.state;

    if (userId in userNames) return null;

    fetch(
      `${CORS_URL}/https://www.goodreads.com/user/show/${userId}.xml?key=${GOODREADS_KEY}`,
      HEADER_CONFIG
    )
      .then(stream => stream.text())
      .then(xmlResponse => convertToObject(xmlResponse))
      .then(userInfo => {
        const nameOrUserName = userInfo.user.name._text || userInfo.user.user_name._text;
        const newUserName = { [userId]: nameOrUserName };
        this.setState(prevState => ({
          userNames: { ...prevState.userNames, ...newUserName },
        }));
      })
      .catch(() => this.setState({ errorMessage: ERRORS.INVALID_ID }));
  }

  getBooks = userId => {
    const { userComplete } = this.state;

    if (userId in userComplete) return;

    this.getUserInfo(userId);

    let pageNumber = 1;
    let lastBookInResponse = 0;
    let totalBooksOnShelf = 9999;
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
              userBooks: { ...prevState.userBooks, ...newBooks },
              userComplete: { ...prevState.userComplete, [userId]: true },
            }));
          }
        })
        .catch(() => this.setState({ errorMessage: ERRORS.INVALID_ID }));
    }

    getBooksOnPage(pageNumber);
  }

  clearValues = () => {
    document.getElementById('userIds').value = '';
    this.setState({
      errorMessage: null,
      userBooks: {},
      userComplete: {},
      userIds: [],
      userNames: {},
    });
  }

  render() {
    const { errorMessage, userBooks, userIds, userNames } = this.state;
    // Object.keys(userBooks).length > 1 ? console.log(this.state) : null;

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

          {userIds.length
            ? (
              <ResultsSection
                userBooks={userBooks}
                userIds={userIds}
                userNames={userNames}
              />
            )
            : null
          }
        </div>

      </div>
    );
  }
}

export default App;
