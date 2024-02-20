import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

export default function UsersPage() {
  const [state, setState] = useState({
    users: [],
    search: ''
  });

  useEffect(() => {
    axios.get(`http://localhost/wordpress/wp-json/wp/v2/users`)
      .then(res => {
        setState(prevState => ({
          ...prevState,
          users: res.data
        }));
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const filteredUsers = state.users.filter(user =>
    user.name.toLowerCase().includes(state.search.toLowerCase())
  );

  const handleSearchChange = event => {
    setState(prevState => ({
      ...prevState,
      search: event.target.value
    }));
  };

  return (
    <>
      <h2 className='text-center'>Wordpress Users</h2>
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
        {filteredUsers.map(user => (
          <Col key={user.id} xs={12} sm={6} md={4} lg={3}>
            <div className="card" style={{ width: "18rem" }}>
              <img src={user.avatar_urls[96]} className="card-img-top" alt={user.slug} />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <a href={user.link} className="btn btn-primary">Go to page</a>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}
