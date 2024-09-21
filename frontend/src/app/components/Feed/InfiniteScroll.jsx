// pages/posts.jsx

async function loadPosts()
{
    const res= await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/`)
    const data= await res.json()
    return data
}

async function ListPosts() {
    const posts= await loadPosts()
    console.log(posts)
  
  return (
    <div className="bg-slate-700 p-4  ">
        <h1>POSTS</h1>
        {posts.map(post =>(
            <div key={post.id} className="bg-slate-500 px-4 py-3 mb-2 ">
                <h2>{post.content}</h2>
                {post.image ? (
                        <img
                            src={`${post.image}`}
                            alt="Post image"
                            className="max-w-full h-auto mb-2"
                            onError={(e) => console.log("Error loading image", e.target.src)}
                        />
                    ) : (
                        <p>______</p>
                    )}
                <p>{post.created_at}</p>
            </div>
        ))}

    </div>
  );
}

export default ListPosts;
