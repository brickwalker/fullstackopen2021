const extractToken = (request) => {
  const authHeader = request.get("Authorization");
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    return authHeader.substring(7);
  } else {
    return null;
  }
};

module.exports = {
  extractToken,
};
