export default function GeneralSettings() {
  return (
    <div className="bg-[var(--card-color)]">

      <h2 className="text-xl font-semibold mb-6">
        General Settings
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2">
            Website Name
          </label>

          <input
            className="w-full bg-gray-800 rounded-lg p-3"
            placeholder="EduRwanda"
          />
        </div>

        <div>
          <label className="block mb-2">
            Contact Email
          </label>

          <input
            className="w-full bg-gray-800 rounded-lg p-3"
            placeholder="allymutabazi@edurwanda.rw"
          />
        </div>

        <div className="md:col-span-2">

          <label className="block mb-2">
            Website Description
          </label>

          <textarea
            rows={4}
            className="w-full bg-gray-800 rounded-lg p-3"
            placeholder="Website description..."
          />

        </div>

      </div>

    </div>
  );
}