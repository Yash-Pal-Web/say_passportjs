const Jwt = require("jsonwebtoken");

const Boom = require("boom");
import { universalFunctions } from "../utils";
const appConstants = require("../../appConstants");
import models from "../models";
import responseMessages from "../resources/response.json";
import Config from "config";

const checkAuth = (req, res, next) => {
  const token =
    req.headers["x-access-token"] ||
    req.headers["token"] ||
    req.query["x-access-token"];
  if (token) {
    console.log("token", token);
    Jwt.verify(token, Config.get("jwt.secret"), async function (err, decoded) {
      try {
        if (err) {
          throw Boom.unauthorized(responseMessages.INVALID_TOKEN);
        } else {
          // console.log("<<<<<<<<<<<<<<<<<<<<DEVICE>>>>>>>>>>>", decoded);

          const session = await validateSession(decoded);

          let userData = await models.User.findOne({
            id: decoded.payloadData.id,
          });
          if (!userData) {
            throw Boom.notFound(responseMessages.USER_NOT_FOUND);
          }
          userData = JSON.parse(JSON.stringify(userData));

          req.user = userData;
          next();
        }
      } catch (err) {
        // let err = new Boom(responseMessages.INVALID_TOKEN, {
        //   statusCode: 401,
        //   data: {},
        // });
        return universalFunctions.sendError(err, res);
      }
    });
  } else {
    let error = new Boom(responseMessages.INVALID_TOKEN, {
      statusCode: 400,
      data: {},
    });
    return universalFunctions.sendError(error, res);
  }
};

const validateSession = async (user) => {
  try {
    const criteria = {
      userId: user.payloadData.userId,
      id: user.payloadData.sessionId,
    };
    // console.log("user token", user);
    const session = await models.Session.findOne({ where: criteria });
    //console.log(session)
    if (session) {
      return session;
    } else {
      throw Boom.badRequest(responseMessages.INVALID_TOKEN);
    }
  } catch (error) {
    throw error;
  }
};

const createToken = async (payloadData) => {
  return new Promise((resolve, reject) => {
    Jwt.sign(
      { payloadData: payloadData },
      Config.get("jwt.secret"),
      {
        expiresIn: config.get("jwt.tokenExpire") * 60,
      },

      (err, jwt) => {
        if (err) {
          reject(err);
        } else {
          resolve(jwt);
        }
      }
    );
  });
};

const sessionManager = async (sessionData) => {
  try {
    const defaults = Config.get("sessionManager");
    if (defaults) {
      // let tokenExpireTime = Config.get('jwt.tokenExpire')
      // tokenExpireTime = defaults.userTokenExpireTime

      return deviceSessionManager(defaults.deviceMultiSession, sessionData);
    } else {
      throw Boom.badRequest(responseMessages.DEFAULT);
    }
  } catch (error) {
    throw error;
  }
};

// TODO: Move session manager in different file may be auth service
const deviceSessionManager = async (deviceMultiSession, sessionData) => {
  try {
    const dataToSave = {
      userId: sessionData.userId,
      deviceType: sessionData.deviceType,
    };

    if (!deviceMultiSession) {
      const criteria = {
        userId: sessionData.userId,

        // $or: [
        //   {
        //     deviceType: appConstants.DEVICE_TYPE.IOS,
        //   },
        //   {
        //     deviceType: appConstants.DEVICE_TYPE.ANDROID,
        //   },
        // ],
      };
      await models.Session.delete(criteria);
    }

    const session = await models.Session.create(dataToSave);

    const tokenData = {
      userId: sessionData.userId,
      sessionId: session._id,

      deviceType: sessionData.deviceType,
    };

    return createAccessToken(tokenData);
  } catch (error) {
    throw error;
  }
};

// TODO: Move session manager in different file may be auth service
const createAccessToken = async (tokenData) => {
  try {
    const accessToken = await createToken(tokenData);
    if (accessToken) {
      return accessToken;
    } else {
      throw Boom.badRequest(responseMessages.DEFAULT);
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  checkAuth,
  createToken,
  sessionManager,
};
