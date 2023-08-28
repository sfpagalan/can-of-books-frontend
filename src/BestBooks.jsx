import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    /* TODO: Make a GET request to your API to fetch all the books from the database  */
    axios.get('books')
      .then(response => {
        const books = response.data;
        this.setState({ books });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    /* TODO: render all the books in a Carousel */
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <div className='carousel'>
            <div className='inner-carousel'>
              {this.state.books.map((book, index) => (
                <div
                  key = {index}
                  className = 
              ))}
            </div>
          </div>
          <p>Book Carousel coming soon</p>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
