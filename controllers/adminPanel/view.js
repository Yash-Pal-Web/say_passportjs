
const universalFunctions = require("../../utils/universalFunctions");
const responseMessages = require("../../resources/response.json");
const Boom = require("boom");
const config = require("config");
const appConstants = require("../../appConstants");
const bcryptFunctions = require("../../utils/bcrypt");
let User = require("../../models").User;

// const createAdminUser = async () => {
//   try {
//     const alreadyExist = await User.findOne({
//       where: {
//         email: config.get("adminAuth.adminEmail"),
//         role: "admin",
//       },
//     });

//     if (alreadyExist) {
//       throw Boom.badRequest(responseMessages.ALREADY_EXIST_ADMIN);
//     } else {
//       let password = bcryptFunctions.createHash(
//         config.get("adminAuth.adminPassword")
//       );
//       console.log("password", password);
//       const user = await User.create({
//         email: config.get("adminAuth.adminEmail"),
//         password: password,
//         role: "admin",
//       });

//       if (user) {
//         console.log("Admin User Created");
//       }
//     }
//   } catch (err) {
//     if (err.message === "Admin User already exists") {
//       console.log("Admin User Created");
//     } else {
//       console.log("error", err);
//     }
//   }
// };

// createAdminUser();

const renderIndexFile = async (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const renderLoginPage = async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const renderRegisterPage = async (req, res) => {
  try {
    res.render("register");
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const renderDriversPage = async (req, res) => {
  try {
    res.render("drivers");
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const renderOtherUsersPage = async (req, res) => {
  try {
    res.render("otherUsers");
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};
const renderStaffPage = async (req, res) => {
  try {
    res.render("staff");
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};
const renderretailersPage = async (req, res) => {
  try {
    res.render("retailers_shippers");
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const reportsPage = async (req, res) => {
  try {
    res.render("reports");
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const routesPage = async (req, res) => {
  try {
    res.render("routes");
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const renderNewUserPage = async (req, res) => {
  try {
    res.render("newUser");
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const renderJobPage = async (req, res) => {
  try {
    res.render("jobs");
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};

const renderConformationPage = async (req, res) => {
  try {
    res.render("conform");
  } catch (err) {
    return universalFunctions.sendError(err, res);
  }
};


module.exports = {
  renderIndexFile,
  renderLoginPage,
  renderRegisterPage,
  renderDriversPage,
  renderOtherUsersPage,
  renderNewUserPage,
  renderJobPage,
  routesPage,
  reportsPage,
  renderretailersPage,
  renderStaffPage,
  renderConformationPage,
};


