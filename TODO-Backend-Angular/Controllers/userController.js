const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/users");

const userLogin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not registered!" });
    }

    const loggedIn = await bcrypt.compare(password, user.password);

    if (!loggedIn) {
      return res.status(401).json({ message: "Username/Password Incorrect" });
    }

    const token = jwt.sign({ id: user._id }, "secret");
    return res
      .status(200)
      .json({ token, userID: user._id, username: user.username });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message });
    }
    console.error("Failed to send response:", error);
  }
};

const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const response = await userModel.findOne({ email });

    if (response) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    const userSave = await newUser.save();
    return res.status(201).json(userSave);
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ error: error.message });
    }
    console.error("Failed to send response:", error);
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET || "secret", (err) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      next();
    });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { userLogin, userRegister, verifyToken };
