import { useState } from "react";
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    console.log("the Visibility: ", visible);
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={toggleVisibility}>View Detail</button>
      {visible ? (
        <>
          <div>
            {blog.url}
            <br />
            {blog.likes} <button>Like</button>
            <br />
            {blog.author}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Blog;
