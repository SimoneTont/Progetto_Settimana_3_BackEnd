import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function DetailsPage() {
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const postId = useParams();
    //console.log(postId)
    useEffect(() => {
        setLoading(true);
        setError(null);
        axios.get(`http://localhost/wordpress/wp-json/wp/v2/posts/${postId.id}?_embed`)
            .then(res => {
                console.log(res.data);
                setPost(res.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.response.data.message);
                setLoading(false);
            });
    }, [postId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!post) {
        return <div>No post found with ID: {postId}</div>;
    }

    return (
        <div>
            <h2>{post.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
        </div>
    );
}