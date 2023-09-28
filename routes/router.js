const express = require("express");
const router = express.Router();
const LinkedInProfile = require("../model/linkedinProfile");

router.post("/profiles", async (req, res) => {
  try {
    const profileData = req.body;
    console.log("this is data", profileData);
    const profile = await LinkedInProfile.create(profileData);
    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
