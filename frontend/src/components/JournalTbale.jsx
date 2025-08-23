import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { PlusCircle } from "react-bootstrap-icons"; // bootstrap icon

export default function JournalTable({ journals }) {
  const navigate = useNavigate();

  const getWordCount = (text) => {
    if (!text || typeof text !== "string") return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <div className="container-fluid py-5 bg-light min-vh-100 d-flex flex-column align-items-center position-relative">
      <h1 className="text-center fw-bold mb-5">📖 My Journals</h1>
      <div className="col-lg-10 col-md-12">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle text-center mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Mood</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Tags</th>
                    <th>Word Count</th>
                  </tr>
                </thead>
                <tbody>
                  {journals && journals.length > 0 ? (
                    journals.map((journal, index) => (
                      <tr
                        key={journal._id || index}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/journal/${journal._id}`)}
                      >
                        <td>{index + 1}</td>
                        <td>
                          {new Date(journal.date).toLocaleDateString("en-GB")}
                        </td>
                        <td>
                          <span className="badge bg-primary px-3 py-2 rounded-pill">
                            {journal.mood || "N/A"}
                          </span>
                        </td>
                        <td className="fw-semibold">{journal.title}</td>
                        <td
                          className="text-truncate"
                          style={{ maxWidth: "250px" }}
                        >
                          {journal.content}
                        </td>
                        <td>
                          {journal.tags && journal.tags.length > 0 ? (
                            journal.tags.map((tag, i) => (
                              <span key={i} className="badge bg-secondary me-1">
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted">—</span>
                          )}
                        </td>
                        <td>{getWordCount(journal.entry)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-5">
                        No journals found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        className="btn btn-success rounded-circle shadow-lg d-flex align-items-center justify-content-center position-fixed"
        style={{
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          fontSize: "1.8rem",
        }}
        onClick={() => navigate("/add-journal")}
      >
        <PlusCircle size={28} />
      </button>
    </div>
  );
}
