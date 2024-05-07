import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import axios from 'axios';
import CardItem from "../Components/CardItem";

export default function Dashboard() {
  const { user } = useUser();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/admin/alljobs", {
          userId: user.id
        });
        const fetchedJobs = response.data.jobs; // Assuming jobs are under the 'jobs' property
        setJobs(fetchedJobs); // Update jobs state with fetched data
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="bg-[#080c14] min-h-screen h-fit px-[22%] text-white">
      <div className="flex justify-end ">
        <Link to="/admin/job/create">
          <button
            className=" p-2 h-[40px] px-4 bg-[#e0fc04] flex justify-center items-center text-black rounded-lg hover:opacity-[.8] transition font-semibold "
          >
            Post A Job
          </button>
        </Link>
      </div>
      <div className="flex flex-col pt-16 text-black gap-y-6">
        <span className="text-3xl font-semibold text-white">Current Job Postings</span>
      {
         jobs.length > 0 && ( 
          jobs.map((e, i) => (
            <Link to={`/admin/job/${e._id}`} key={i}><CardItem data={e} /></Link>
          ))
        ) 
      }
      </div>
    </div>
  );
}
