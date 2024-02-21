import { Toast, toast } from "react-toastify";
import axios from "axios";

const CurrentUser = JSON.parse(localStorage.getItem("user"));

export const authenticate = async (type, payload) => {
  const BACKEND_URL = process.env.REACT_APP_BE;
  try {
    const res = await axios.post(`${BACKEND_URL}/users/${type}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log("res >>> ", res);
    // console.log("res startus>>> ", res.status);
    toast.success(res);

    if (res) {
      const { user, accessToken, refreshToken } = await res.data.data;
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, accessToken, refreshToken })
      );
      window.location.reload();
      return { ...user, accessToken, refreshToken };
    }
  } catch (error) {
    console.log("authenticate errro >>> ", error);
    toast.error("somthing went's wrong", error);
  }
};

export const fetcAllVideos = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE}/videos`, {
      headers: {
        Authorization: `Bearer ${CurrentUser.accessToken}`,
      },
    });
    const data = await res.data.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
export const fetchVideoAndOwnerDetail = async (videoId) => {
  try {
    const videoRes = await axios.get(
      `${process.env.REACT_APP_BE}/videos/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${CurrentUser.accessToken}`,
        },
      }
    );
    const video = await videoRes.data.data;
    const isSubscribed = await checkSubscriptionStatus(video.owner._id);
    // console.log("issubscribed >>> ", isSubscribed);
    const { totalLikes, likedByMe } = await fetchVideoLike(video._id);
    // console.log("totalLikes >>> ", totalLikes);

    return {
      ...video,
      isSubscribed: isSubscribed,
      totalLikes: totalLikes,
      likedByMe: likedByMe,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const checkSubscriptionStatus = async (userId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BE}/subscription/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${CurrentUser.accessToken}`,
        },
      }
    );
    const isSubscribed = await res.data.data.isSubscribed;
    return isSubscribed;
  } catch (error) {
    throw new Error(error);
  }
};

export const toggleSubscription = async (userId) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BE}/subscription/c/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${CurrentUser.accessToken}`,
        },
      }
    );
    const status = res.data.success;
    toast(res.data.message);

    // return status;
  } catch (error) {
    toast.error(error);
    console.log("erroe >>> ", error);
    // throw new Error(error);
  }
};

export const videoAddViewHistory = async (videoId) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_BE}/videos/play/${videoId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${CurrentUser.accessToken}`,
        },
      }
    );
    const updatedVideo = await res;
    // console.log("updated video >>>> ", updatedVideo);
    return updatedVideo;
  } catch (error) {
    console.log("erro>>", error);
    toast.error(error);
  }
};

export const fetchVideoLike = async (videoId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BE}/likes/v/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${CurrentUser.accessToken}`,
        },
      }
    );
    const data = await res.data.data;
    // console.log("like data ?> ", data);
    return data;
  } catch (error) {
    toast.error("like errro ", error);
    throw new Error(error);
  }
};

export const toggleLikeToVideo = async (videoId) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BE}/likes/toggle/v/${videoId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${CurrentUser.accessToken}`,
        },
      }
    );
    // console.log(res);
    // const data = await res.data.data;
    // toast(res.data.message);
  } catch (error) {
    toast.error("toggle like >> ");
    throw new Error(error);
  }
};

export const fetchVideoComments = async (videoId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BE}/comments/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${CurrentUser.accessToken}`,
        },
      }
    );
    const data = await res.data.data;
    console.log("comment data ?> ", data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const addCommentOnVideo = async (videoId, payload) => {
  const BACKEND_URL = process.env.REACT_APP_BE;
  console.log("payload", payload, videoId);
  try {
    const res = await axios.post(
      `${BACKEND_URL}/comments/${videoId}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CurrentUser.accessToken}`,
        },
      }
    );

    console.log("comment add replay >> ", res);

    if (res.data.status === 200) {
      toast.success("comment added successfully");
    } else {
      toast(res.data.data);
    }
  } catch (error) {
    console.log("add comment error", error);
    toast.error("add comment errro", error);
  }
};

export const fetchCommentLike = async (commentId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BE}/likes/c/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${CurrentUser.accessToken}`,
        },
      }
    );
    const data = await res.data.data;
    console.log("like data ?> ", data);
    return data;
  } catch (error) {
    console.log("jdkamx,,,,,,,,,", error);
    toast.error("like errro ", error);
    throw new Error(error);
  }
};

export const toggleLikeToComment = async (commnetId) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BE}/likes/toggle/c/${commnetId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${CurrentUser.accessToken}`,
        },
      }
    );
    // console.log(res);
    // const data = await res.data.data;
    // toast(res.data.message);
  } catch (error) {
    toast.error("toggle like >> ");
    throw new Error(error);
  }
};

export const getHistory = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE}/users/history`, {
      headers: {
        Authorization: `Bearer ${CurrentUser.accessToken}`,
      },
    });
    const data = await res.data.data;
    return data;
  } catch (error) {
    console.log("error of history >>> ", error);
    toast.error("error of history", error);
    throw new Error(error);
  }
};
