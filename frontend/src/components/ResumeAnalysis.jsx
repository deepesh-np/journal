import React from "react";

export default function ResumeAnalysis({ data }) {
  const { parsedData, analysisReport } = data;

  return (
    <div className="mt-5">
      <h3>Analysis Result</h3>
      <div className="card mb-3">
        <div className="card-header">Basic Info</div>
        <div className="card-body">
          <p><strong>Name:</strong> {parsedData.name || "N/A"}</p>
          <p><strong>Email:</strong> {parsedData.email || "N/A"}</p>
          <p><strong>Phone:</strong> {parsedData.phone || "N/A"}</p>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-header">Skills</div>
        <div className="card-body">
          {parsedData.skills.length ? (
            <ul className="list-group">
              {parsedData.skills.map((skill, idx) => (
                <li key={idx} className="list-group-item">{skill}</li>
              ))}
            </ul>
          ) : (
            <p>No skills found</p>
          )}
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-header">Education</div>
        <div className="card-body">
          {parsedData.education.length ? (
            <ul className="list-group">
              {parsedData.education.map((edu, idx) => (
                <li key={idx} className="list-group-item">
                  {edu.degree} - {edu.institution} ({edu.year || "N/A"})
                </li>
              ))}
            </ul>
          ) : (
            <p>No education info found</p>
          )}
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-header">Experience</div>
        <div className="card-body">
          {parsedData.experience.length ? (
            parsedData.experience.map((exp, idx) => (
              <div key={idx} className="mb-2">
                <strong>{exp.role || "N/A"}</strong> at <em>{exp.company}</em> ({exp.duration || "N/A"})
                {exp.achievements?.length ? (
                  <ul>
                    {exp.achievements.map((ach, aidx) => <li key={aidx}>{ach}</li>)}
                  </ul>
                ) : null}
              </div>
            ))
          ) : (
            <p>No experience info found</p>
          )}
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-header">Projects</div>
        <div className="card-body">
          {parsedData.projects.length ? (
            <ul>
              {parsedData.projects.map((proj, idx) => <li key={idx}>{proj}</li>)}
            </ul>
          ) : (
            <p>No projects found</p>
          )}
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-header">Analysis Report</div>
        <div className="card-body">
          <p><strong>Score:</strong> {analysisReport.score}</p>
          <p><strong>ATS Compatibility:</strong> {analysisReport.atsCompatibility}%</p>
          <p><strong>Missing Skills:</strong> {analysisReport.missingSkills.join(", ") || "None"}</p>
          <p><strong>Recommendations:</strong> {analysisReport.recommendations.join(", ") || "None"}</p>
        </div>
      </div>
    </div>
  );
}
