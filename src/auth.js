import jwt from "jsonwebtoken";

export const createToken = (username) => {
  const token = jwt.sign(
    {
      username: username,
    },
    process.env.SECRET_KEY
  );
  return token;
};

export const middlewareProtect = (req, res, next) => {
  const bearer = req.headers.authorization || null;
  if (!bearer) {
    res.status(401);
    res.json({ message: "Not Authorized [ no bearer]" });
    return;
  }
  const token = bearer.split(" ")[1]; //bearer : token
  console.log("token in middleware:", token);
  if (!token) {
    res.status(401);
    res.json({ message: "Not Authorized [no token]" });
    return;
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    console.log("Authrozied! \nToken matched");
    next();
    return;
  } catch (e) {
    res.status(401);
    res.json({ message: "Not Authorized [incorrect token]" });
    return;
  }
};
