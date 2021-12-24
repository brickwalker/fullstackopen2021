import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUsers } from "../reducers/usersReducer";

const UserBlogs = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  const dispatch = useDispatch();

  useEffect(() => dispatch(getUsers()), []);

  if (user) {
    return (
      <div>
        <h2>{user.name}</h2>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export default UserBlogs;
