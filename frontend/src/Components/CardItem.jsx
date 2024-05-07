import React from "react";
import { PiSuitcaseDuotone } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
export default function CardItem({ data }) {
  return (
    <div className="w-full h-fit min-h-40 bg-[#e0fc04] rounded-xl p-4 px-6 shadow-sm">
      <div className="flex flex-col gap-y-16">
        <span className="text-2xl font-semibold ">{data.title}</span>
        <div className="flex items-center h-full text-2xl font-medium gap-x-7">
          <div className="flex items-center h-max gap-x-3">
            <PiSuitcaseDuotone />
            <span className="text-lg">Full Time</span>
          </div>

          <div className="flex items-center gap-x-1">
            <IoLocationOutline />
            <span className="text-lg">Remote</span>
          </div>
        </div>
      </div>
    </div>
  );
}
