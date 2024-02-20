import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
export default function WPpages() {
  const [state, setState] = useState({
    pages: []
  });

  useEffect(() => {
    axios.get(`http://localhost/wordpress/wp-json/wp/v2/pages`)
      .then(res => {
        setState(prevState => ({
          ...prevState,
          pages: res.data
        }));
        //console.log(res.data);
      })
      .catch(error => {
        console.error('Error fetching pages:', error);
      });
  }, []);
  return (
    <>
      <h2 className='text-center'>Wordpress Pages</h2>
      <Row>
        {state.pages.map(page => (
          <Col key={page.id} xs={12} sm={6} md={4} lg={3}>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{page.title.rendered}</h5>
                <div dangerouslySetInnerHTML={{ __html: page.excerpt.rendered }}></div>
                <a href={page.link} className="btn btn-primary">Go to page</a>
              </div>
            </div>
          </Col>))}
      </Row>
    </>
  )
}