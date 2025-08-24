const SKILLS = ["Node.js", "MongoDB", "React", "Express", "Java", "Python"];

function extractEmail(text) {
  const match = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
  return match ? match[0] : "";
}

function extractPhone(text) {
  const match = text.match(/\b\d{10,15}\b/);
  return match ? match[0] : "";
}

function extractSkills(text) {
  return SKILLS.filter(skill => text.includes(skill));
}

module.exports = { extractEmail, extractPhone, extractSkills, SKILLS };
