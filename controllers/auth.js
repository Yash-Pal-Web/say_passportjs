const joi = require("@hapi/joi");
const universalFunctions = require("../utils/universalFunctions");
const responseMessages = require("../resources/response.json");
const Boom = require("boom");
const config = require("config");
const appConstants = require("../appConstants");
let User = require("../models").User;
const bcryptFunctions = require("../utils/bcrypt");


//register

const signup = async (req, res) => {
  try {
    const schema = {
      role: joi
        .string()
        .valid([
          appConstants.role.staff,
          appConstants.role.driver,
          appConstants.role.customer,
          appConstants.role.guest,
          appConstants.role.shipper,
        ])
        .required(),
      name: joi.string().required(),
      phoneNo: joi.string().required(),
      email: joi.string().email().required(),
      address: joi.string().required(),
      password: joi.string().required(),
      deviceType: joi
        .number()
        .valid([
          appConstants.deviceType.ios,
          appConstants.deviceType.android,
          appConstants.deviceType.web,
        ])
        .required(),
    };

    await universalFunctions.validateRequestPayload(req.body, res, schema);
    console.log(req.body);

    const alreadyExist = await User.findOne({
      where: {
        email: req.body.email,
      }
    });

    console.log("already exist", alreadyExist);
    // res.status().send({})
    
    if (alreadyExist) {
      throw Boom.badRequest(responseMessages.ALREADY_EXIST_USER);
    }
    let password = bcryptFunctions.createHash(req.body.password);

    const user = await User.create({
     role: req.body.role,
      name: req.body.name,
      phoneNo: req.body.phoneNo,
      email: req.body.email,
      address: req.body.address,
      password: password,
      deviceType: req.body.deviceType,
    });

    //
    
    // connection.query('INSERT INTO users SET ? ' , function(error,results,fields){
    //   if(error){
    //     res.json({
    //       status: false,
    //       message:'There is some error.'
    //     })
    //   }else {
    //     res.json({
    //       status:true,
    //       data: results,
    //       message: 'user registered successfully'
    //     })
    //   }
    //  });

    //

    res.redirect('/admin')

    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: responseMessages.PATH_SUCCESS,
      },
     
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

//Login Page

const signin = async (req, res) => {
  try {
    const schema = {
      // role: joi
      //   .string()
      //   .valid([
      //     appConstants.role.admin,
      //     appConstants.role.staff,
      //     appConstants.role.driver,
      //     appConstants.role.customer,
      //     appConstants.role.guest,
      //     appConstants.role.shipper,
      //   ])
      //   .required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      // deviceType: joi
      //   .number()
      //   .valid([
      //     appConstants.deviceType.ios,
      //     appConstants.deviceType.android,
      //     appConstants.deviceType.web,
      //   ])
      //   .required(),
    };

    await universalFunctions.validateRequestPayload(req.body, res, schema);
    console.log(req.body);

    return universalFunctions.sendSuccess(
      {
        statusCode: 200,
        message: responseMessages.PATH_SUCCESS,
      },
      res
    );
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};


// app.get('/logout', (req, res) => {
  
//   return res.redirect('/');
// });



module.exports = { signup, signin , };
