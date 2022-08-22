const { db } = require("../db.js");

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db("users")
      .select("name", "email")
      .where("userid", "=", id);
    if (user) {
      return res.json(user[0]);
    } else {
      return res.json({
        message: "User not found.",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
  }
};
