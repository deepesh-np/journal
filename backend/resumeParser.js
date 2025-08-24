/** @format */

const axios = require('axios');
const pdfParse = require('pdf-parse');
const { read } = require('docx');

async function detectFileTypeFromHeaders(url) {
  const res = await axios.head(url);
  const ct = res.headers['content-type'];
  if (ct.includes('pdf')) return 'pdf';
  if (ct.includes('word') || ct.includes('officedocument')) return 'docx';
  return 'unknown';
}

async function getResumeTextFromURL(url) {
  let type = url.endsWith('.pdf')
    ? 'pdf'
    : url.endsWith('.docx')
    ? 'docx'
    : await detectFileTypeFromHeaders(url);

  if (type === 'pdf') return parsePDF(url);
  if (type === 'docx') return parseDOCX(url);
  throw new Error('Unsupported file type');
}

async function parsePDF(url) {
  const res = await axios.get(url, { responseType: 'arraybuffer' });
  const data = await pdfParse(res.data);
  return data.text;
}

async function parseDOCX(url) {
  const res = await axios.get(url, { responseType: 'arraybuffer' });
  const doc = await read(res.data);
  let text = '';
  doc.sections.forEach((section) => {
    section.children.forEach((paragraph) => {
      paragraph.children.forEach((run) => {
        text += run.text + ' ';
      });
    });
  });
  return text;
}

module.exports = { getResumeTextFromURL };
