import React from 'react'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  state = {
    searchedBooks: [],
    shelfBooksMap: {},
    shelfList: [],
    shelfMap: {},
    shelves: [ 
      {
        name: 'Currently Reading',
        value: 'currentlyReading',
        books: []
     }, 
     {
       name: 'Read',
       value: 'read',
       books: []
     },
     {
       name: 'Want to Read',
       value: 'wantToRead',
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

  resetShelfBooks = (shelves, shelfList, shelfValue) => {
    if (shelfValue && shelfValue != 'none') {
      const shelfMap = this.state.shelfMap
      shelves[shelfMap[shelfValue]].books = 
        this.state.books.filter((book) => 
          (book.shelf === shelfValue))
      console.log('Shelves Should Change', shelves, shelfValue)
    }
  }


  componentDidMount() {
    console.log('Mount')
    BooksAPI.getAll().then((books) => {
      console.log('Mount-Books', books)
      this.setState({ books: books})
      let shelfList=[]
      let shelfMap = {}
      let shelfBooksMap = {}
      let newShelves = this.state.shelves.map((shelf, index) => {
        shelfList.push( 
          {
            name: shelf.name, 
            value: shelf.value
          } 
        )
        shelfMap[shelf.value] = index
         return   {
            name: shelf.name,
            books: books.filter((book) => {
              console.log('check-books', book.shelf, shelf.value, book.shelf === shelf.value)
              shelfBooksMap[book.id] = book
              return (book.shelf === shelf.value)
              
            }),
          }
      })
    
      this.setState({
        shelves: newShelves,
        shelfList: shelfList,
        shelfMap: shelfMap,
        shelfBooksMap: shelfBooksMap
      })
    },
    (reason) => {
      console.log('componentDidMount', reason)
    }
    )

  }


  updateQuery = (query) => {
    console.log('App-updateQuery', query, this.state.shelfBooksMap)

    BooksAPI.search(query, 200).then((books) => {
      books.map((book) => {
        if (this.state.shelfBooksMap[book.id]) {
          book.shelf = this.state.shelfBooksMap[book.id].shelf
        }
      })
      console.log('Search Books', books)
      this.setState({searchedBooks: books}) 
    }) 
  }

  handleShelfChange = (book, oldShelfValue, newShelfValue) => {
    console.log('handleShelfChange-entry', book, oldShelfValue, newShelfValue)
    let oldList = this.state.shelves[this.state.shelfList[oldShelfValue]]
    let newList = this.state.shelves[this.state.shelfList[newShelfValue]]
    console.log('handleShelfChange-shelves', book.shelf)

    BooksAPI.update( book, newShelfValue);
    book.shelf = newShelfValue
    this.state.shelfBooksMap[book.id] = book
    let changeBook = this.state.books.findIndex((bookEntry) => {
      return bookEntry.id === book.id
    })
    let searchBook = this.state.searchedBooks.findIndex((bookEntry) => {
      return bookEntry.id === book.id
    })    
    console.log('What am I changing-a', searchBook)  
    if (searchBook >= 0) {
      this.state.searchedBooks[searchBook].shelf = newShelfValue
    } 
    if (changeBook >= 0) {
      console.log('What am I changing-a', changeBook)      
      this.state.books[changeBook].shelf = newShelfValue
    } else {
      console.log('What am I changing-b', changeBook)         
      this.state.books.push(book)
    }
    console.log('What am I changing-c', this.state.books)
    var newShelves = this.state.shelves
    this.resetShelfBooks(newShelves, oldList, oldShelfValue)
    this.resetShelfBooks(newShelves, newList, newShelfValue)
    console.log('newShelves', newShelves)
    this.setState({shelves: newShelves})
   }

  render() {
    console.log('render', this.state)
    return (
      <div className="app">
        <Route path="/search" render={({ history }) => (
          <SearchBook
            searchedBooks={this.state.searchedBooks}
            shelves={this.state.shelves} 
            shelfList={this.state.shelfList}
            handleShelfChange={this.handleShelfChange}
            handleUpdateQuery={this.updateQuery}
          />
        )} />
        <Route exact path="/" render={() => (
          <ListBooks 
            shelves={this.state.shelves} 
            shelfList={this.state.shelfList}
            handleShelfChange={this.handleShelfChange}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
