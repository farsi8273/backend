const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { signupSchema, signinSchema, validateRequest } = require('../middlewares/validation')
// Middleware for validating request body

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    validateRequest(signupSchema),
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", validateRequest(signinSchema),controller.signin);

  app.post("/api/auth/signout", controller.signout);
};
