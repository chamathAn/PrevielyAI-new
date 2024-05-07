import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminJobApplication() {

  let navigate = useNavigate();
  const { applicationId } = useParams();
  
  const [application, setApplication] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post("/api/admin/job/application/"+applicationId);

      setApplication(data.application);
    };

    fetchData();
  }, []);


  return (
    <div className="bg-[#080c14] min-h-screen h-fit text-white px-[22%]">
      <div className="flex flex-col w-full p-4 px-6 bg-white shadow-sm h-fit min-h-28 rounded-xl ">
        <span className="text-2xl font-semibold text-black ">
          {application?.applicantName}
        </span>
        <div className="bg-[#fc4444] rounded-lg p-4 mt-2">
          <span className="font-semibold text-black cursor-pointer">
            {application?.status}
          </span>
        </div>
      </div>

      {/* Answers */}
      <div className="w-full h-fit min-h-28 bg-[#e0fc04] rounded-xl  px-6 shadow-sm p-4 flex mt-6 flex-col">
        {application?.answers &&
          application?.answers.map((answer, index) => {
            return <span key={index} className="py-4 text-lg font-medium text-black">{answer}</span>;
          })}
      
      </div>

      <button onClick={() => navigate(-1)} className="text-[#e0fc04] text-lg bg-transparent font-medium mt-4">Back</button> 
    </div>
  );
}
