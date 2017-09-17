import React, { Component } from 'react'

class BookMenu extends Component {
  state = {
    currentShelf:  "none"
  }

  handleOnChange = (e) => {
    e.preventDefault()
    if (this.props.handleShelfChange) {
       this.props.handleShelfChange(this.props.book, this.props.book.shelf, e.target.value)
    }
  }



  render() {
    console.log('BookMenu-render', this.props)
    const cssImageUrl = (this.props.book.imageLinks && this.props.book.imageLinks.smallThumbnail) ? 'url(\'' + this.props.book.imageLinks.thumbnail + '\')' : ''
    const bookValue = this.props.book.shelf|| "none"
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: cssImageUrl  }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.handleOnChange} value={bookValue} defaultValue="none">
              <option value="none" disabled>Move to...</option>
              {
                this.props.shelfList.map((shelfValue) => (
                  <option value={shelfValue.value} >{shelfValue.name}</option>
                ))
              }
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors}</div>
      </div>
    )
  }
}

export default BookMenu