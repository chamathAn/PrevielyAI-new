const { adminJobPost, adminGetAllJobs, adminGetAllApplications, adminGetJobApllication } = require("../controllers/adminController");
const { authonticateToken } = require("../middlewares/authonticateToken");
const checkAdmin = require("../middlewares/checkAdmin");

const route = require("express").Router();

route.post("/postjob",authonticateToken,  adminJobPost);
route.post("/alljobs", authonticateToken, adminGetAllJobs);
route.post("/allapplications", authonticateToken,  adminGetAllApplications);
route.post("/job/application/:id", authonticateToken,  adminGetJobApllication);

module.exports = route;
