const { adminJobPost, adminGetAllJobs, adminGetAllApplications, adminGetJobApllication } = require("../controllers/adminController");
const { authonticateToken } = require("../middlewares/authonticateToken");
const checkAdmin = require("../middlewares/checkAdmin");

const route = require("express").Router();

route.post("/postjob", checkAdmin, adminJobPost);
route.post("/alljobs",  checkAdmin, adminGetAllJobs);
route.post("/allapplications",  checkAdmin, adminGetAllApplications);
route.post("/job/application/:id",  checkAdmin, adminGetJobApllication);

module.exports = route;
