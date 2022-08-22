const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { db, redis } = require("../db.js");

exports.HandleSignIn = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
      // 1) Check for Nulls
      return res.status(400).json({
        message: "Please fill the entire form",
      });
    }
    // 2) Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords does not match!",
      });
    }

    // 3) Hash Password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4) Create User
    const user = await db("users").insert({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // 5) Good Response
    if (user) {
      return res.status(201).json({
        message: "user Signed in Successfully",
      });
    }
  } catch (err) {
    // Bad Response
    res.status(400).json({
      message: "Email already exists",
    });
  }
};

const createAccessToken = (uid) => {
  return jwt.sign({ id: uid }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSession = async (token, uid) => {
  return Promise.resolve(redis.set(token, uid));
};

exports.HandleLogin = async (req, res, next) => {
  const { password, email } = req.body;

  // 1) Check for nulls

  if (!password || !email) {
    res.status(400).json({
      message: "Please fill the entire form",
    });
  }

  // 2) Check if user exists

  const userExists = await db
    .select("*")
    .from("users")
    .where("email", "=", email);
  if (userExists[0]) {
    // user exists

    // 3) Compare Passwords
    await bcrypt.compare(password, userExists[0].password, async (err, res) => {
      if (err) {
        res.status(400).json({
          error: err,
        });
      }
      if (!res) {
        res.status(400).json({
          message: "email or password is invalid.",
        });
      }
    });

    // 4) Send JWT
    const token = createAccessToken(userExists[0].userid);

    // 5) Create Session at redis
    const session = await createSession(token, userExists[0].userid);
    if (session) {
      res.status(200).json({
        message: "login succeed",
        token: token,
        uid: userExists[0].userid,
      });
    }
  } else {
    // user not exists
    res.status(400).json({
      message: "User is not exists",
    });
  }
};
