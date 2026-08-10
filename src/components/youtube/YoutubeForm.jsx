
import { useEffect, useState } from "react";

import {
  createYoutubeVideo,
  updateYoutubeVideo
} from "../../services/youtubeService";

import {
  getYoutubeChannels
} from "../../services/youtubeChannelService";

export default function YoutubeForm({
  video,
  onClose,
  onSuccess
}) {
  const [channels, setChannels] = useState([]);
  const [channelsLoading, setChannelsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    channel: "",
    youtubeUrl: "",
    embedUrl: "",
    thumbnail: "",
    category: "EDUCATION",
    featured: false
  });

  useEffect(() => {
    loadChannels();
  }, []);

  useEffect(() => {
    if (video) {
      setForm({
        title: video.title || "",
        description: video.description || "",
        channel: video.channel || "",
        youtubeUrl: video.youtubeUrl || "",
        embedUrl: video.embedUrl || "",
        thumbnail: video.thumbnail || "",
        category: video.category || "EDUCATION",
        featured: video.featured || false
      });

      return;
    }

    setForm({
      title: "",
      description: "",
      channel: "",
      youtubeUrl: "",
      embedUrl: "",
      thumbnail: "",
      category: "EDUCATION",
      featured: false
    });
  }, [video]);

  async function loadChannels() {
    try {
      setChannelsLoading(true);

      const data = await getYoutubeChannels();

      setChannels(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("LOAD CHANNELS ERROR:", error);
      setChannels([]);
    } finally {
      setChannelsLoading(false);
    }
  }

  function extractVideoId(url) {
    if (!url) {
      return "";
    }

    const regex =
      /(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtube\.com\/embed\/|youtu\.be\/)([^&?/]+)/;

    const match = url.match(regex);

    return match ? match[1] : "";
  }

  function handleYoutubeChange(event) {
    const youtubeUrl = event.target.value;
    const videoId = extractVideoId(youtubeUrl);

    setForm((prev) => ({
      ...prev,
      youtubeUrl,
      embedUrl: videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : "",
      thumbnail: videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : ""
    }));
  }

  function handleChange(event) {
    const {
      name,
      value,
      type,
      checked
    } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.channel) {
      alert("Please select a YouTube channel.");
      return;
    }

    try {
      setSaving(true);

      if (video) {
        await updateYoutubeVideo(video.id, form);
      } else {
        await createYoutubeVideo(form);
      }

      onSuccess();
    } catch (error) {
      console.error("SAVE YOUTUBE VIDEO ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to save video."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-6"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.65)"
      }}
    >
      <div
        className="my-8 w-full max-w-3xl rounded-2xl p-8"
        style={{
          backgroundColor: "var(--card-color)",
          border: "1px solid var(--border-color)",
          color: "var(--text-color)"
        }}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2
            className="text-3xl font-bold"
            style={{
              color: "var(--primary-color)"
            }}
          >
            {video ? "Edit Video" : "Add YouTube Video"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg px-3 py-2 text-xl disabled:opacity-50"
            style={{
              color: "var(--muted-color)"
            }}
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block font-semibold">
              Video Title
            </label>

            <input
              name="title"
              type="text"
              placeholder="Video Title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border bg-transparent p-3"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-color)"
              }}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-xl border bg-transparent p-3"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-color)"
              }}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              YouTube Channel
            </label>

            <select
              name="channel"
              value={form.channel}
              onChange={handleChange}
              disabled={channelsLoading}
              required
              className="w-full rounded-xl border bg-transparent p-3"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-color)"
              }}
            >
              <option value="">
                {channelsLoading
                  ? "Loading channels..."
                  : "Select a channel"}
              </option>

              {channels.map((channel) => (
                <option
                  key={channel.id}
                  value={channel.slug}
                >
                  {channel.name}
                </option>
              ))}
            </select>

            {!channelsLoading &&
              channels.length === 0 && (
                <p
                  className="mt-2 text-sm"
                  style={{
                    color: "var(--muted-color)"
                  }}
                >
                  No YouTube channels available.
                  Create a channel first.
                </p>
              )}
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              YouTube URL
            </label>

            <input
              type="url"
              placeholder="https://youtu.be/..."
              value={form.youtubeUrl}
              onChange={handleYoutubeChange}
              required
              className="w-full rounded-xl border bg-transparent p-3"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-color)"
              }}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Embed URL
            </label>

            <input
              value={form.embedUrl}
              readOnly
              className="w-full rounded-xl border bg-gray-100 p-3 text-gray-700"
              style={{
                borderColor: "var(--border-color)"
              }}
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Thumbnail
            </label>

            <input
              value={form.thumbnail}
              readOnly
              className="w-full rounded-xl border bg-gray-100 p-3 text-gray-700"
              style={{
                borderColor: "var(--border-color)"
              }}
            />
          </div>

          {form.thumbnail && (
            <div>
              <img
                src={form.thumbnail}
                alt="YouTube thumbnail"
                className="w-72 rounded-xl border"
                style={{
                  borderColor: "var(--border-color)"
                }}
              />
            </div>
          )}

          <div>
            <label className="mb-2 block font-semibold">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border bg-transparent p-3"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-color)"
              }}
            >
              <option value="EDUCATION">
                Education
              </option>

              <option value="MUSIC">
                Music
              </option>

              <option value="CYBERSECURITY">
                Cybersecurity
              </option>

              <option value="PROGRAMMING">
                Programming
              </option>

              <option value="TECHNOLOGY">
                Technology
              </option>
            </select>
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="h-5 w-5"
            />

            <span className="font-semibold">
              Featured Video
            </span>
          </label>

          <div className="flex justify-end gap-4 border-t pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border px-6 py-3 font-semibold disabled:opacity-50"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-color)"
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                saving ||
                channelsLoading ||
                channels.length === 0
              }
              className="rounded-xl px-8 py-3 font-semibold text-white disabled:opacity-50"
              style={{
                backgroundColor: "var(--primary-color)"
              }}
            >
              {saving
                ? "Saving..."
                : video
                  ? "Update Video"
                  : "Create Video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}