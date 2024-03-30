import ProgressBar from "components/ProgressBar";
import Image from "next/image";
import React from "react";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";

const JourneyCard = ({ card = {} }) => {
  return (
    <div className="flex items-center border border-[#EBEBEB] rounded-[14px] 2xl:p-5 p-2">
      <Image src={card.img} width={100} height={100} className="" alt="user" />
      <div className="px-5">
        <span
          className={`${
            card.type === "Course" ? "text-[#0068FF]" : "text-[#F49F57]"
          } text-sm font-medium`}
        >
          {card.type}
        </span>
        <h2 className="font-bold my-2">{card.title}</h2>
        {card.progress && <ProgressBar percentage={card.progress} />}
      </div>
      <BsThreeDotsVertical className="text-2xl cursor-pointer" />
    </div>
  );
};

export default JourneyCard;
