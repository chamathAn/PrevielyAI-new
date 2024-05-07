import React, { useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function PostJob() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const userId = user?.id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState(["", "", ""]); // Initialize with empty strings

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "/api/admin/postjob",
        {
          userId,
          title,
          description,
          questions,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Function to update questions array
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="bg-[#080c14] min-h-screen h-fit text-white px-[22%]">
      <div className="flex flex-col pb-28">
        <div className="py-10 text-3xl font-bold">Create A Job Posting</div>
        <form onSubmit={handleSubmit}>
          <h1 className="pb-6 text-xl font-semibold">Title</h1>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#080c14] w-full px-2 py-3 border-[1px] border-[#242434]  focus:outline-none focus:ring-0 dark:focus:border-blue-600 peer rounded-lg"
          />
          <h1 className="pt-6 pb-6 text-xl font-semibold">Description</h1>
          <textarea
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            className="bg-[#080c14] w-full px-2 py-3 border-[1px] border-[#242434]  focus:outline-none focus:ring-0 dark:focus:border-blue-600 peer rounded-lg h-[100px]"
          />
          {[1, 2, 3].map((questionIndex) => (
            <div key={questionIndex}>
              <h1 className="pt-6 pb-6 text-xl font-semibold">{`Question ${questionIndex}`}</h1>
              <textarea
                value={questions[questionIndex - 1]} // Adjust index to match array
                required
                onChange={(e) =>
                  handleQuestionChange(questionIndex - 1, e.target.value) // Adjust index to match array
                }
                className="bg-[#080c14] w-full px-2 py-3 border-[1px] border-[#242434]  focus:outline-none focus:ring-0 dark:focus:border-blue-600 peer rounded-lg h-[100px]"
              />
            </div>
          ))}
          <button
            type="submit"
            className="p-2 h-[40px] px-4 bg-[#e0fc04] flex justify-center items-center text-black rounded-lg hover:opacity-[.8] transition font-semibold w-fit mt-5"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
