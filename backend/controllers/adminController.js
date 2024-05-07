const applicationModel = require("../models/applicationModel");
const jobsModel = require("../models/jobsModel");
const createError = require("../utils/error");

const adminJobPost = async (req, res, next) => {
  const { userId, title, description, questions } = req.body;
  try {
    const job = await jobsModel.create({
      userId,
      title,
      description,
      questions,
    });

    return res.json({
      job,
      message: "Successfully created a new job post",
    });
  } catch (error) {
    next(createError(500, "Can not make a new job post"));
  }
};

const adminGetAllJobs = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const jobs = await jobsModel.find({userId});
    if (!jobs) {
      return next(createError(404, "Jobs not found"));
    }
    return res.json({
      jobs,
    });
  } catch (error) {

    next(createError(500, "Can not get all jobs"));
  }
};

const adminGetAllApplications = async (req, res, next) => {
  const { jobId } = req.body;
  try {
    const applications = await applicationModel.find({ jobId }).populate("jobId");

    if (!applications) {
      return next(createError(404, "Applications not found"));
    }
    return res.json({
      applications,
    });
  } catch (error) {
    next(createError(500, "Can not get all applications"));
  }
};

const adminGetJobApllication = async (req, res, next) => {
 const {id} = req.params

  try {
    const application = await applicationModel.findOne(  {_id:id} );
    if (!application) {
      
      return next(createError(404, "Application not found"));
    }
    return res.json({
      application,
    });
  } catch (error) {
    next(createError(500, "Can not get application"));
  }
};

module.exports = {
  adminJobPost,
  adminGetAllJobs,
  adminGetAllApplications,
  adminGetJobApllication,
};
