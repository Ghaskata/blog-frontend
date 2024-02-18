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

    console.log("res >>> ", res);
    console.log("res startus>>> ", res.status);
    toast.success(res);

    if (res) {
      const { user, accessToken, refreshToken } = await res.data.data;
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, accessToken, refreshToken })
      );
      return { ...user, accessToken, refreshToken };
    }
  } catch (error) {
    console.log("authenticate errro >>> ", error);
    toast.error("somthing went's wrong");
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
        headers:{
          Authorization:`Bearer ${CurrentUser.accessToken}`
        }
      }
    );
    const video = await videoRes.data.data;
    return video;
  } catch (error) {
    throw new Error(error);
  }
};

export const checkSubscriptionStatus = async (userId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BE}/subscription/${userId}`,
      {
        headers:{
          Authorization:`Bearer ${CurrentUser.accessToken}`
        }
      }
    );
    const data = await res.data.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
