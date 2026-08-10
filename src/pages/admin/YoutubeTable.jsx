import {
  FaEdit,
  FaTrash,
  FaStar,
} from "react-icons/fa";

export default function YoutubeTable({
  videos,
  onEdit,
  onDelete,
}) {
  if (!videos.length) {
    return (
      <div
        className="rounded-2xl p-12 text-center"
        style={{
          background: "var(--card-color)",
          border: "1px solid var(--border-color)",
        }}
      >
        <h2 className="text-2xl font-bold">
          No YouTube videos yet
        </h2>

        <p
          className="mt-4"
          style={{
            color: "var(--muted-color)",
          }}
        >
          Click <strong>Add Video</strong> to upload your first YouTube link.
        </p>
      </div>
    );
  }

  return (
    <div
      className="overflow-x-auto rounded-2xl"
      style={{
        background: "var(--card-color)",
        border: "1px solid var(--border-color)",
      }}
    >
      <table className="w-full">

        <thead>

          <tr
            style={{
              background: "var(--sidebar-color)",
            }}
          >
            <th className="p-4 text-left">
              Thumbnail
            </th>

            <th className="p-4 text-left">
              Title
            </th>

            <th className="p-4 text-left">
              Channel
            </th>

            <th className="p-4 text-left">
              Category
            </th>

            <th className="p-4 text-center">
              Featured
            </th>

            <th className="p-4 text-center">
              Views
            </th>

            <th className="p-4 text-center">
              Actions
            </th>
          </tr>

        </thead>

        <tbody>

          {videos.map((video) => (
            <tr
              key={video.id}
              className="border-t"
              style={{
                borderColor: "var(--border-color)",
              }}
            >
              <td className="p-4">
                <img
                  src={
                    video.thumbnail ||
                    "https://via.placeholder.com/160x90?text=Video"
                  }
                  alt={video.title}
                  className="w-40 h-24 rounded-lg object-cover"
                />
              </td>

              <td className="p-4">

                <div className="font-semibold">
                  {video.title}
                </div>

                <div
                  className="text-sm mt-2"
                  style={{
                    color: "var(--muted-color)",
                  }}
                >
                  {video.description}
                </div>

              </td>

              <td className="p-4">
                {video.channel}
              </td>

              <td className="p-4">
                {video.category}
              </td>

              <td className="p-4 text-center">
                {video.featured ? (
                  <FaStar
                    className="inline text-yellow-500"
                  />
                ) : (
                  "-"
                )}
              </td>

              <td className="p-4 text-center">
                {video.views}
              </td>

              <td className="p-4">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(video)}
                    className="px-4 py-2 rounded-lg text-white"
                    style={{
                      background: "#2563eb",
                    }}
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => onDelete(video)}
                    className="px-4 py-2 rounded-lg text-white"
                    style={{
                      background: "#dc2626",
                    }}
                  >
                    <FaTrash />
                  </button>

                </div>

              </td>

            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}