const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    // Validate request body using Joi
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    await user.save();
    return res.status(201).send({ message: "User has been created successfully", email: user.email });

  } catch (err) {
    console.log("err::", err);
    return res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    // Validate request body using Joi
    const { error } = signinSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    req.session.token = token;

    return res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      token: token
    });
  } catch (err) {
    console.log("err::", err);
    return res.status(500).send({ message: err.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    console.log("err::", err);
    return res.status(500).send({ message: err.message });
  }
};

