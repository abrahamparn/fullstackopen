import { useState } from "react";

export default function BlogForm({ createBlog, userId }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");

  // THIS IF FOR BLOG
  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes,
      userId: userId,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
    setLikes("");
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleLikesChange = (event) => {
    setLikes(event.target.value);
  };
  return (
    <>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:{" "}
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          Author:{" "}
          <input type="text" value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          Url: <input type="text" value={url} onChange={handleUrlChange} />
        </div>
        <div>
          Likes:{" "}
          <input type="number" value={likes} onChange={handleLikesChange} />
        </div>
        <div>
          <button>SAVE BLOG</button>
        </div>
      </form>
    </>
  );
}
