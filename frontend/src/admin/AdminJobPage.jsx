import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { PiSuitcaseDuotone } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";

export default function AdminJobPage() {
  const { id } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post("/api/admin/allapplications", {
          jobId: id,
        });
        if (data && data.applications) {
          setApplications(data.applications);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="bg-[#080c14] min-h-screen h-fit text-white px-[22%]">
      <div className="flex flex-col pt-6 gap-y-6">
        <span className="text-3xl font-semibold text-white">
          {applications[0]?.jobId?.title}
        </span>
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
        <p className="text-sm text-justify text-white">
          {applications[0]?.jobId?.description}
        </p>
        <div class="shrink-0 bg-border h-[1px] w-full dark:bg-blue-950"></div>
        <span className="text-2xl font-semibold text-white">
          Job Applications
        </span>

        {/* application cards */}

        {
          applications.length > 0 && (
            applications.map((e, i) => (
              <div
                className="w-full h-fit min-h-28 bg-[#e0fc04] rounded-xl  px-6 shadow-sm items-center flex justify-between"
                key={i}
              >
                <span className="text-2xl font-semibold text-black">
                  {e.applicantName}
                </span>
                <Link to={`/admin/job/${id}/application/${e._id}`}>
                <span className="font-semibold text-black cursor-pointer">
                  View
                </span>
                </Link>
              </div>
            ))
          )
        }
        
      </div>
    </div>
  );
}
