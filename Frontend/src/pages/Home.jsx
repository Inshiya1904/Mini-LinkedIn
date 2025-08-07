import { useEffect, useState } from "react";
import { getAllPosts, createPost } from "../services/api";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const fetchPosts = async () => {
    const { data } = await getAllPosts();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);
    await createPost(formData);
    setContent("");
    setImage(null);
    fetchPosts();
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow mb-6">
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?" className="w-full p-2 border rounded mb-2" required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-2" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Post</button>
      </form>
      {posts.map(post => <PostCard key={post._id} post={post} />)}
    </div>
  );
}
