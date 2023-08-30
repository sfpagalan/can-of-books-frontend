import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Button } from 'react-bootstrap'; 
import axios from 'axios';
import classNames from 'classnames';
import BookFormModal from './BookFormModal';
import AddBooks from './AddBooks';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isModalOpen: false,
      activeIndex: 0,
      isLoading: true,
      error: null,
    };
  }

  async componentDidMount() {
    await this.fetchBooks();
  }

  async fetchBooks() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/books`);
      const books = response.data;
      console.log(books);
      this.setState({ books, isLoading: false, error: null });
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  }

  handleFormSubmit = async (formData) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/books`, formData);
      await this.fetchBooks();
    } catch (error) {
      console.error(error);
    }
  }

  handleNext = () => {
    const { activeIndex, books } = this.state;
    if (activeIndex < books.length - 1) {
      this.setState({ activeIndex: activeIndex + 1 });
    }
  }

  handlePrevious = () => {
    const { activeIndex } = this.state;
    if (activeIndex > 0) {
      this.setState({ activeIndex: activeIndex - 1 });
    }
  }

  render() {
    const { books, isLoading, error, activeIndex } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <>
        {error ? (
          <div>Error: {error.message}</div>
        ) : (
          <>
            <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>


            {books.length ? (
              <div>
                <Carousel activeIndex={activeIndex} onSelect={() => {}}>
                  {books.map((book, index) => (
                    <Carousel.Item key={book._id}>
                      <h3>{book.title}</h3>
                      <p>{book.description}</p>
                      <p>Status: {book.status}</p>
                    </Carousel.Item>
                  ))}
                </Carousel>

                <Button variant="primary" onClick={this.handlePrevious} disabled={activeIndex === 0}>Previous</Button>

                <Button variant="primary" onClick={this.handleNext} disabled={activeIndex === books.length - 1}>Next</Button>
              </div>
            ) : (
              <h3>No Books Found :(</h3>
              )}
            <BookFormModal
              show={this.state.isModalOpen}
              onHide={() => this.setState({ isModalOpen: false })}
              onSubmit={this.handleFormSubmit}
            />
            <AddBooks onClick={() => this.setState({ isModalOpen: true })} />
          </>
        )}
      </>
    );
  }
}

export default BestBooks;
