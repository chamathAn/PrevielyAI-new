const applicationModel = require("../models/applicationModel.js");
const jobsModel = require("../models/jobsModel.js");
const createError = require("../utils/error.js");
const Replicate = require("replicate")
const replicate = new Replicate()

const createPost = async (req, res, next) => {
  const { userId, jobId, applicantName, answers, questions, title } = req.body;

  if (!userId || !jobId || !applicantName || !answers) {
    return res.status(400).json({ message: "All fields are required" });
  }
try {
 
  //  ML API
  let data = "";
  for (let i = 0; i < answers.length; i++) {
    data +=
      "question no " +
      (i + 1) +
      ": " +
      questions[i] +
      ",\n";
  }

  data += " what are the best answers for these question. these questions are iterview questions for "+title+" job role"
  
 
  // const input = {
  //   top_p: 1,
  //   prompt: data,
  //   temperature: 0.5,
  //   system_prompt:
  //     "This is an interview questionarie. Please give one word responses from these 'good','moderate', or 'bad' based on aswers for the questions for the job role for its suitablity. Do not answer based 'I', 'me' perspective or 'you'.",
  //   max_new_tokens: 500,
  // };

  // const output = await replicate.run("meta/llama-2-70b-chat", { input });
// ----------------\
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
		{
			headers: { Authorization: "Bearer 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", "Content-Type": "application/json" }
,
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}
const output = await query({"inputs": data});

// -----------------
  const post = await applicationModel.create({
    userId,
    jobId,
    applicantName,
    answers,
    status: output ? output[0]?.generated_text : "",
  });
  
  res.status(200).json({ post, message: "Successfully created a new application" });
} catch (error) {

  next(createError(500, "Can not create application post"));
}
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await jobsModel.find();
    res.status(200).json(posts);
  } catch (error) {
    next(createError(500, "Can not get posts"));
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await jobsModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    next(createError(500, "Can not get post"));
  }
};
module.exports = { createPost, getAllPosts, getPost };
