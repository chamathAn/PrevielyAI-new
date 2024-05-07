import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PiSuitcaseDuotone } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useClerk } from "@clerk/clerk-react";
import { ThreeDots } from 'react-loader-spinner'

export default function Apply() {
  const { id } = useParams();
  const { user } = useClerk();
  const [job, setJob] = useState([]);
  const [fullName, setFullName] = useState(user.fullName);
  const [answers, setAnswers] = useState(["", "", ""]); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/application/${id}`);
       
        setJob(data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchData();
  }, [id]);
  let questions = job?.questions;

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(`/api/application/`, {
        jobId: id,
        userId: user.id,
        applicantName: fullName,
        answers,
        questions,
        title: job?.title,
      });
      toast.success(data.message);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Function to update answers array
  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  return (
    <div className="bg-[#080c14] min-h-screen h-fit px-[22%]">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black opacity-50">
          <ThreeDots
            height={80}
            width={80}
            color="#2563EB"
            radius={9}
            ariaLabel="three-dots-loading"
          />
        </div>
      )}
      <div className="flex flex-col pt-16 text-white gap-y-4">
        <span className="text-3xl font-semibold">{job?.title}</span>
        <div className="flex items-center h-full py-2 text-2xl font-medium py- gap-x-7">
          <div className="flex items-center h-max gap-x-3">
            <PiSuitcaseDuotone />
            <span className="text-lg font-light">Full Time</span>
          </div>

          <div className="flex items-center gap-x-1">
            <IoLocationOutline />
            <span className="text-lg font-light">Remote</span>
          </div>
        </div>
        {/* Description */}
        <p className="text-sm text-justify">{job?.description}</p>
        {/* form */}
        <form onSubmit={handleSubmit}>
          <h1 className="pb-6 text-xl font-semibold">Full Name</h1>
          <input
            type="text"
            name="title"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-[#080c14] w-full px-2 py-3 border-[1px] border-[#242434]  focus:outline-none focus:ring-0 dark:focus:border-blue-600 peer rounded-lg"
          />
          {questions &&
            questions.length > 0 &&
            questions.map((question, index) => (
              <div key={index}>
                <h1 className="pt-6 pb-6 text-xl font-semibold">{`0${index + 1}. ${question}`}</h1>
                <textarea
                  value={answers[index]}
                  required
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
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
