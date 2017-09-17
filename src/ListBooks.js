import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import escapeRegEx from 'escape-string-regexp'
// import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'


class ListBooks extends Component {
    
    static propTypes = {
      shelves: PropTypes.array.isRequired,
      //  onDeleteContact: PropTypes.func.isRequired,
      //   //   text: PropTypes.string.isRequired
    }
    
    state = {
      temp: {
        temp: true
      }
    }

    // updateShelf(shelf, name, books) {
    //   console.log('updateShelf', shelf, name, books)
    //   shelf.books = books
    //   shelf.name = name
    // }

    render() {
      console.log('ListBooks-render', this.props)
      return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          {
            this.props.shelves.map((shelf) => (
            <BookShelf 
              books={shelf.books} 
              name={shelf.name} 
              value={shelf.value}
              shelfList={this.props.shelfList}
              handleShelfChange={this.props.handleShelfChange}
            />
            ))

          }
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a Book</Link>
        </div>
      </div>
            
    )
  }
}

export default ListBooks