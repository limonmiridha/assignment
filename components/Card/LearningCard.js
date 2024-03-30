import ProgressBar from "components/ProgressBar";
import Image from "next/image";
import React from "react";
import { LuClock } from "react-icons/lu";

const LearningCard = ({ card = {} }) => {
  return (
    <div className="border border-[#EBEBEB] rounded-[14px]">
      <div className="relative w-full aspect-[4/2]">
        <Image src={card.img} fill className="" alt="user" />
      </div>
      <div className="p-6">
        <span
          className={`${
            card.type === "Course" ? "text-[#0068FF]" : "text-[#F49F57]"
          } text-sm font-medium`}
        >
          {card.type}
        </span>
        <h2 className="font-bold my-2">{card.title}</h2>
        <p className="flex items-center gap-2 text-sm font-medium">
          <LuClock />
          <span className="text-[#989898]">{card.desc?.text}</span>
        </p>
        {card.progress && <ProgressBar percentage={card.progress} />}
        {card.dueDate && (
          <span className="text-sm text-[#989898]">{card.dueDate}</span>
        )}
      </div>
    </div>
  );
};

export default LearningCard;
