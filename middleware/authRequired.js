const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // test that this middleware function is running on protected routes
  console.log("activated");
  const bearerHeader = req.headers["authorization"];
  console.log("triggered token check", bearerHeader);

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    console.log(bearerToken);
    req.token = bearerToken;
    
    console.log(req.token);
    // use JWT tools to verify the token against r secret key
    let verified = jwt.verify(req.token, "waffles");
    console.log("here is the verified token", verified);

    // add userId to the req for use in certain protected routes.
    req.userId = verified._id;

    next();
  } else {
    res.sendStatus(403);
  }
};


