import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

interface Post {
  id: string;
  discussionId: string;
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
  const [sortBy, setSortBy] = useState<"date" | "likes">("date");

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      const allPosts = JSON.parse(storedPosts) as Post[];
      setPosts(allPosts.filter((post) => post.discussionId === id));
    }
  }, [id]);

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts");
    const allPosts = storedPosts ? JSON.parse(storedPosts) : [];
    const updatedPosts = allPosts.filter((post: Post) => post.discussionId !== id).concat(posts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  }, [posts, id]);

  const handlePost = () => {
    if (newTitle.trim() && newContent.trim()) {
      const newPost: Post = {
        id: `${Date.now()}`,
        discussionId: id!,
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

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "likes") {
      return b.likes - a.likes;
    }
    return 0;
  });
  

  return (
    <div className="max-w-4xl mx-auto p-6">
  
      <div className="flex justify-end mb-4">
        <label className="mr-2 text-gray-600">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "date" | "likes")}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="date">Date</option>
          <option value="likes">Likes</option>
        </select>
      </div>
  
      <h1 className="text-3xl font-bold text-center mb-6">
        Discussion about <span className="text-blue-600">{id}</span>
      </h1>
  
      <div className="bg-gray-100 p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4"
        />
        <textarea
          placeholder="Add your post content here..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4"
        ></textarea>
        <button
          onClick={handlePost}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Post
        </button>
      </div>
  
      <div>
        <h2 className="text-2xl font-semibold mb-4">Posts</h2>
        {sortedPosts.length === 0 ? (
          <p className="text-gray-500">No posts yet!</p>
        ) : (
          sortedPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 mb-4 rounded-lg shadow"
            >
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-2">{post.content}</p>
              <small className="block text-gray-500 mb-4">
                {new Date(post.date).toLocaleString()}
              </small>
              <p className="text-gray-600 mb-4">Likes: {post.likes}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Like
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    handleEdit(
                      post.id,
                      prompt("New title:") || post.title,
                      prompt("New content:") || post.content
                    )
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );  
}
export default Blog;
