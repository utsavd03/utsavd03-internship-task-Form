const express = require("express");
const multer = require("multer");
const uuid = require("uuid").v4;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuid()}-${originalname}`);
  },
});

const upload = multer({ storage });

const app = express();
app.use(express.static("public"));

app.post("/upload", upload.array("avatar"), (req, res) => {
  const no = req.files.length;

  if (no == 0) {
    return res.json({ success: "false", message: "No file provided" });
  }

  return res.json({
    success: "true",
    uploaded: no,
    files: req.files,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
