const router = require("express").Router();
const authRoutes = require("./auth.routes");
const fileUploader = require("../config/cloudinary.config")

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);

router.post("/upload", fileUploader.single("fileUrl"), (req, res, next) => {

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ fileUrl: req.file.path });
});

module.exports = router;
