import api from "./api";

// ======================================
// GET ALL VIDEOS
// PUBLIC
// ======================================

export const getYoutubeVideos = async () => {
  const response = await api.get("/youtube");

  return response.data.data || response.data;
};

// ======================================
// GET VIDEOS BY CHANNEL
// PUBLIC
// ======================================

export const getChannelVideos = async (channel) => {
  const response = await api.get(
    "/youtube/channel/" + channel
  );

  return response.data.data || response.data;
};

// ======================================
// GET SINGLE VIDEO
// PUBLIC
// ======================================

export const getYoutubeVideo = async (id) => {
  const response = await api.get(
    "/youtube/" + id
  );

  return response.data.data || response.data;
};

// ======================================
// CREATE VIDEO
// ADMIN
// ======================================

export const createYoutubeVideo = async (data) => {
  const response = await api.post(
    "/youtube",
    data
  );

  return response.data.data || response.data;
};

// ======================================
// UPDATE VIDEO
// ADMIN
// ======================================

export const updateYoutubeVideo = async (
  id,
  data
) => {
  const response = await api.put(
    "/youtube/" + id,
    data
  );

  return response.data.data || response.data;
};

// ======================================
// DELETE VIDEO
// ADMIN
// ======================================

export const deleteYoutubeVideo = async (id) => {
  const response = await api.delete(
    "/youtube/" + id
  );

  return response.data;
};

// ======================================
// INCREASE VIDEO VIEW
// PUBLIC
// ======================================

export const incrementYoutubeView = async (id) => {
  const response = await api.patch(
    "/youtube/" + id + "/view"
  );

  return response.data;
};

// ======================================
// TOGGLE FEATURED VIDEO
// ADMIN
// ======================================

export const toggleFeaturedVideo = async (
  id,
  featured
) => {
  const response = await api.put(
    "/youtube/" + id,
    {
      featured,
    }
  );

  return response.data.data || response.data;
};

// ======================================
// DEFAULT EXPORT
// ======================================

export default {
  getYoutubeVideos,
  getChannelVideos,
  getYoutubeVideo,
  createYoutubeVideo,
  updateYoutubeVideo,
  deleteYoutubeVideo,
  incrementYoutubeView,
  toggleFeaturedVideo,
};