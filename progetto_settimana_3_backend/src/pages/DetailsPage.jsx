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
            <p>Autore: {post._embedded.author['0'].name}</p>
            <p>Categorie: {post._embedded['wp:term'][0].map(category => category.name).join(', ')}</p>
            <p>Immagine in evidenza</p>
            {post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] &&
                <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.slug} />
            }
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
        </div>
    );
}
