import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Button } from 'react-bootstrap'; 
import axios from 'axios';
import EditBookFormModal from './EditBookFormModal';
import AddBookFormModal from './AddBookFormModal';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      activeIndex: 0,
      isLoading: true,
      error: null,
      editBook: null,
      isEditing: false,
      isAdding: false,
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
    const { editBook } = this.state;

    try {
      if (editBook) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/books/${editBook._id}`, formData);
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/books`, formData);
      }

      await this.fetchBooks();
      this.setState({ isModalOpen: false, editBook: null });
    } catch (error) {
      console.error(error);
    }
  }

  handleEditFormSubmit = async (formData) => {
    try {
      await this.handleFormSubmit(formData);

      this.setState({
        isEditing: false,
        editBook: null
      });
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

  handleDelete = async (bookId) => {
    try {
      this.setState({ isLoading: true });
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/books/${bookId}`);
      const updatedBooks = this.state.books.filter(book => book._id !== bookId);
      this.setState({ books: updatedBooks, isLoading: false, error: null });
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false, error: 'Failed to delete the book. Please try again.' });
    }
  }

  handleEdit = (book) => {
    console.log("Editing book:", book);
    this.setState({ isEditing: true, editBook: book });
  }

  handleAdd = () => {
    this.setState({ isAdding: true });
  }

  render() {
    const { books, isLoading, error, activeIndex, isEditing, isAdding } = this.state;
    console.log(this.state)
    return (
      <>
        {error ? (
          <div>Error: {error.message}</div>
        ) : (
          <>
            <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

            {books.length ? (
              <div>
                <button
                  className="add-button"
                  onClick={() => this.handleAdd()}
                >
                  Add Book
                </button>
                <Carousel activeIndex={activeIndex} onSelect={() => {}}>
                  {books.map((book, index) => (
                    <Carousel.Item key={book._id}>
                      {/* <img src='./assets/book-bgrnd.jpeg'/>
                      <Carousel.Caption> */}
                          <h3 className='book-title'>{book.title}</h3>
                          <p className='book-description'>{book.description}</p>
                          <p className='book-status'>Status: {book.status}</p>
                          <Button
                            variant="danger"
                            onClick={() => this.handleDelete(book._id)}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                Deleting...
                              </>
                            ) : ('Delete')}
                          </Button>
                          <Button 
                            variant="secondary" 
                            onClick={() => this.handleEdit(book)}>
                            Edit
                          </Button>
                      {/* </Carousel.Caption> */}
                    </Carousel.Item>
                  ))}
                </Carousel>

                <Button variant="primary" onClick={this.handlePrevious} disabled={activeIndex === 0}>Previous</Button>
                <Button variant="primary" onClick={this.handleNext} disabled={activeIndex === books.length - 1}>Next</Button>
              </div>
            ) : (
              <h3>No Books Found :(</h3>
            )}

            <EditBookFormModal
              show={isEditing}
              onHide={() => this.setState({ isEditing: false, editBook: null })}
              onSubmit={this.handleEditFormSubmit}
              editBook={this.state.editBook}
            />

            <AddBookFormModal
              show={isAdding}
              onHide={() => this.setState({ isAdding: false })}
              onSubmit={this.handleAddFormSubmit}
            />

          </>
        )}
      </>
    );
  }
}

export default BestBooks;