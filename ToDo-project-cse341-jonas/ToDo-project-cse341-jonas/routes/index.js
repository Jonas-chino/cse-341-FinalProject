const express = require("express");
const router = express.Router();

// Welcome page
router.get("/", (req, res) => {
  res.json({
    message: "ToDo API",
    documentation: "/api-docs",
  });
});

// router.use("/auth", require("./auth"));
router.use("/tasks", require("./tasks"));
router.use("/users", require("./users"));
router.use("/categories", require("./categories"));
router.use("/projects", require("./projects"));

module.exports = router;
