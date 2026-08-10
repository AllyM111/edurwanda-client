import { useState, useEffect } from "react";

export default function EditUserModal({
  user,
  onClose,
  onSave
}) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {

    if (user) {

      setForm({
        name: user.name || "",
        email: user.email || "",
        password: ""
      });

    }

  }, [user]);



  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };



  const handleSubmit = (e) => {

    e.preventDefault();

    onSave({
      ...user,
      ...form
    });

  };



  if (!user) return null;



  return (

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-gray-900 rounded-2xl w-full max-w-lg p-8 shadow-2xl">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-white">
            Edit User
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>

        </div>



        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}

          <div>

            <label className="block mb-2 text-gray-300">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>



          {/* Email */}

          <div>

            <label className="block mb-2 text-gray-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>



          {/* Password */}

          <div>

            <label className="block mb-2 text-gray-300">
              New Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
              className="w-full bg-gray-800 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>



          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}