/** @format */
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3002/profile", {
          withCredentials: true, // send cookie if JWT is cookie-based
        });
        setProfile(res.data);
      } catch (err) {
        console.log(err);
        
        setError(err.response?.data?.error || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!profile) return <p>No profile found</p>;

  const { name, email, role, profile: p } = profile;

  return (
    <div className="container mt-5">
      <h2>My Profile</h2>
      <div className="card mt-3 p-3">
        <h4>{name}</h4>
        <p><b>Email:</b> {email}</p>
        <p><b>Role:</b> {role}</p>
        <p><b>Headline:</b> {p.headline || "N/A"}</p>
        <p><b>Current Position:</b> {p.currentPosition || "N/A"}</p>

        <p><b>Skills:</b> {p.skills?.length ? p.skills.join(", ") : "N/A"}</p>
        <p><b>Goals:</b> {p.goals?.length ? p.goals.join(", ") : "N/A"}</p>

        {p.resume ? (
          <p>
            <b>Resume:</b>{" "}
            <a href={p.resume} target="_blank" rel="noreferrer">
              View Resume
            </a>
          </p>
        ) : (
          <p><b>Resume:</b> Not uploaded</p>
        )}
      </div>
    </div>
  );
}
