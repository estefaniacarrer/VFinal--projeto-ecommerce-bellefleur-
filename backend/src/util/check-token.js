import jwt from "jsonwebtoken";

// middleware to validate token
const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Acesso negado!" });

  try {
    const verified = jwt.verify(token, "nossosecret");  // criar um .env
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "O Token é inválido!" });
  }
};

export default checkToken;
