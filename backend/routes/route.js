const express = require("express");
const router = express.Router();
const {
  generateURL,
  getAllURL,
  destroyURL,
  redirectUser,
} = require("../controllers/url-controllers");

router.get("/", getAllURL);

router.post("/create", generateURL);

router.delete("/delete/:id", destroyURL);

router.get("/:id", redirectUser);

module.exports = router;
