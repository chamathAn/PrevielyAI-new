const { adminJobPost, adminGetAllJobs, adminGetAllApplications, adminGetJobApllication } = require("../controllers/adminController");
const { authonticateToken } = require("../middlewares/authonticateToken");
const checkAdmin = require("../middlewares/checkAdmin");

const route = require("express").Router();

route.post("/postjob",  adminJobPost);
route.post("/alljobs",   adminGetAllJobs);
route.post("/allapplications",   adminGetAllApplications);
route.post("/job/application/:id",   adminGetJobApllication);

module.exports = route;
