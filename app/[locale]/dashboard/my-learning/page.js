"use client";
import { DashboardHeader, SideBar } from "components";
import LearningCard from "components/Card/LearningCard";
import { AuthHoc } from "hoc";
import Image from "next/image";
import Link from "next/link";
import { LuClock } from "react-icons/lu";
import { useRecoilValue } from "recoil";
import { authAtom } from "state/authAtom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import JourneyCard from "components/Card/JourneyCard";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

const page = () => {
  const token = useRecoilValue(authAtom);
  var settings = {
    // dots: true,
    // arrows: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <AuthHoc>
      <div className="flex relative">
        {token && (
          <div className="hidden lg:block">
            <SideBar />
          </div>
        )}

        <div id="main-content" className="h-full">
          {token ? (
            <>
              <DashboardHeader isHome={true} />
              <div className=" w-screen md:w-[80vw] 2xl:w-[85vw] p-8 ">
                <Banner />
                {/* Slider */}
                <div className="">
                  <br />
                  <br />
                  <Section
                    title="Continue Your Journey"
                    subtitle="Jump back into lesson 5 and keep discovering new skills."
                  />
                  <br />
                  <Slider {...settings}>
                    {sliderData.map((slide, i) => (
                      <div className="pe-2">
                        <JourneyCard key={i} card={slide} />
                      </div>
                    ))}
                  </Slider>
                </div>
                {/* All data show  */}
                {data.map(data => (
                  <div>
                    <br />
                    <br />
                    <Section title={data.title} subtitle={data.subtitle} />
                    <br />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                      {data.card.map(card => (
                        <LearningCard key={card} card={card} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </AuthHoc>
  );
};

export default page;

const Banner = () => (
  <div className="relative bg-[#0366FF] rounded-[14px] flex items-center gap-4 px-4 py-8">
    <div className="relative">
      <div className="absolute left-6 top-6 w-[80px] h-[80px] bg-gradient-to-r from-[#96f0d5] to-[#b2f5ce] rounded-full blur-2xl opacity-60"></div>

      <Image
        src="/images/learning/user.png"
        width={80}
        height={80}
        className="rounded-full !z-10"
        alt="user"
      />
    </div>
    <div>
      <h2 className="text-white text-[26px] font-bold">
        Welcome back, Mukesh 👋🏻
      </h2>
      <p className="text-white text-[16px]">
        Product, Information Technology{" "}
        <Link href={"/"} className="underline">
          Edit Interest and occupation
        </Link>
      </p>
    </div>

    <Image
      src="/images/learning/banner.png"
      width={200}
      height={200}
      className="absolute bottom-0 right-4 !z-10"
      alt="user"
    />
  </div>
);

const Section = ({ title, subtitle }) => (
  <div>
    <h2 className="text-2xl font-bold mb-1">{title}</h2>
    <p className="text-[#8B8B8B] text-lg font-medium">{subtitle}</p>
  </div>
);

function SampleNextArrow({ onClick }) {
  return (
    <FaCircleChevronRight
      className="absolute hidden md:block right-6 md:-right-2 top-[2%] md:top-[45%] text-xl md:text-2xl hover:text-gray-700 rounded-full cursor-pointer text-gray-500 z-40"
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(p) {
  return (
    <FaCircleChevronLeft
      className={`absolute hidden left-0 md:-left-4 top-[28%] md:top-[45%] text-xl md:text-2xl hover:text-gray-700 rounded-full cursor-pointer z-10 text-gray-500 ${
        p.currentSlide > 0 ? "md:block" : ""
      }`}
      onClick={p.onClick}
    />
  );
}

const data = [
  {
    id: 1,
    title: "Assigned to me",
    subtitle: "Build your skills your way",
    card: [
      {
        id: 1,
        img: "/images/learning/card.png",
        type: "Learning Path",
        title: "Develop Your Creative Thinking and Innovation Skills",
        desc: {
          icon: <LuClock />,
          text: "7 items of learning content",
        },
        progress: 30,
        dueDate: "8th March, 2024",
      },
      {
        id: 2,
        img: "/images/learning/card-2.png",
        type: "Course",
        title: "Develop Your Creative Thinking and Innovation Skills",
        desc: {
          icon: <LuClock />,
          text: "7 items of learning content",
        },
        progress: 65,
        dueDate: "8th March, 2024",
      },
      {
        id: 3,
        img: "/images/learning/card-3.png",
        type: "Video",
        title: "Develop Your Creative Thinking and Innovation Skills",
        desc: {
          icon: <LuClock />,
          text: "7 items of learning content",
        },
        progress: 40,
        dueDate: "8th March, 2024",
      },
      {
        id: 4,
        img: "/images/learning/card.png",
        type: "Course",
        title: "Develop Your Creative Thinking and Innovation Skills",
        desc: {
          icon: <LuClock />,
          text: "7 items of learning content",
        },
        progress: 55,
        dueDate: "8th March, 2024",
      },
    ],
  },
  {
    id: 2,
    title: "Top picks for you",
    subtitle:
      "Feed your desire to learn with these courses handpicked just for you.",
    card: [
      {
        id: 1,
        img: "/images/learning/card-2.png",
        type: "Course",
        title: "Manage your work effectively and learn how to excel",
        desc: {
          icon: <LuClock />,
          text: "53m of content",
        },
      },
      {
        id: 2,
        img: "/images/learning/card-3.png",
        type: "Course",
        title: "Win at the workplace to win at the marketplace",
        desc: {
          icon: <LuClock />,
          text: "53m of content",
        },
      },
      {
        id: 3,
        img: "/images/learning/card-2.png",
        type: "Learning Path",
        title: "Effective project planning training",
        desc: {
          icon: <LuClock />,
          text: "53m of content",
        },
      },
      {
        id: 4,
        img: "/images/learning/card.png",
        type: "Video",
        title: "Manage your work effectively and learn how to excel",
        desc: {
          icon: <LuClock />,
          text: "53m of content",
        },
      },
    ],
  },
  {
    id: 3,
    title: "Explore more",
    subtitle:
      "Explore these courses that will build your skills to new heights.",
    card: [
      {
        id: 1,
        img: "/images/learning/card-3.png",
        type: "Course",
        title: "Manage your work effectively and learn how to excel",
        desc: {
          icon: <LuClock />,
          text: "53m of content",
        },
      },
      {
        id: 2,
        img: "/images/learning/card-2.png",
        type: "Course",
        title: "Win at the workplace to win at the marketplace",
        desc: {
          icon: <LuClock />,
          text: "53m of content",
        },
      },
      {
        id: 3,
        img: "/images/learning/card.png",
        type: "Course",
        title: "Manage your work effectively and learn how to excel",
        desc: {
          icon: <LuClock />,
          text: "53m of content",
        },
      },
      {
        id: 4,
        img: "/images/learning/card-2.png",
        type: "Video",
        title: "Effective project planning training ",
        desc: {
          icon: <LuClock />,
          text: "53m of content",
        },
      },
    ],
  },
];

const sliderData = [
  {
    id: 1,
    img: "/images/learning/slide.png",
    type: "Course",
    title: "Manage your work effectively and learn how to excel",
    progress: 40,
  },
  {
    id: 2,
    img: "/images/learning/slide.png",
    type: "Course",
    title: "Manage your work effectively and learn how to excel",
    progress: 40,
  },
  {
    id: 3,
    img: "/images/learning/slide.png",
    type: "Course",
    title: "Manage your work effectively and learn how to excel",
    progress: 40,
  },
  {
    id: 4,
    img: "/images/learning/slide.png",
    type: "Course",
    title: "Manage your work effectively and learn how to excel",
    progress: 40,
  },
  {
    id: 5,
    img: "/images/learning/slide.png",
    type: "Course",
    title: "Manage your work effectively and learn how to excel",
    progress: 40,
  },
];
