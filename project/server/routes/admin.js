const express = require("express");
const Application = require("../models/application");
const User = require("../models/user");
const router = express.Router();

// View all applications
router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve an applicant
router.post("/approve/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application)
      return res.status(404).json({ error: "Application not found" });

    const user = new User({ ...application._doc, role: "member" });
    await user.save();

    application.status = "approved";
    await application.save();

    res.json({ message: "Applicant approved and added as a member" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
