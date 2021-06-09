const fetch = require("node-fetch");
const baseUrl = process.env.DATABASE_URL;
const holidaysUrl = `${baseUrl}/holidays`;

async function fetchResults(url, message = "") {
  const result = await fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
  }).then((response) => {
    if(!response) {
      return message;
    }
    return response
  });
  return result;
}

const getAll = async () => await fetchResults(holidaysUrl, `Oops... no results found.`);
const getById = async (id) => await fetchResults(`${holidaysUrl}/${id}`, `Oops... result with id: ${id} is not found`);
const getByCategory = async (category) => await fetchResults(`${holidaysUrl}?category=${category}`, `Oops... no results found with category id: ${id}`);

module.exports = {
  getAll: getAll,
  getById: getById,
  getByCategory: getByCategory,
}