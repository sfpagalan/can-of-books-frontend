import React from 'react';

class AddBooks extends React.Component {
  render() {
    return (
      <button
        className="btn btn-primary"
        onClick={this.props.onClick}
      >
        Add Book
      </button>
    );
  }
}

export default AddBooks;
