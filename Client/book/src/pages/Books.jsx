import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(books);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="title">Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            <img className="card top_card" src={book.cover} alt="" />
          
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>€{book.price}</span>
            <button className=" btn btn-danger" onClick={() => handleDelete(book.id)}>Delete</button>
            <button className="btn btn-warning">
              <Link
                to={`/update/${book.id}`}
                style={{  textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="mt-2 btn btn-info">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

export default Books;
