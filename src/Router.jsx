import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import LikedVideos from "./pages/LikedVideos";
import Subscriptions from "./pages/Subscriptions";
import History from "./pages/History";
import Playlist from "./pages/Playlist";
import YourVideos from "./pages/YourVideos";
import Channel from "./pages/Channel";
import NotFound from "./pages/NotFound";
import WatchVideo from "./pages/WatchVideo";
import LeftNav from "./components/LeftNav";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="w-screen ps-0 md:ps-[250px] pt-16 min-h-screen transition-all duration-300 ease-linear">
        <Routes>
          {/* <Route path="/" exact element={<Feed />} />
          <Route path="/searchResult/:searchQuery" element={<SearchResult />} />
          <Route path="/video/:id" element={<VideoDetails />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/watch/:videoId" element={<WatchVideo />} />
          <Route path="/liked_videos" element={<LikedVideos />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/history" element={<History />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/my_videos" element={<YourVideos />} />
          <Route path="/channel/userId" element={<Channel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
