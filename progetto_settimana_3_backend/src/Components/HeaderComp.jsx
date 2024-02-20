import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function HeaderComp() {
  return (
    <header className="d-flex justify-content-around">
      <Link to="/">
        <p>Home</p>
      </Link>
      <Link to="/pages">
        <p>Pages</p>
      </Link>
      <Link to="/users">
        <p>Users</p>
      </Link>
      <Link to="/posts">
        <p>Posts</p>
      </Link>
    </header>
  )
}