
let express = require("express");
let router = express();

const {
  renderIndexFile,
  renderLoginPage,
  renderRegisterPage,
  renderDriversPage,
  renderOtherUsersPage,
  routesPage,
  reportsPage,
  renderNewUserPage,
  renderJobPage,
  renderretailersPage,
  renderStaffPage,
  renderConformationPage,
} = require("../../controllers/adminPanel/view");

router.get("/", renderIndexFile);
router.get("/login", renderLoginPage);
router.get("/register", renderRegisterPage);
router.get("/drivers", renderDriversPage);
router.get("/otherUsers", renderOtherUsersPage);
router.get("/staff", renderStaffPage);
router.get("/retailers_shippers", renderretailersPage);
router.get("/routes", routesPage);
router.get("/reports", reportsPage);
router.get("/newUsers", renderNewUserPage);
router.get("/jobs", renderJobPage);
router.get("/conformationPage",renderConformationPage);

module.exports = router;
