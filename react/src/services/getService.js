const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getByCategory(category) {
  const result = await fetch(`${baseUrl}/jobs/${category}`).then((response) => {
    console.log(response);
    if (response.ok) {
      return response.json(); //then consume it again, the error happens
    }
  });

  return result;
}

export async function getById(id) {
  const response = await fetch(`${baseUrl}/jobs/${id}`);
  if (response.ok) return response.json();
  throw response;
}