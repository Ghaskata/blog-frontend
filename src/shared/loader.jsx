import React from "react";

const Loader = () => {
    return (
        <div className="fixed top-0 start-0 w-screen h-2 z-50">
            <div class="load-bar">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
        </div>
    );
};

export default Loader;
