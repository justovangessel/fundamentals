const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getJobsByCategory(category) {
  const result = await fetch("http://localhost:4000/category/shoes").then((response) => {
    console.log(response);
    if (response.ok) {
      return response.json(); //then consume it again, the error happens
    }
  });

  return result;
}

export async function getJobById(id) {
  const response = await fetch(baseUrl + "products/" + id);
  if (response.ok) return response.json();
  throw response;
}