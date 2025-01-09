import React from "react";
import { useParams } from "react-router";

const Blog: React.FC = () => {
    const { id } = useParams< { id: string } >();
    
    return (
        <div>
            <h1>Discussion about {id}</h1>
            <div>
                <textarea placeholder="Add your comment here..."></textarea>
                <button>Post</button>
            </div>
            <div>
                <h2>Comments</h2>
                <p>No comments yet!</p>
            </div>
        </div>
    );
}

export default Blog;