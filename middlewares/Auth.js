import "dotenv/config";
import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

export function createToken(user) {
  return sign(
    {
      email: user.email,
      user_id: user.id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
}

export function verifyAToken(req, res, next) {
  const authHeader = req?.headers["authorization"];
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
