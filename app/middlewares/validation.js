const joi = require('joi')

const signupSchema = joi.object({
    username:joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})



const signinSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
  });
  
  const validateRequest = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
      next();
    };
  };





  // Define validation schemas
const bookmarkSchema = joi.object({
    carId: joi.string().required(),
  });
  

// Define joi schema for validation
const bookmarkjoiSchema = joi.object({
    userId: joi.string().required(), // Assuming userId is a string
    carId: joi.string().required() // Assuming carId is a string
});




// Joi schema for user validation
const userSchema = joi.object({
    username: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

// Function to validate user data






module.exports = {
    signupSchema,
    signinSchema,
    validateRequest,
    bookmarkSchema
  };



  