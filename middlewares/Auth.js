// auth.js
import jwt from "jsonwebtoken";
import "dotenv/config";

const { sign, verify } = jwt;

export function createToken(user) {
  return sign(
    {
      email: user.email,
      role: user.role,
      user_id: user.id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h", // Set token expiration
    }
  );
}

export function verifyAToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    try {
      const decoded = verify(token, process.env.SECRET_KEY);
      req.user = decoded; 
      next();
    } catch (error) {
      return res.status(403).json({
        status: 403,
        msg: "Invalid token, please provide the correct credentials.",
      });
    }
  } else {
    return res.status(401).json({
      status: 401,
      msg: "Please login.",
    });
  }
}

export function roleAuth(allowedRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      try {
        const decoded = verify(token, process.env.SECRET_KEY);
        req.user = decoded; 

        if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
          return res.status(403).json({
            status: 403,
            msg: "You do not have the necessary permissions to access this route.",
          });
        }

        next();
      } catch (error) {
        return res.status(403).json({
          status: 403,
          msg: "Invalid token, please provide the correct credentials.",
        });
      }
    } else {
      return res.status(401).json({
        status: 401,
        msg: "Please login.",
      });
    }
  };
}
