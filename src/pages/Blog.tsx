import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  likes: number;
}

const Blog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (newTitle.trim() && newContent.trim()) {
      const newPost: Post = {
        id: `${Date.now()}`,
        title: newTitle,
        content: newContent,
        date: new Date().toISOString(),
        likes: 0,
      };
      setPosts([newPost, ...posts]);
      setNewTitle("");
      setNewContent("");
    }
  };

  const handleDelete = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleEdit = (postId: string, newTitle: string, newContent: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, title: newTitle, content: newContent } : post
      )
    );
  };

  return (
    <div>
      <h1>Discussion about {id}</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          placeholder="Add your post content here..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        ></textarea>
        <button onClick={handlePost}>Post</button>
      </div>
      <div>
        <h2>Posts</h2>
        {posts.length === 0 ? (
          <p>No posts yet!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>{new Date(post.date).toLocaleString()}</small>
              <p>Likes: {post.likes}</p>
              <button onClick={() => handleLike(post.id)}>Like</button>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
              <button
                onClick={() =>
                  handleEdit(post.id, prompt("New title:") || post.title, prompt("New content:") || post.content)
                }
              >
                Edit
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
