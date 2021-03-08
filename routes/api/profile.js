const express = require("express");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/Users");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

//@route GET api/profile/me
//@desc get user profile
//@access private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);
    if (!profile) {
      res.status(400).json({ msg: "no profile found for user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route POST api/profile
//@desc create/update user profile
//@access private
router.post(
  "/",
  [
    auth,
    [
      check("position", "position is required").not().isEmpty(),
      check("skills", "skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      position,
      skills,
      bio,
      githubusername,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    // build profile obj

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (position) profileFields.position = position;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    // build social
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route GET api/profile
//@desc get all profiles
//@access public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route GET api/profile/user/:user_id
//@desc get profile by user id
//@access public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name"]);
    if (!profile) {
      return res.status(400).json({ msg: "user not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "user not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route Delete api/profile
//@desc delete profile, user, posts
//@access private

router.delete("/", [auth], async (req, res) => {
  try {
    console.log(req);
    // delete profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //delte user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "user removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route PUT api/profile/experience
//@desc Update experience
//@access private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("company", "company is required").not().isEmpty(),
      check("from", "from date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route DELETE api/profile/experience/:exp_id
//@desc Delete experience
//@access private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // get remove index

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
//@route PUT api/profile/experience/:exp_id
//@desc Update experience
//@access private

router.put("/experience/:exp_id", auth, async (req, res) => {
  const { title, company, location, from, to, current, description } = req.body;
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // get update index

    const updateIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience[updateIndex] = newExp;
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route PUT api/profile/education
//@desc Update education
//@access private
router.put(
  "/education",
  [
    auth,
    [
      check("university", "University is required").not().isEmpty(),
      check("degree", "degree is required").not().isEmpty(),
      check("from", "from date is required").not().isEmpty(),
      check("fieldofstudy", "field of study date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      university,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const newEdu = {
      university,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route DELETE api/profile/education/:edu_id
//@desc Delete education
//@access private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // get remove index

    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
//@route PUT api/profile/education/:edu_id
//@desc Update education
//@access private

router.put("/education/:edu_id", auth, async (req, res) => {
  const {
    university,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;
  const newEdu = {
    university,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // get update index

    const updateIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education[updateIndex] = newEdu;
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
