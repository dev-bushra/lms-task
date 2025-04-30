const express = require("express");
const router = express.Router();
const { createUser } = require("../services/users");

router.post("/", async (req, res) => {
  const { user_id, name, email } = req.body;
  try {
    await createUser(user_id, name, email);
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
