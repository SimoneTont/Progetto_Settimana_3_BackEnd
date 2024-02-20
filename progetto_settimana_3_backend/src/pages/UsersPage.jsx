import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
export default function UsersPage() {
  const [state, setState] = useState({
    users: []
  });

  useEffect(() => {
    axios.get(`http://localhost/wordpress/wp-json/wp/v2/users`)
      .then(res => {
        setState(prevState => ({
          ...prevState,
          users: res.data
        }));
        //console.log(res.data);
      })
      .catch(error => {
        console.error('Error fetching pages:', error);
      });
  }, []);
  return (
    <>
      <h2 className='text-center'>Wordpress Users</h2>
      <Row>
        {state.users.map(users => (
          <Col key={users.id} xs={12} sm={6} md={4} lg={3}>
            <div className="card" style={{ width: "18rem" }}>
              <img src={users.avatar_urls[96]} class="card-img-top" alt={users.slug}></img>
              <div className="card-body">
                <h5 className="card-title">{users.name}</h5>
                <a href={users.link} className="btn btn-primary">Go to page</a>
              </div>
            </div>
          </Col>))}
      </Row>
    </>
  )
}