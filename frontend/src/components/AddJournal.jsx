/** @format */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddJournal() {
  const navigate = useNavigate();

  const [journal, setJournal] = useState({
    title: "",
    entry: "",
    tags: "",
    mood: "neutral",
    skillsDeveloped: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJournal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3002/journals",
        {
          title: journal.title,
          entry: journal.entry,
          tags: journal.tags.split(",").map((t) => t.trim()), // convert CSV to array
          mood: journal.mood,
          skillsDeveloped: journal.skillsDeveloped
            .split(",")
            .map((s) => s.trim()),
          date: journal.date,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Journal added:", res.data);
      navigate("/"); // redirect to journal list after adding
    } catch (err) {
      console.error("Error adding journal:", err.response?.data || err.message);
      alert("Failed to add journal. Check console for details.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">➕ Add New Journal</h2>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={journal.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Entry</label>
                <textarea
                  className="form-control"
                  name="entry"
                  value={journal.entry}
                  onChange={handleChange}
                  rows={5}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Tags (comma-separated)</label>
                <input
                  type="text"
                  className="form-control"
                  name="tags"
                  value={journal.tags}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Mood</label>
                <select
                  className="form-select"
                  name="mood"
                  value={journal.mood}
                  onChange={handleChange}
                  required
                >
                  <option value="happy">Happy</option>
                  <option value="stressed">Stressed</option>
                  <option value="motivated">Motivated</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  Skills Developed (comma-separated)
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="skillsDeveloped"
                  value={journal.skillsDeveloped}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={journal.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Add Journal
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
