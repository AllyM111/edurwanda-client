
import { useEffect, useState } from "react";
import { FaPlus, FaYoutube, FaEdit, FaTrash } from "react-icons/fa";

import {
  getYoutubeVideos,
  deleteYoutubeVideo,
} from "../../services/youtubeService";

import {
  getYoutubeChannels,
  createYoutubeChannel,
  updateYoutubeChannel,
  deleteYoutubeChannel,
} from "../../services/youtubeChannelService";

import YoutubeTable from "./YoutubeTable";

import YoutubeForm from "../../components/youtube/YoutubeForm";
import DeleteYoutubeModal from "../../components/youtube/DeleteYoutubeModal";

export default function Media() {
  // ==========================================
  // DATA
  // ==========================================

  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // VIDEO STATE
  // ==========================================

  const [showVideoForm, setShowVideoForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [deleteVideo, setDeleteVideo] = useState(null);

  // ==========================================
  // CHANNEL STATE
  // ==========================================

  const [showChannelForm, setShowChannelForm] = useState(false);
  const [editingChannel, setEditingChannel] = useState(null);

  const [channelSaving, setChannelSaving] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [deleteChannel, setDeleteChannel] = useState(null);

  const [channelForm, setChannelForm] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "🎬",
    youtubeUrl: "",
    category: "MEDIA",
    active: true,
  });

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    await Promise.all([
      loadVideos(),
      loadChannels(),
    ]);

    setLoading(false);
  }

  // ==========================================
  // LOAD VIDEOS
  // ==========================================

  async function loadVideos() {
    try {
      const data = await getYoutubeVideos();

      setVideos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(
        "LOAD YOUTUBE VIDEOS ERROR:",
        error
      );

      setVideos([]);
    }
  }

  // ==========================================
  // LOAD CHANNELS
  // ==========================================

  async function loadChannels() {
    try {
      const data = await getYoutubeChannels();

      setChannels(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(
        "LOAD YOUTUBE CHANNELS ERROR:",
        error
      );

      setChannels([]);
    }
  }

  // ==========================================
  // VIDEO ACTIONS
  // ==========================================

  function handleAddVideo() {
    if (channels.length === 0) {
      alert(
        "Please create a YouTube channel first."
      );

      return;
    }

    setEditingVideo(null);
    setShowVideoForm(true);
  }

  function handleEditVideo(video) {
    setEditingVideo(video);
    setShowVideoForm(true);
  }

  function handleCloseVideoForm() {
    setShowVideoForm(false);
    setEditingVideo(null);
  }

  async function handleVideoSuccess() {
    setShowVideoForm(false);
    setEditingVideo(null);

    await loadVideos();
    await loadChannels();
  }

  function handleAskDeleteVideo(video) {
    setDeleteVideo(video);
  }

  async function handleDeleteVideo() {
    if (!deleteVideo) {
      return;
    }

    try {
      await deleteYoutubeVideo(deleteVideo.id);

      setDeleteVideo(null);

      await loadVideos();
    } catch (error) {
      console.error(
        "DELETE YOUTUBE VIDEO ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete video."
      );
    }
  }

  // ==========================================
  // CHANNEL FORM
  // ==========================================

  function resetChannelForm() {
    setChannelForm({
      name: "",
      slug: "",
      description: "",
      icon: "🎬",
      youtubeUrl: "",
      category: "MEDIA",
      active: true,
    });

    setProfileImage(null);
    setCoverImage(null);
    setEditingChannel(null);
    setShowChannelForm(false);
  }

  function handleAddChannel() {
    setEditingChannel(null);

    setChannelForm({
      name: "",
      slug: "",
      description: "",
      icon: "🎬",
      youtubeUrl: "",
      category: "MEDIA",
      active: true,
    });

    setProfileImage(null);
    setCoverImage(null);

    setShowChannelForm(true);
  }

  function handleEditChannel(channel) {
    setEditingChannel(channel);

    setChannelForm({
      name: channel.name || "",
      slug: channel.slug || "",
      description: channel.description || "",
      icon: channel.icon || "🎬",
      youtubeUrl: channel.youtubeUrl || "",
      category: channel.category || "MEDIA",
      active: channel.active ?? true,
    });

    setProfileImage(null);
    setCoverImage(null);

    setShowChannelForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleChannelChange(event) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setChannelForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  function handleProfileImageChange(event) {
    const file = event.target.files?.[0];

    if (file) {
      setProfileImage(file);
    }
  }

  function handleCoverImageChange(event) {
    const file = event.target.files?.[0];

    if (file) {
      setCoverImage(file);
    }
  }

  // ==========================================
  // CREATE / UPDATE CHANNEL
  // ==========================================

  async function handleChannelSubmit(event) {
    event.preventDefault();

    if (!channelForm.name.trim()) {
      alert("Please enter the channel name.");
      return;
    }

    if (!channelForm.slug.trim()) {
      alert("Please enter the channel slug.");
      return;
    }

    if (!editingChannel && !profileImage) {
      alert("Please select a profile image.");
      return;
    }

    if (!editingChannel && !coverImage) {
      alert("Please select a cover image.");
      return;
    }

    try {
      setChannelSaving(true);

      const formData = new FormData();

      formData.append(
        "name",
        channelForm.name
      );

      formData.append(
        "slug",
        channelForm.slug
      );

      formData.append(
        "description",
        channelForm.description
      );

      formData.append(
        "icon",
        channelForm.icon
      );

      formData.append(
        "youtubeUrl",
        channelForm.youtubeUrl
      );

      formData.append(
        "category",
        channelForm.category
      );

      formData.append(
        "active",
        String(channelForm.active)
      );

      if (profileImage) {
        formData.append(
          "profileImage",
          profileImage
        );
      }

      if (coverImage) {
        formData.append(
          "coverImage",
          coverImage
        );
      }

      if (editingChannel) {
        await updateYoutubeChannel(
          editingChannel.id,
          formData
        );
      } else {
        await createYoutubeChannel(
          formData
        );
      }

      await loadChannels();

      resetChannelForm();

      alert(
        editingChannel
          ? "YouTube channel updated successfully."
          : "YouTube channel created successfully."
      );
    } catch (error) {
      console.error(
        "SAVE YOUTUBE CHANNEL ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to save YouTube channel."
      );
    } finally {
      setChannelSaving(false);
    }
  }

  // ==========================================
  // DELETE CHANNEL
  // ==========================================

  function handleAskDeleteChannel(channel) {
    setDeleteChannel(channel);
  }

  async function handleDeleteChannel() {
    if (!deleteChannel) {
      return;
    }

    try {
      await deleteYoutubeChannel(
        deleteChannel.id
      );

      setDeleteChannel(null);

      await loadChannels();
      await loadVideos();
    } catch (error) {
      console.error(
        "DELETE YOUTUBE CHANNEL ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete YouTube channel."
      );
    }
  }

  // ==========================================
  // STATISTICS
  // ==========================================

  const featuredVideos = videos.filter(
    (video) => video.featured === true
  ).length;

  const activeChannels = channels.filter(
    (channel) => channel.active === true
  ).length;

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div
      className="space-y-8"
      style={{
        color: "var(--text-color)",
      }}
    >
      {/* =====================================
          HEADER
      ====================================== */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <FaYoutube
              size={32}
              style={{
                color:
                  "var(--primary-color)",
              }}
            />

            <h1
              className="text-4xl font-bold"
              style={{
                color:
                  "var(--primary-color)",
              }}
            >
              YouTube Manager
            </h1>
          </div>

          <p
            className="mt-2"
            style={{
              color:
                "var(--muted-color)",
            }}
          >
            Manage EduRwanda YouTube channels
            and videos.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleAddChannel}
            className="flex items-center gap-2 rounded-lg px-5 py-3 font-semibold text-white"
            style={{
              backgroundColor:
                "var(--primary-color)",
            }}
          >
            <FaPlus />

            Create Channel
          </button>

          <button
            type="button"
            onClick={handleAddVideo}
            className="flex items-center gap-2 rounded-lg border px-5 py-3 font-semibold"
            style={{
              borderColor:
                "var(--border-color)",
            }}
          >
            <FaPlus />

            Add Video
          </button>
        </div>
      </div>

      {/* =====================================
          STATISTICS
      ====================================== */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div
          className="rounded-xl border p-5"
          style={{
            backgroundColor:
              "var(--card-color)",
            borderColor:
              "var(--border-color)",
          }}
        >
          <p
            className="text-sm"
            style={{
              color:
                "var(--muted-color)",
            }}
          >
            Total Videos
          </p>

          <p className="mt-2 text-3xl font-bold">
            {videos.length}
          </p>
        </div>

        <div
          className="rounded-xl border p-5"
          style={{
            backgroundColor:
              "var(--card-color)",
            borderColor:
              "var(--border-color)",
          }}
        >
          <p
            className="text-sm"
            style={{
              color:
                "var(--muted-color)",
            }}
          >
            Total Channels
          </p>

          <p className="mt-2 text-3xl font-bold">
            {channels.length}
          </p>
        </div>

        <div
          className="rounded-xl border p-5"
          style={{
            backgroundColor:
              "var(--card-color)",
            borderColor:
              "var(--border-color)",
          }}
        >
          <p
            className="text-sm"
            style={{
              color:
                "var(--muted-color)",
            }}
          >
            Active Channels
          </p>

          <p className="mt-2 text-3xl font-bold">
            {activeChannels}
          </p>
        </div>

        <div
          className="rounded-xl border p-5"
          style={{
            backgroundColor:
              "var(--card-color)",
            borderColor:
              "var(--border-color)",
          }}
        >
          <p
            className="text-sm"
            style={{
              color:
                "var(--muted-color)",
            }}
          >
            Featured Videos
          </p>

          <p className="mt-2 text-3xl font-bold">
            {featuredVideos}
          </p>
        </div>
      </div>

      {/* =====================================
          CHANNEL FORM
      ====================================== */}

      {showChannelForm && (
        <div
          className="rounded-xl border p-6"
          style={{
            backgroundColor:
              "var(--card-color)",
            borderColor:
              "var(--border-color)",
          }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {editingChannel
                  ? "Edit YouTube Channel"
                  : "Create YouTube Channel"}
              </h2>

              <p
                className="mt-1 text-sm"
                style={{
                  color:
                    "var(--muted-color)",
                }}
              >
                Add the information that will
                appear on the EduRwanda Media Hub.
              </p>
            </div>

            <button
              type="button"
              onClick={resetChannelForm}
              className="rounded-lg border px-4 py-2"
              style={{
                borderColor:
                  "var(--border-color)",
              }}
            >
              Cancel
            </button>
          </div>

          <form
            onSubmit={handleChannelSubmit}
            className="space-y-5"
          >
            {/* CHANNEL NAME */}

            <div>
              <label className="mb-2 block font-semibold">
                Channel Name
              </label>

              <input
                type="text"
                name="name"
                value={channelForm.name}
                onChange={
                  handleChannelChange
                }
                placeholder="Rwanda Lyrics"
                required
                className="w-full rounded-lg border px-4 py-3"
                style={{
                  backgroundColor:
                    "var(--background-color)",
                  borderColor:
                    "var(--border-color)",
                  color:
                    "var(--text-color)",
                }}
              />
            </div>

            {/* SLUG */}

            <div>
              <label className="mb-2 block font-semibold">
                Channel Slug
              </label>

              <input
                type="text"
                name="slug"
                value={channelForm.slug}
                onChange={
                  handleChannelChange
                }
                placeholder="rwanda-lyrics"
                required
                className="w-full rounded-lg border px-4 py-3"
                style={{
                  backgroundColor:
                    "var(--background-color)",
                  borderColor:
                    "var(--border-color)",
                  color:
                    "var(--text-color)",
                }}
              />

              <p
                className="mt-1 text-sm"
                style={{
                  color:
                    "var(--muted-color)",
                }}
              >
                Example:
                /youtube/rwanda-lyrics
              </p>
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="mb-2 block font-semibold">
                Description
              </label>

              <textarea
                name="description"
                value={
                  channelForm.description
                }
                onChange={
                  handleChannelChange
                }
                rows={4}
                placeholder="Describe this YouTube channel..."
                className="w-full rounded-lg border px-4 py-3"
                style={{
                  backgroundColor:
                    "var(--background-color)",
                  borderColor:
                    "var(--border-color)",
                  color:
                    "var(--text-color)",
                }}
              />
            </div>

            {/* ICON */}

            <div>
              <label className="mb-2 block font-semibold">
                Icon
              </label>

              <input
                type="text"
                name="icon"
                value={channelForm.icon}
                onChange={
                  handleChannelChange
                }
                placeholder="🎬"
                className="w-full rounded-lg border px-4 py-3"
                style={{
                  backgroundColor:
                    "var(--background-color)",
                  borderColor:
                    "var(--border-color)",
                  color:
                    "var(--text-color)",
                }}
              />
            </div>

            {/* YOUTUBE URL */}

            <div>
              <label className="mb-2 block font-semibold">
                YouTube Channel URL
              </label>

              <input
                type="url"
                name="youtubeUrl"
                value={
                  channelForm.youtubeUrl
                }
                onChange={
                  handleChannelChange
                }
                placeholder="https://youtube.com/@RwandaLyrics"
                className="w-full rounded-lg border px-4 py-3"
                style={{
                  backgroundColor:
                    "var(--background-color)",
                  borderColor:
                    "var(--border-color)",
                  color:
                    "var(--text-color)",
                }}
              />
            </div>

            {/* CATEGORY */}

            <div>
              <label className="mb-2 block font-semibold">
                Category
              </label>

              <select
                name="category"
                value={
                  channelForm.category
                }
                onChange={
                  handleChannelChange
                }
                className="w-full rounded-lg border px-4 py-3"
                style={{
                  backgroundColor:
                    "var(--background-color)",
                  borderColor:
                    "var(--border-color)",
                  color:
                    "var(--text-color)",
                }}
              >
                <option value="MEDIA">
                  MEDIA
                </option>

                <option value="MUSIC">
                  MUSIC
                </option>

                <option value="EDUCATION">
                  EDUCATION
                </option>

                <option value="TECH">
                  TECH
                </option>

                <option value="ENTERTAINMENT">
                  ENTERTAINMENT
                </option>
              </select>
            </div>

            {/* IMAGES */}

            <div className="grid gap-5 md:grid-cols-2">
              {/* PROFILE */}

              <div>
                <label className="mb-2 block font-semibold">
                  Profile Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleProfileImageChange
                  }
                  className="w-full"
                />

                {profileImage && (
                  <img
                    src={URL.createObjectURL(
                      profileImage
                    )}
                    alt="Profile preview"
                    className="mt-4 h-24 w-24 rounded-full object-cover"
                  />
                )}

                {!profileImage &&
                  editingChannel?.profileImage && (
                    <img
                      src={
                        editingChannel.profileImage
                      }
                      alt="Current profile"
                      className="mt-4 h-24 w-24 rounded-full object-cover"
                    />
                  )}
              </div>

              {/* COVER */}

              <div>
                <label className="mb-2 block font-semibold">
                  Cover Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleCoverImageChange
                  }
                  className="w-full"
                />

                {coverImage && (
                  <img
                    src={URL.createObjectURL(
                      coverImage
                    )}
                    alt="Cover preview"
                    className="mt-4 h-32 w-full rounded-lg object-cover"
                  />
                )}

                {!coverImage &&
                  editingChannel?.coverImage && (
                    <img
                      src={
                        editingChannel.coverImage
                      }
                      alt="Current cover"
                      className="mt-4 h-32 w-full rounded-lg object-cover"
                    />
                  )}
              </div>
            </div>

            {/* ACTIVE */}

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="active"
                checked={
                  channelForm.active
                }
                onChange={
                  handleChannelChange
                }
                className="h-5 w-5"
              />

              <span className="font-semibold">
                Active Channel
              </span>
            </label>

            {/* BUTTONS */}

            <div className="flex gap-3 pt-3">
              <button
                type="submit"
                disabled={channelSaving}
                className="rounded-lg px-6 py-3 font-semibold text-white disabled:opacity-50"
                style={{
                  backgroundColor:
                    "var(--primary-color)",
                }}
              >
                {channelSaving
                  ? "Saving..."
                  : editingChannel
                    ? "Update Channel"
                    : "Create Channel"}
              </button>

              <button
                type="button"
                onClick={resetChannelForm}
                disabled={channelSaving}
                className="rounded-lg border px-6 py-3 font-semibold"
                style={{
                  borderColor:
                    "var(--border-color)",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =====================================
          CHANNELS
      ====================================== */}

      <div>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              YouTube Channels
            </h2>

            <p
              className="mt-1"
              style={{
                color:
                  "var(--muted-color)",
              }}
            >
              Manage the channels displayed on
              the Media Hub.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddChannel}
            className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold text-white"
            style={{
              backgroundColor:
                "var(--primary-color)",
            }}
          >
            <FaPlus />

            Add Channel
          </button>
        </div>

        {loading ? (
          <div
            className="rounded-xl border p-10 text-center"
            style={{
              backgroundColor:
                "var(--card-color)",
              borderColor:
                "var(--border-color)",
            }}
          >
            Loading channels...
          </div>
        ) : channels.length === 0 ? (
          <div
            className="rounded-xl border p-10 text-center"
            style={{
              backgroundColor:
                "var(--card-color)",
              borderColor:
                "var(--border-color)",
            }}
          >
            <FaYoutube
              size={45}
              className="mx-auto mb-4"
              style={{
                color:
                  "var(--muted-color)",
              }}
            />

            <h3 className="text-xl font-bold">
              No YouTube channels yet
            </h3>

            <p
              className="mt-2"
              style={{
                color:
                  "var(--muted-color)",
              }}
            >
              Create your first YouTube channel
              to start adding videos.
            </p>

            <button
              type="button"
              onClick={handleAddChannel}
              className="mt-5 rounded-lg px-5 py-3 font-semibold text-white"
              style={{
                backgroundColor:
                  "var(--primary-color)",
              }}
            >
              Create Channel
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="overflow-hidden rounded-xl border"
                style={{
                  backgroundColor:
                    "var(--card-color)",
                  borderColor:
                    "var(--border-color)",
                }}
              >
                {/* COVER */}

                {channel.coverImage ? (
                  <img
                    src={channel.coverImage}
                    alt={channel.name}
                    className="h-36 w-full object-cover"
                  />
                ) : (
                  <div
                    className="flex h-36 items-center justify-center text-5xl"
                    style={{
                      backgroundColor:
                        "var(--background-color)",
                    }}
                  >
                    {channel.icon || "🎬"}
                  </div>
                )}

                <div className="p-5">
                  {/* PROFILE */}

                  <div className="flex items-center gap-4">
                    {channel.profileImage ? (
                      <img
                        src={
                          channel.profileImage
                        }
                        alt={channel.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-full text-2xl"
                        style={{
                          backgroundColor:
                            "var(--background-color)",
                        }}
                      >
                        {channel.icon ||
                          "🎬"}
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-bold">
                        {channel.name}
                      </h3>

                      <p
                        className="truncate text-sm"
                        style={{
                          color:
                            "var(--muted-color)",
                        }}
                      >
                        /{channel.slug}
                      </p>
                    </div>
                  </div>

                  {/* CATEGORY */}

                  <div className="mt-4">
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor:
                          "var(--background-color)",
                        color:
                          "var(--primary-color)",
                      }}
                    >
                      {channel.category}
                    </span>
                  </div>

                  {/* DESCRIPTION */}

                  <p
                    className="mt-4 line-clamp-3 text-sm"
                    style={{
                      color:
                        "var(--muted-color)",
                    }}
                  >
                    {channel.description ||
                      "No description"}
                  </p>

                  {/* STATUS */}

                  <div className="mt-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        channel.active
                          ? "bg-green-600 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {channel.active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>

                  {/* ACTIONS */}

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleEditChannel(
                          channel
                        )
                      }
                      className="flex items-center gap-2 rounded-lg border px-4 py-2 font-semibold"
                      style={{
                        borderColor:
                          "var(--border-color)",
                      }}
                    >
                      <FaEdit />

                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleAskDeleteChannel(
                          channel
                        )
                      }
                      className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white"
                    >
                      <FaTrash />

                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* =====================================
          VIDEOS
      ====================================== */}

      <div>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              YouTube Videos
            </h2>

            <p
              className="mt-1"
              style={{
                color:
                  "var(--muted-color)",
              }}
            >
              Manage videos published to your
              channels.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddVideo}
            disabled={channels.length === 0}
            className="flex items-center gap-2 rounded-lg px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              backgroundColor:
                "var(--primary-color)",
            }}
          >
            <FaPlus />

            Add Video
          </button>
        </div>

        {channels.length === 0 && !loading && (
          <div
            className="mb-5 rounded-lg border p-5"
            style={{
              backgroundColor:
                "var(--card-color)",
              borderColor:
                "var(--border-color)",
            }}
          >
            <p className="font-semibold">
              Create a YouTube channel first.
            </p>

            <p
              className="mt-1 text-sm"
              style={{
                color:
                  "var(--muted-color)",
              }}
            >
              Videos need to belong to a YouTube
              channel.
            </p>
          </div>
        )}

        {loading ? (
          <div
            className="rounded-xl border p-10 text-center"
            style={{
              backgroundColor:
                "var(--card-color)",
              borderColor:
                "var(--border-color)",
            }}
          >
            Loading videos...
          </div>
        ) : (
          <YoutubeTable
            videos={videos}
            channels={channels}
            onEdit={handleEditVideo}
            onDelete={handleAskDeleteVideo}
          />
        )}
      </div>

      {/* =====================================
          VIDEO FORM
      ====================================== */}

      {showVideoForm && (
        <YoutubeForm
          video={editingVideo}
          onClose={handleCloseVideoForm}
          onSuccess={handleVideoSuccess}
        />
      )}

      {/* =====================================
          DELETE VIDEO MODAL
      ====================================== */}

      {deleteVideo && (
        <DeleteYoutubeModal
          video={deleteVideo}
          onClose={() =>
            setDeleteVideo(null)
          }
          onConfirm={handleDeleteVideo}
        />
      )}

      {/* =====================================
          DELETE CHANNEL CONFIRMATION
      ====================================== */}

      {deleteChannel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5"
        >
          <div
            className="w-full max-w-md rounded-xl border p-6"
            style={{
              backgroundColor:
                "var(--card-color)",
              borderColor:
                "var(--border-color)",
              color:
                "var(--text-color)",
            }}
          >
            <h2 className="text-xl font-bold">
              Delete YouTube Channel
            </h2>

            <p
              className="mt-3"
              style={{
                color:
                  "var(--muted-color)",
              }}
            >
              Are you sure you want to delete
              <strong>
                {" "}
                {deleteChannel.name}
              </strong>
              ?
            </p>

            <p
              className="mt-2 text-sm"
              style={{
                color:
                  "var(--muted-color)",
              }}
            >
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setDeleteChannel(null)
                }
                className="rounded-lg border px-5 py-2"
                style={{
                  borderColor:
                    "var(--border-color)",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleDeleteChannel
                }
                className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white"
              >
                Delete Channel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
