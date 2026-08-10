import { useEffect, useState } from "react";

import {
  getYoutubeChannels,
  createYoutubeChannel,
  updateYoutubeChannel,
  deleteYoutubeChannel,
} from "../../services/youtubeChannelService";

export default function YoutubeChannels() {
  const [channels, setChannels] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [editingChannel, setEditingChannel] = useState(null);

  const [profileImage, setProfileImage] = useState(null);

  const [coverImage, setCoverImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "🎬",
    youtubeUrl: "",
    category: "MEDIA",
    active: true,
  });

  // ======================================
  // LOAD CHANNELS
  // ======================================

  useEffect(() => {
    loadChannels();
  }, []);

  async function loadChannels() {
    try {
      setLoading(true);

      const data = await getYoutubeChannels();

      setChannels(data || []);
    } catch (error) {
      console.error("LOAD CHANNELS ERROR:", error);

      setChannels([]);
    } finally {
      setLoading(false);
    }
  }

  // ======================================
  // FORM CHANGE
  // ======================================

  function handleChange(event) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  // ======================================
  // PROFILE IMAGE
  // ======================================

  function handleProfileImage(event) {
    const file = event.target.files?.[0];

    if (file) {
      setProfileImage(file);
    }
  }

  // ======================================
  // COVER IMAGE
  // ======================================

  function handleCoverImage(event) {
    const file = event.target.files?.[0];

    if (file) {
      setCoverImage(file);
    }
  }

  // ======================================
  // RESET FORM
  // ======================================

  function resetForm() {
    setForm({
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
  }

  // ======================================
  // EDIT CHANNEL
  // ======================================

  function handleEdit(channel) {
    setEditingChannel(channel);

    setForm({
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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // ======================================
  // SUBMIT
  // ======================================

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("name", form.name);

      formData.append("slug", form.slug);

      formData.append(
        "description",
        form.description
      );

      formData.append("icon", form.icon);

      formData.append(
        "youtubeUrl",
        form.youtubeUrl
      );

      formData.append(
        "category",
        form.category
      );

      formData.append(
        "active",
        String(form.active)
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
        if (!profileImage) {
          alert(
            "Please select a profile image."
          );

          setSaving(false);

          return;
        }

        if (!coverImage) {
          alert(
            "Please select a cover image."
          );

          setSaving(false);

          return;
        }

        await createYoutubeChannel(formData);
      }

      await loadChannels();

      resetForm();

      alert(
        editingChannel
          ? "Channel updated successfully."
          : "Channel created successfully."
      );
    } catch (error) {
      console.error(
        "SAVE CHANNEL ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to save channel."
      );
    } finally {
      setSaving(false);
    }
  }

  // ======================================
  // DELETE CHANNEL
  // ======================================

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this channel?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteYoutubeChannel(id);

      await loadChannels();

      if (
        editingChannel &&
        editingChannel.id === id
      ) {
        resetForm();
      }
    } catch (error) {
      console.error(
        "DELETE CHANNEL ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete channel."
      );
    }
  }

  // ======================================
  // LOADING
  // ======================================

  if (loading) {
    return (
      <div
        className="min-h-screen p-8"
        style={{
          backgroundColor:
            "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <h1 className="text-3xl font-bold">
          YouTube Channels
        </h1>

        <p className="mt-6">
          Loading channels...
        </p>
      </div>
    );
  }

  // ======================================
  // PAGE
  // ======================================

  return (
    <div
      className="min-h-screen p-6 md:p-8"
      style={{
        backgroundColor:
          "var(--background-color)",
        color: "var(--text-color)",
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="mb-8">
          <h1
            className="text-4xl font-bold"
            style={{
              color:
                "var(--primary-color)",
            }}
          >
            YouTube Channels
          </h1>

          <p
            className="mt-2"
            style={{
              color:
                "var(--muted-color)",
            }}
          >
            Manage EduRwanda official YouTube
            channels.
          </p>
        </div>

        {/* ======================================
            FORM
        ====================================== */}

        <div
          className="rounded-2xl p-6 mb-10 shadow-lg"
          style={{
            backgroundColor:
              "var(--card-color)",
            border:
              "1px solid var(--border-color)",
          }}
        >
          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold">
              {editingChannel
                ? "Edit Channel"
                : "Create Channel"}
            </h2>

            {editingChannel && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NAME */}

            <div>
              <label className="block mb-2 font-semibold">
                Channel Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Rwanda Lyrics"
                className="w-full px-4 py-3 rounded-xl border bg-transparent"
              />
            </div>

            {/* SLUG */}

            <div>
              <label className="block mb-2 font-semibold">
                Slug
              </label>

              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                placeholder="Rwanda-Lyrics"
                className="w-full px-4 py-3 rounded-xl border bg-transparent"
              />

              <p
                className="mt-2 text-sm"
                style={{
                  color:
                    "var(--muted-color)",
                }}
              >
                Example:
                rwanda-lyrics
              </p>
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="block mb-2 font-semibold">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Channel description..."
                className="w-full px-4 py-3 rounded-xl border bg-transparent"
              />
            </div>

            {/* ICON */}

            <div>
              <label className="block mb-2 font-semibold">
                Icon
              </label>

              <input
                type="text"
                name="icon"
                value={form.icon}
                onChange={handleChange}
                placeholder="🎬"
                className="w-full px-4 py-3 rounded-xl border bg-transparent"
              />
            </div>

            {/* YOUTUBE URL */}

            <div>
              <label className="block mb-2 font-semibold">
                YouTube Channel URL
              </label>

              <input
                type="url"
                name="youtubeUrl"
                value={form.youtubeUrl}
                onChange={handleChange}
                placeholder="https://youtube.com/@channel"
                className="w-full px-4 py-3 rounded-xl border bg-transparent"
              />
            </div>

            {/* CATEGORY */}

            <div>
              <label className="block mb-2 font-semibold">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border bg-transparent"
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

            {/* PROFILE IMAGE */}

            <div>
              <label className="block mb-2 font-semibold">
                Profile Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImage}
                className="w-full"
              />

              {profileImage && (
                <div className="mt-4">
                  <p
                    className="text-sm mb-2"
                    style={{
                      color:
                        "var(--muted-color)",
                    }}
                  >
                    New profile image:
                  </p>

                  <img
                    src={URL.createObjectURL(
                      profileImage
                    )}
                    alt="New profile preview"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
              )}

              {!profileImage &&
                editingChannel?.profileImage && (
                  <div className="mt-4">
                    <p
                      className="text-sm mb-2"
                      style={{
                        color:
                          "var(--muted-color)",
                      }}
                    >
                      Current profile image:
                    </p>

                    <img
                      src={
                        editingChannel.profileImage
                      }
                      alt="Current profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                )}
            </div>

            {/* COVER IMAGE */}

            <div>
              <label className="block mb-2 font-semibold">
                Cover Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImage}
                className="w-full"
              />

              {coverImage && (
                <div className="mt-4">
                  <p
                    className="text-sm mb-2"
                    style={{
                      color:
                        "var(--muted-color)",
                    }}
                  >
                    New cover image:
                  </p>

                  <img
                    src={URL.createObjectURL(
                      coverImage
                    )}
                    alt="New cover preview"
                    className="w-full max-w-xl h-40 object-cover rounded-xl"
                  />
                </div>
              )}

              {!coverImage &&
                editingChannel?.coverImage && (
                  <div className="mt-4">
                    <p
                      className="text-sm mb-2"
                      style={{
                        color:
                          "var(--muted-color)",
                      }}
                    >
                      Current cover image:
                    </p>

                    <img
                      src={
                        editingChannel.coverImage
                      }
                      alt="Current cover"
                      className="w-full max-w-xl h-40 object-cover rounded-xl"
                    />
                  </div>
                )}
            </div>

            {/* ACTIVE */}

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
                className="w-5 h-5"
              />

              <label className="font-semibold">
                Active Channel
              </label>
            </div>

            {/* BUTTON */}

            <div className="flex gap-3">

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-xl text-white font-semibold disabled:opacity-50"
                style={{
                  backgroundColor:
                    "var(--primary-color)",
                }}
              >
                {saving
                  ? "Saving..."
                  : editingChannel
                    ? "Update Channel"
                    : "Create Channel"}
              </button>

              {editingChannel && (
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving}
                  className="px-6 py-3 rounded-xl border font-semibold"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ======================================
            CHANNEL LIST
        ====================================== */}

        <div>
          <h2 className="text-2xl font-bold mb-6">
            Existing Channels
          </h2>

          {channels.length === 0 ? (
            <div
              className="rounded-xl p-10 text-center"
              style={{
                backgroundColor:
                  "var(--card-color)",
                border:
                  "1px solid var(--border-color)",
              }}
            >
              <p className="text-xl font-semibold">
                No channels found.
              </p>

              <p
                className="mt-2"
                style={{
                  color:
                    "var(--muted-color)",
                }}
              >
                Create your first YouTube
                channel above.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {channels.map((channel) => (
                <div
                  key={channel.id}
                  className="rounded-2xl overflow-hidden shadow-lg"
                  style={{
                    backgroundColor:
                      "var(--card-color)",
                    border:
                      "1px solid var(--border-color)",
                  }}
                >

                  {/* COVER */}

                  {channel.coverImage ? (
                    <img
                      src={channel.coverImage}
                      alt={channel.name}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-40 flex items-center justify-center text-6xl"
                      style={{
                        backgroundColor:
                          "var(--sidebar-color)",
                      }}
                    >
                      {channel.icon || "🎬"}
                    </div>
                  )}

                  <div className="p-6">

                    {/* PROFILE */}

                    <div className="flex items-center gap-4">

                      {channel.profileImage ? (
                        <img
                          src={
                            channel.profileImage
                          }
                          alt={channel.name}
                          className="w-20 h-20 rounded-full object-cover border-4"
                          style={{
                            borderColor:
                              "var(--card-color)",
                          }}
                        />
                      ) : (
                        <div
                          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                          style={{
                            backgroundColor:
                              "var(--sidebar-color)",
                          }}
                        >
                          {channel.icon || "🎬"}
                        </div>
                      )}

                      <div className="min-w-0">

                        <h3 className="text-xl font-bold truncate">
                          {channel.name}
                        </h3>

                        <p
                          className="text-sm truncate"
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
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor:
                            "var(--sidebar-color)",
                          color:
                            "var(--primary-color)",
                        }}
                      >
                        {channel.category}
                      </span>
                    </div>

                    {/* DESCRIPTION */}

                    <p
                      className="mt-4 line-clamp-3"
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
                        className={`inline-block px-3 py-1 rounded-full text-sm ${
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

                    {/* YOUTUBE LINK */}

                    {channel.youtubeUrl && (
                      <a
                        href={
                          channel.youtubeUrl
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-4 text-sm font-semibold"
                        style={{
                          color:
                            "var(--primary-color)",
                        }}
                      >
                        Open YouTube Channel →
                      </a>
                    )}

                    {/* ACTIONS */}

                    <div className="flex gap-3 mt-6">

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(channel)
                        }
                        className="px-4 py-2 rounded-lg text-white"
                        style={{
                          backgroundColor:
                            "var(--primary-color)",
                        }}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            channel.id
                          )
                        }
                        className="px-4 py-2 rounded-lg bg-red-600 text-white"
                      >
                        Delete
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}