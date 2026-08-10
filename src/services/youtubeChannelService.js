import api from "./api";

// ======================================
// GET ALL CHANNELS
// PUBLIC
// ======================================

export const getYoutubeChannels = async () => {
  const response = await api.get(
    "/youtube-channels"
  );

  return response.data.data || response.data;
};

// ======================================
// GET CHANNEL BY SLUG
// PUBLIC
// ======================================

export const getYoutubeChannel = async (slug) => {
  const response = await api.get(
    "/youtube-channels/" + slug
  );

  return response.data.data || response.data;
};

// ======================================
// CREATE CHANNEL
// ADMIN
// ======================================

export const createYoutubeChannel = async (
  data
) => {
  const response = await api.post(
    "/youtube-channels",
    data
  );

  return response.data.data || response.data;
};

// ======================================
// UPDATE CHANNEL
// ADMIN
// ======================================

export const updateYoutubeChannel = async (
  id,
  data
) => {
  const response = await api.put(
    "/youtube-channels/" + id,
    data
  );

  return response.data.data || response.data;
};

// ======================================
// DELETE CHANNEL
// ADMIN
// ======================================

export const deleteYoutubeChannel = async (id) => {
  const response = await api.delete(
    "/youtube-channels/" + id
  );

  return response.data;
};

// ======================================
// DEFAULT EXPORT
// ======================================

export default {
  getYoutubeChannels,
  getYoutubeChannel,
  createYoutubeChannel,
  updateYoutubeChannel,
  deleteYoutubeChannel,
};