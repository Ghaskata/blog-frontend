import React from "react";

import { AiFillHome, AiFillLike, AiOutlineFlag } from "react-icons/ai";
import { MdLocalFireDepartment, MdLiveTv, MdLibraryMusic, MdSubscriptions } from "react-icons/md";
import { CgMusicNote } from "react-icons/cg";
import { FiFilm } from "react-icons/fi";
import { IoGameControllerSharp } from "react-icons/io5";
import { ImNewspaper } from "react-icons/im";
import { GiDiamondTrophy, GiEclipse } from "react-icons/gi";
import { RiLightbulbLine, RiFeedbackLine, RiHistoryFill, RiVidicon2Fill } from "react-icons/ri";
import { FiSettings, FiHelpCircle } from "react-icons/fi";

export const categories = [
  { name: "New", icon: <AiFillHome />, type: "Home",divider: true ,href:"/"},

  { name: "History", icon: <RiHistoryFill />, type: "You",href:"/history" },
  { name: "Your videos", icon: <RiVidicon2Fill />, type: "You",href:"/your_videos" },
  { name: "Liked videos", icon: <AiFillLike />, type: "You",href:"/liked_videos" },
  { name: "Playlist", icon: <MdLibraryMusic />, type: "You",href:"/playlist" },
  { name: "Subscriptions", icon: <MdSubscriptions />, type: "You",divider: true,href:"/subscription" },




  { name: "Trending", icon: <MdLocalFireDepartment />, type: "category" },
  { name: "Music", icon: <CgMusicNote />, type: "category" },
  { name: "Films", icon: <FiFilm />, type: "category" },
  { name: "Live", icon: <MdLiveTv />, type: "category" },
  { name: "Gaming", icon: <IoGameControllerSharp />, type: "category" },
  { name: "News", icon: <ImNewspaper />, type: "category" },
  { name: "Sports", icon: <GiDiamondTrophy />, type: "category" },
  { name: "Learning", icon: <RiLightbulbLine />, type: "category" },
  {
    name: "Fashion & beauty",
    icon: <GiEclipse />,
    type: "category",
    divider: true,
  },
  { name: "Settings", icon: <FiSettings />, type: "menu" },
  { name: "Report History", icon: <AiOutlineFlag />, type: "menu" },
  { name: "Help", icon: <FiHelpCircle />, type: "menu" },
  { name: "Send feedback", icon: <RiFeedbackLine />, type: "menu" },

  
];
