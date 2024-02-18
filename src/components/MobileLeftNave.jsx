import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LeftNavMenuItem from "./LeftNavMenuItem";
import { categories } from "../utils/constants";

const MobileLeftNav = ({openSidebar,setopenSidebar}) => {
    // const { selectedCategory, setSelectedCategory, mobileMenu } =
    //     useContext(Context);

    const selectedCategory="Trending"

    const navigate = useNavigate();

    const clickHandler = (name, type) => {
        // switch (type) {
        //     case "category":
        //         return setSelectedCategory(name);
        //     case "home":
        //         return setSelectedCategory(name);
        //     case "menu":
        //         return false;
        //     default:
        //         break;
        // }
    };

    return (
        <div
            // className={`sidebar md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${
            //     mobileMenu ? "translate-x-0" : ""
            // }`}
            
            className={`fixed h-screen top-0 pt-16 z-20 ${openSidebar ? "start-0":" -start-full"} w-[250px] bg-black overflow-y-scroll sidebar transition-all duration-300 ease-linear`}
        >
            <div className="flex px-5 flex-col">
                {categories.map((item) => {
                    return (
                        <React.Fragment key={item.name}>
                            <LeftNavMenuItem
                                text={item.type === "home" ? "Home" : item.name}
                                icon={item.icon}
                                action={() => {
                                    clickHandler(item.name, item.type);
                                    navigate("/");
                                }}
                                className={`${
                                    selectedCategory === item.name
                                        ? "bg-white/[0.15]"
                                        : ""
                                }`}
                            />
                            {item.divider && (
                                <hr className="my-5 border-white/[0.2]" />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileLeftNav;