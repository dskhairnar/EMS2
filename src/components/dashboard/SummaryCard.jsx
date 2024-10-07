import React from "react";

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="rounded-lg shadow-lg bg-white p-4 flex items-center transition-transform transform hover:scale-105">
      <div className={`text-4xl flex justify-center items-center ${color} text-white rounded-full w-16 h-16`}>
        {icon}
      </div>
      <div className="pl-4">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-xl font-bold text-gray-800">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
