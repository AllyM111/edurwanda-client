import examCategories from "../../../data/examCategories";
import examYears from "../../../data/examYears";
import examTypes from "../../../data/examTypes";

export default function ExamForm({
  formData,
  setFormData,
  handleFileChange,
}) {

  const subjects =
    examCategories.find(
      (item) => item.level === formData.level
    )?.subjects || [];

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "level") {

      setFormData({

        ...formData,

        level: value,

        subject: "",

      });

      return;

    }

    setFormData({

      ...formData,

      [name]: value,

    });

  };

  return (

    <div className="space-y-5">

      {/* Title */}

      <div>

        <label className="font-medium">

          Exam Title

        </label>

        <input

          name="title"

          value={formData.title}

          onChange={handleChange}

          placeholder="Exam title"

          className="w-full mt-2 p-3 rounded-xl border"

        />

      </div>

      {/* Exam Type */}

      <div>

        <label className="font-medium">

          Exam Type

        </label>

        <select

          name="type"

          value={formData.type}

          onChange={handleChange}

          className="w-full mt-2 p-3 rounded-xl border"

        >

          <option value="">

            Select Type

          </option>

          {

            examTypes.map((type) => (

              <option
                key={type}
                value={type}
              >

                {type}

              </option>

            ))

          }

        </select>

      </div>

      {/* Education Level */}

      <div>

        <label className="font-medium">

          Education Level

        </label>

        <select

          name="level"

          value={formData.level}

          onChange={handleChange}

          className="w-full mt-2 p-3 rounded-xl border"

        >

          <option value="">

            Select Level

          </option>

          {

            examCategories.map((level) => (

              <option

                key={level.level}

                value={level.level}

              >

                {level.level}

              </option>

            ))

          }

        </select>

      </div>

      {/* Subject */}

      <div>

        <label className="font-medium">

          Subject

        </label>

        <select

          name="subject"

          value={formData.subject}

          onChange={handleChange}

          disabled={!formData.level}

          className="w-full mt-2 p-3 rounded-xl border"

        >

          <option value="">

            Select Subject

          </option>

          {

            subjects.map((subject) => (

              <option

                key={subject}

                value={subject}

              >

                {subject}

              </option>

            ))

          }

        </select>

      </div>

      {/* Year */}

      <div>

        <label className="font-medium">

          Year

        </label>

        <select

          name="year"

          value={formData.year}

          onChange={handleChange}

          className="w-full mt-2 p-3 rounded-xl border"

        >

          <option value="">

            Select Year

          </option>

          {

            examYears.map((year) => (

              <option

                key={year}

                value={year}

              >

                {year}

              </option>

            ))

          }

        </select>

      </div>

      {/* Description */}

      <div>

        <label className="font-medium">

          Description

        </label>

        <textarea

          name="description"

          rows={4}

          value={formData.description}

          onChange={handleChange}

          placeholder="Description"

          className="w-full mt-2 p-3 rounded-xl border"

        />

      </div>

      {/* PDF */}

      <div>

        <label className="font-medium">

          PDF File

        </label>

        <input

          type="file"

          name="pdf"

          accept=".pdf"

          onChange={handleFileChange}

          className="mt-2"

        />

      </div>

      {/* Cover */}

      <div>

        <label className="font-medium">

          Cover Image (Optional)

        </label>

        <input

          type="file"

          name="cover"

          accept="image/*"

          onChange={handleFileChange}

          className="mt-2"

        />

      </div>

    </div>

  );

}