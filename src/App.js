import React from 'react'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: [ 
      {
        name: 'Currently Reading',
        books: []
     }, 
     {
       name: 'Read',
       books: []
     },
     {
       name: 'Want to Read',
       books: []
     }
    ],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    console.log('Mount')
    BooksAPI.getAll().then((books) => {
      console.log('Mount-Books', books)
      this.setState({ books: books})
      let newShelves = this.state.shelves.map((shelf) => (
          {
            name: shelf.name,
            books: books,
          }
        
      ))
      this.setState({shelves: newShelves})
    },
    (reason) => {
      console.log('componentDidMount', reason)
    }
    )

  }

  render() {
    console.log('render', this.state)
    return (
      <div className="app">
        <Route path="/search" render={({ history }) => (
          <SearchBook />
        )} />
        <Route exact path="/" render={() => (
          <ListBooks shelves={this.state.shelves} />
        )} />
      </div>
    )
  }
}

export default BooksApp
