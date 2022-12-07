let express = require("express");
let router = express();

const {
  getCoordinatesFromName,
  getDistanceBetweenTwoCoordinates,

  getRouteBetweenTwoPoints,
  getRouteOptimization,
  getSolutonByJob_id,
} = require("../controllers/routingApi");

router.post("/getCoordinatesFromName", getCoordinatesFromName);
router.post(
  "/getDistanceBetweenTwoCoordinates",
  getDistanceBetweenTwoCoordinates
);

router.post("/getRouteOptimization", getRouteOptimization);
router.post("/getRouteBetweenTwoPoints", getRouteBetweenTwoPoints);

router.post("/getSolutonByJob_id", getSolutonByJob_id);

module.exports = router;
