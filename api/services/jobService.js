const fetch = require("node-fetch");
const baseUrl = "http://localhost:3001/";

async function getJobsByCategory(category) {
  const url = baseUrl + "products?category=" + category;
  const result = await fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
  return result;
}

async function getJobById(id) {
  const response = await fetch(baseUrl + "products/" + id);
  if (response.ok) return response.json();
  throw response;
}

module.exports = {
  getJobsByCategory: getJobsByCategory,
}