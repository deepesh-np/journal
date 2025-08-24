// hfClient.js
const axios = require("axios");
const { extractEmail, extractPhone, extractSkills } = require("./utils");

const HF_API_TOKEN = process.env.HF_API_TOKEN;
const HF_MODEL = "dbmdz/bert-large-cased-finetuned-conll03-english";

async function analyzeResume(text) {
  // 1️⃣ Call Hugging Face NER model
  let nerEntities = [];
  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      { inputs: text },
      { headers: { Authorization: `Bearer ${HF_API_TOKEN}` } }
    );
    nerEntities = response.data;
  } catch (err) {
    console.error("HF NER API error:", err.message);
  }

  // 2️⃣ Extract name using NER or fallback regex
  const extractName = (text, entities) => {
    const person = entities.find((e) => e.entity_group === "PER");
    if (person) return person.word;
    const match = text.match(/([A-Z][a-z]+ [A-Z][a-z]+)/);
    return match ? match[0] : "";
  };

  // 3️⃣ Build parsedData object
  const parsedData = {
    name: extractName(text, nerEntities),
    email: extractEmail(text),
    phone: extractPhone(text),
    skills: extractSkills(text),
    education: [],     // TODO: regex or heuristics
    experience: [],    // TODO: regex or heuristics
    projects: [],      // TODO: regex or heuristics
    analysisReport: {
      score: 0,
      missingSkills: [],
      atsCompatibility: 0,
      recommendations: [],
    },
  };

  return parsedData;
}

module.exports = { analyzeResume };
