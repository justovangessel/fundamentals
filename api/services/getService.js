const fetch = require("node-fetch");
const baseUrl = "http://localhost:3001";

async function getByCategory(category) {
  const url = `${baseUrl}/jobs?category=${category}`;
  console.log(url);
  const result = await fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
  return result;
}

async function getById(id) {
  const response = await fetch(`${baseUrl}/jobs/${id}`)
  if (response.ok) return response.json();
  throw response;
}

module.exports = {
  getByCategory: getByCategory,
  getById: getById,
}