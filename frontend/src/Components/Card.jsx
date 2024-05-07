import React, { useEffect } from "react";
import axios from "axios";
import CardItem from "./CardItem";
import { Link } from "react-router-dom";

export default function Card() {
  const [jobs, setJobs] = React.useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("api/application/");
        setJobs(data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="w-full h-fit">
      <div className="py-8 text-2xl font-semibold text-white">
        Available Jobs
      </div>
      <div className="flex flex-col gap-y-8">
        {jobs.map((e, i) => {
          return <Link  key={i} to={`/apply/job/${e._id}`}><CardItem data={e} /></Link> ;
        })}
      </div>
    </div>
  );
}
