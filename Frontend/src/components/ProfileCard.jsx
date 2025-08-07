import { useEffect, useState } from "react";
import { getProfile, updateProfile, getUserWithPosts } from "../services/api";
import PostCard from "../components/PostCard";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const fetchData = async () => {
    const { data } = await getProfile();
    setUser(data.user);
    setName(data.user.name);
    setBio(data.user.bio || "");
    const res = await getUserWithPosts(data.user._id);
    setPosts(res.data.posts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    if (image) formData.append("profileImage", image);
    await updateProfile(formData);
    fetchData();
  };

  return user && (
    <div className="max-w-xl mx-auto mt-6">
      <form onSubmit={handleUpdate} className="bg-white p-4 shadow rounded-xl mb-6">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-2 p-2 border rounded" />
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full mb-2 p-2 border rounded" placeholder="Bio" />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-2" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
      </form>

      {posts.map(post => <PostCard key={post._id} post={post} />)}
    </div>
  );
}