/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function JournalDetail() {
  const { id } = useParams();
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3002/journals/${id}`, {
        withCredentials: true, // cookie auth
      })
      .then((res) => {
        setJournal(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleEdit = () => {
    navigate(`/journal/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/journals/${id}`, {
        withCredentials: true,
      });
      alert("✅ Journal deleted successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete journal");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!journal) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">⚠️ Journal not found</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <h1 className="fw-bold mb-3">{journal.title}</h1>
        <p className="text-muted mb-4">
          <small>Created at: {new Date(journal.createdAt).toLocaleString()}</small>
        </p>
        <p className="fs-5">{journal.content}</p>

        <div className="mt-4 d-flex gap-3">
          <button
            className="btn btn-warning px-4 fw-bold"
            onClick={handleEdit}
          >
            ✏️ Edit
          </button>
          <button
            className="btn btn-danger px-4 fw-bold"
            onClick={handleDelete}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}
