import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const BlogItem = ({ blog }) => {
  return (
    <Box mt={1}>
      <StyledLink to={`/blogs/${blog.id}`}>
        <Typography color="primary">{blog.title} - {blog.author}</Typography>
      </StyledLink>
    </Box>
  );
};

BlogItem.propTypes = {
  blog: propTypes.object.isRequired,
};

export default BlogItem;
