const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({
      status: "error",
      msg: "no token found",
    });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      next();
    } catch (error) {
      res.status(403).json({ status: "error", msg: "missing token" });
    }
  }
};

const authStaff = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "missing token" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      if (decoded.role === "staff") {
        req.decoded = decoded;
        next();
      }
    } catch (error) {
      console.error(error.message);
      return res.status(401).json({ status: "error", msg: "missing token" });
    }
  }
};

const authAdmin = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "missing token" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      if (decoded.role === "admin") {
        req.decoded = decoded;
        next();
      }
    } catch (error) {
      console.error(error.message);
      return res.status(401).json({ status: "error", msg: "missing token" });
    }
  }
};

module.exports = { authUser, authStaff, authAdmin };
