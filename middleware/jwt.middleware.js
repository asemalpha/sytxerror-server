const { expressjwt: jwt } = require("express-jwt");

// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  console.log("Hello");
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}

const JWT = require("jsonwebtoken");
const User = require("../models/User.model");

function isLoggedIn(req, res, next) {
  if (!req.headers.authorization) {
    return goHomeYoureDrunk(res);
  }

  const [bearer, token] = req.headers.authorization.split(" ");

  if (bearer !== "Bearer") {
    return res.status(401).json({ message: "Bye bitch" });
  }

  const tokenData = JWT.decode(token);

  if (!tokenData) {
    return res.status(401).json({ message: "Bye bitch" });
  }

  User.findById(tokenData._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log("err:", err);
      return res.status(500).json({ message: "Guess I was bitch this time" });
    });
}

// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
  getTokenFromHeaders,
  isLoggedIn,
};
