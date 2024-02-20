import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PostsPage() {
  const [state, setState] = useState({
    posts: [],
    authors: [],
    search: ''
  });

  useEffect(() => {
    axios.get(`http://localhost/wordpress/wp-json/wp/v2/posts`)
      .then(res => {
        setState(prevState => ({
          ...prevState,
          posts: res.data
        }));
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });

    axios.get(`http://localhost/wordpress/wp-json/wp/v2/users`)
      .then(res => {
        const authorsData = [];
        res.data.forEach(author => {
          authorsData[author.id] = author.name;
        });
        setState(prevState => ({
          ...prevState,
          authors: authorsData
        }));
      })
      .catch(error => {
        console.error('Error fetching authors:', error);
      });
  }, []);

  const filteredPosts = state.posts.filter(post =>
    post.title.rendered.toLowerCase().includes(state.search.toLowerCase())
  );

  const handleSearchChange = event => {
    setState(prevState => ({
      ...prevState,
      search: event.target.value
    }));
  };

  return (
    <>
      <h2 className='text-center'>Wordpress Posts</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={state.search}
          onChange={handleSearchChange}
        />
      </div>
      <Row>
        {filteredPosts.map(post => (
          <Col key={post.id} xs={12} sm={6} md={4} lg={3}>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{post.title.rendered}</h5>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                <p>Post by {state.authors[post.author]}</p>
                <a href={post.link} className="btn btn-primary">Go to post</a>
                <Link to={`/posts/${post.id}`} className="ms-2 btn btn-info">Details</Link>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  )
}
