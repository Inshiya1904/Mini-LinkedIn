export default function PostCard({ post }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 mb-4">
      <div className="flex items-center gap-3">
        {post.author.profileImage ? (
                  <img
                    src={post.author.profileImage}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    {post.author.name?.charAt(0).toUpperCase()}
                  </div>
                )}

        <div>
          <p className="font-semibold">{post.author.name}</p>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="mt-2 text-gray-800">{post.content}</p>
      {post.image && (
        <img src={post.image} alt="post" className="mt-2 rounded-lg" />
      )}
    </div>
  );
}
