const Boom = require("boom");
const Joi = require("@hapi/joi");
const responseMessages = require("../resources/response.json");

const validateRequestPayload = async (requestObj, res, schema) => {
  return new Promise((resolve, reject) => {
    const { error } = Joi.validate(requestObj, schema);
    if (error) {
      let message = sendBadRequestError(error, res);
      reject(Boom.badRequest(message));
    } else {
      resolve();
    }
  });
};

const sendError = (data, res) => {
  let error;
  console.log(
    "ERROR OCCURRED IN SEND ERROR FUNCTION  ---------------------------",
    data
  );
  let message = null;
  if (typeof data == "object" && !data.isBoom) {
    if (data.name == "ApplicationError") {
      message = responseMessages.APP_ERROR;
    } else if (data.name == "ValidationError") {
      message = responseMessages.APP_ERROR;
    } else if (data.response) {
      message = data.response.message;
    } else if (data.message) {
      message = data.message;
    } else {
      message = responseMessages.DEFAULT;
    }
    if (message !== null) {
      error = new Boom(message, {
        statusCode: 400,
        data: {},
      });
      return res.json(error.output.payload);
    }
  } else if (typeof data == "object" && data.isBoom) {
    if (data.data && data.data.code) {
      data.output.payload.code = data.data.code;
    }
    data.output.payload.data = {};
    return res.json(data.output.payload);
  } else {
    error = new Boom(data, {
      statusCode: 400,
      data: {},
    });
    return res.json(error.output.payload);
  }
};

/*-------------------------------------------------------------------------------
 * send success
 * -----------------------------------------------------------------------------*/

const sendSuccess = (response, res) => {
  const statusCode =
    response && response.statusCode ? response.statusCode : 200;
  const message = response && response.message ? response.message : "Success";
  const data = response.data ? response.data : {};

  return res.json({
    statusCode,
    message,
    data,
    error: "",
  });
};

/*-------------------------------------------------------------------------------
 * Joi error handle
 * -----------------------------------------------------------------------------*/
const sendBadRequestError = (error, res) => {
  let message = error.details[0].message;
  message = message.replace(/"/g, "");
  message = message.replace("[", "");
  message = message.replace("]", "");

  return message;
};

module.exports = {
  validateRequestPayload,
  sendSuccess,
  sendError,
};
