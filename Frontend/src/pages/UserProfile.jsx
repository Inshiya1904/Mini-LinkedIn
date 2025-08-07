import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { userId } = useParams(); // Get userId from URL
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:3000/api/posts/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("FULL API RESPONSE:", res.data);

        setUser(res.data.user);
        setPosts(res.data.posts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!user) return <div className="text-center mt-5">User not found</div>;

  const handleDelete = (postId) => {
    
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow p-4 rounded mb-6">
        <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        {/* {user.profileImage && (
          <img
            src={`http://localhost:3000/uploads/${user.profileImage}`}
            alt="Profile"
            className="w-32 h-32 rounded-full mt-4"
          />
        )} */}
        {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="profile"
              className="w-32 h-32 rounded-full mt-4"
            />
          ) : (
            <div className="w-32 h-32 text-[50px]  rounded-full mt-4 bg-blue-600 text-white flex items-center justify-center">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Posts</h3>
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post._id} className="border p-3 rounded shadow">
                <h4 className="font-semibold">{post.title}</h4>
                <p>{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full mt-2 rounded"
                  />
                )}
                <button onClick={()=>handleDelete(post._id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default UserProfile;
