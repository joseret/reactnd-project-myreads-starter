import React, { Component } from 'react'

import BookMenu from './BookMenu'

class BookShelf extends Component {
    
    render() {
      console.log('BookShelf-render', this.props.books)
      return (
        <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.name}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {
                    this.props.books.map((book, index) => (
                      <li key={index.toString()} >
                        <BookMenu book={book}/>
                      </li>
                   
                    ))
                  }
                </ol>
              </div>
            </div>

      )
    }
  }
  
  export default BookShelf