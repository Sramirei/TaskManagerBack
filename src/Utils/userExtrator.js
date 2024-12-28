const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const auth = req.get("authorization");
  let token = null;

  if (auth && auth.toLowerCase().startsWith("bearer")) {
    token = auth.substring(7);
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: "Token missing or invalid" });
    }

    const { id } = decodedToken;
    req.id = id;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token missing or invalid" });
  }
};
