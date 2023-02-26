import express from "express";

const router = express.Router();

// define the home page route
router.get("/", (req, res, nest) => {
  console.log("index router");
  res.send({ Output: "Choikt Labs Api" });
});

export default router;
