const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./server/uploads"); // Save files to 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize upload middleware
const upload = multer({ storage });

// Use upload for routes that handle file uploads
app.post(
  "/auth/register",
  upload.fields([
    { name: "greenbookImage", maxCount: 1 },
    { name: "faceImage", maxCount: 1 },
  ]),
  async (req, res) => {
    // Save application details and file paths to the database
    const { tancId, firstName, lastName, birthdate, gender, email, address } =
      req.body;
    const greenbookImagePath = req.files.greenbookImage[0].path;
    const faceImagePath = req.files.faceImage[0].path;

    try {
      const newApplication = new Application({
        tancId,
        firstName,
        lastName,
        birthdate,
        gender,
        email,
        address,
        greenbookImagePath,
        faceImagePath,
      });
      await newApplication.save();
      res.status(200).send("Application submitted successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error saving application");
    }
  }
);
