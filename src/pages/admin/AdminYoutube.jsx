import { useEffect, useState } from "react";

import {
  FaYoutube,
  FaPlus,
} from "react-icons/fa";

import {
  getYoutubeVideos,
  deleteYoutubeVideo,
} from "../../services/youtubeService";

import YoutubeTable from "../../components/dashboard/youtube/YoutubeTable";
import YoutubeForm from "../../components/dashboard/youtube/YoutubeForm";
import DeleteYoutubeModal from "../../components/dashboard/youtube/DeleteYoutubeModal";

export default function AdminYoutube() {
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [editingVideo, setEditingVideo] = useState(null);

  const [deleteVideo, setDeleteVideo] = useState(null);

  useEffect(() => {
    loadVideos();
  }, []);

  async function loadVideos() {
    try {
      setLoading(true);

      const data = await getYoutubeVideos();

      setVideos(data);
    } catch (error) {
      console.error("Failed to load videos", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      await deleteYoutubeVideo(deleteVideo.id);

      setDeleteVideo(null);

      loadVideos();
    } catch (error) {
      console.error(error);
      alert("Failed to delete video.");
    }
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div>

          <h1
            className="text-4xl font-bold flex items-center gap-3"
            style={{
              color: "var(--primary-color)",
            }}
          >
            <FaYoutube />

            YouTube Manager
          </h1>

          <p
            className="mt-2"
            style={{
              color: "var(--muted-color)",
            }}
          >
            Manage videos displayed on the EduRwanda Media Hub.
          </p>

        </div>

        <button
          onClick={() => {
            setEditingVideo(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold"
          style={{
            background: "var(--primary-color)",
          }}
        >
          <FaPlus />

          Add Video
        </button>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-4 gap-6">

        <div
          className="rounded-2xl p-6"
          style={{
            background: "var(--card-color)",
            border: "1px solid var(--border-color)",
          }}
        >
          <h3 className="text-lg font-semibold">
            Total Videos
          </h3>

          <p className="text-4xl mt-4 font-bold">
            {videos.length}
          </p>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{
            background: "var(--card-color)",
            border: "1px solid var(--border-color)",
          }}
        >
          <h3 className="text-lg font-semibold">
            Rwanda Lyrics
          </h3>

          <p className="text-4xl mt-4 font-bold">
            {
              videos.filter(
                (v) => v.channel === "rwanda-lyrics"
              ).length
            }
          </p>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{
            background: "var(--card-color)",
            border: "1px solid var(--border-color)",
          }}
        >
          <h3 className="text-lg font-semibold">
            Ally Cyber Rwanda
          </h3>

          <p className="text-4xl mt-4 font-bold">
            {
              videos.filter(
                (v) => v.channel === "ally-cyber-rwanda"
              ).length
            }
          </p>
        </div>

        <div
          className="rounded-2xl p-6"
          style={{
            background: "var(--card-color)",
            border: "1px solid var(--border-color)",
          }}
        >
          <h3 className="text-lg font-semibold">
            Featured
          </h3>

          <p className="text-4xl mt-4 font-bold">
            {
              videos.filter(
                (v) => v.featured
              ).length
            }
          </p>
        </div>

      </div>

      {/* Table */}

      {loading ? (
        <div className="text-center py-20">
          Loading videos...
        </div>
      ) : (
        <YoutubeTable
          videos={videos}
          onEdit={(video) => {
            setEditingVideo(video);
            setShowForm(true);
          }}
          onDelete={(video) => {
            setDeleteVideo(video);
          }}
        />
      )}

      {/* Add / Edit */}

      {showForm && (
        <YoutubeForm
          video={editingVideo}
          onClose={() => {
            setShowForm(false);
          }}
          onSuccess={() => {
            setShowForm(false);
            loadVideos();
          }}
        />
      )}

      {/* Delete */}

      {deleteVideo && (
        <DeleteYoutubeModal
          video={deleteVideo}
          onClose={() => setDeleteVideo(null)}
          onConfirm={handleDelete}
        />
      )}

    </div>
  );
}