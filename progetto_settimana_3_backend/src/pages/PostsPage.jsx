import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PostsPage() {
    const [state, setState] = useState({
        posts: [],
        authors: []
    });

    useEffect(() => {
        axios.get(`http://localhost/wordpress/wp-json/wp/v2/posts`)
            .then(res => {
                setState(prevState => ({
                    ...prevState,
                    posts: res.data
                }));
                //console.log(res.data);
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

    return (
        <>
            <h2 className='text-center'>Wordpress Posts</h2>
            <div class="input-group">
                <div class="form-outline" data-mdb-input-init>
                    <input type="search" id="form1" class="form-control" />
                    <label class="form-label" for="form1">Search</label>
                </div>
                <button type="button" class="btn btn-primary" data-mdb-ripple-init>
                    <FaSearch />
                </button>
            </div>
            <Row>
                {state.posts.map(post => (
                    <Col key={post.id} xs={12} sm={6} md={4} lg={3}>
                        <div className="card" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{post.title.rendered}</h5>
                                <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                                <p>Post by {state.authors[post.author]}</p>
                                <a href={post.link} className="btn btn-primary">Go to post</a>
                                <Link to={`/posts/${post.id}`}><a className="ms-2 btn btn-info">Details</a></Link>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </>
    )
}