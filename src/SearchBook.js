import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import escapeRegEx from 'escape-string-regexp'
// import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import BookMenu from './BookMenu'
import { Link } from 'react-router-dom'

class SearchBook extends Component {
    
  // static propTypes = {
  //   // contacts: PropTypes.array.isRequired,
  //   //  onDeleteContact: PropTypes.func.isRequired,
  //   // text: PropTypes.string.isRequired
  // }
  state = {
    query: '',
  }
  

  clearQuery = () => {
    this.setState( {query: ''})
  }

  updateQuery(query) {
    this.setState( {query: query})
    this.props.handleUpdateQuery(query)
  }

  render() {
    console.log('SearchBook-render', this.state.books)
    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link className='close-search' state="reload" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input 
            type="text" 
            placeholder="Search by title or author"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
        {
          this.props.searchedBooks.map((book, index) => (
            <li key={index.toString()} >
              <BookMenu 
                book={book}
                shelfList={this.props.shelfList}
                handleShelfChange={this.props.handleShelfChange}
                lookupShelfInformation={this.props.lookupShelfInformation}  
              />
            </li>
          
          ))
        }
        </ol>
      </div>
    </div>
    )
  }
}

export default SearchBook