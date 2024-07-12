import { useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ blog, handleDeleteBlog, theCurrentUserId }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(blog.title);
  const [author, setAuthor] = useState(blog.author);
  const [url, setUrl] = useState(blog.url);
  const [likes, setLikes] = useState(blog.likes);
  const [username, setUserName] = useState(blog.user.username);
  const [userId, setUserId] = useState(blog.user.id);
  const [blogId, setBlogId] = useState(blog.id);
  const [currentUserId, setCurrentUserId] = useState(theCurrentUserId);
  console.log({ currentUserId: currentUserId, userId: userId });

  const toggleVisibility = () => {
    console.log("the Visibility: ", visible);
    setVisible(!visible);
  };

  const hadleAddLike = async (event) => {
    event.preventDefault();
    let editBlog = {
      title: title,
      author: author,
      url: url,
      likes: likes,
      userId: userId,
      id: blogId,
    };

    try {
      let response = await blogService.put(editBlog);
      console.log(response);

      setLikes(likes + 1);
    } catch (exception) {
      alert("Cannot Update Likes");
      console.log(exception);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blogItem">
      {title} {author} <button onClick={toggleVisibility}>View Detail</button>
      {visible ? (
        <>
          <div>
            {url}
            <br />
            {likes} <button onClick={hadleAddLike}>Like</button>
            <br />
            {username}
          </div>
          {userId === currentUserId ? (
            <button onClick={() => handleDeleteBlog(blog.id)}>
              Delete Blog
            </button>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Blog;
