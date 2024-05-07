const { adminJobPost, adminGetAllJobs, adminGetAllApplications, adminGetJobApllication } = require("../controllers/adminController");
const { authonticateToken } = require("../middlewares/authonticateToken");
const checkAdmin = require("../middlewares/checkAdmin");

const route = require("express").Router();

route.post("/postjob",authonticateToken, checkAdmin, adminJobPost);
route.post("/alljobs", authonticateToken, checkAdmin, adminGetAllJobs);
route.post("/allapplications", authonticateToken, checkAdmin, adminGetAllApplications);
route.post("/job/application/:id", authonticateToken, checkAdmin, adminGetJobApllication);

module.exports = route;
