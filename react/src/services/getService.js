//const url = `${process.env.REACT_APP_API_BASE_URL}/holidays`
const urlHolidays = `http://localhost:3001/holidays`
const urlCategorie = `http://localhost:3001/categories`
const urlCountries = `http://localhost:3001/countries`

export async function getReisplannen() {
  const result = await fetch(urlHolidays).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });

  return result;
}

export async function createReisplan(reisplan) {
  const result = await fetch(urlHolidays, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reisplan)
    })
    .then(response => response.json())
    .catch(error => {
      console.log("error", error);
      return false;
    })

    return result;
}

export async function readReisplan(id) {
  const result = await fetch(`${urlHolidays}/${id}`).then((response) => {
    if (response.ok) {      
      return response.json();
    }
  });

  return result;
}

export async function updateReisplan(id, reisplan) {
  const result = await fetch(`${urlHolidays}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reisplan)
    })
    .then(response => response.json())
    .catch(error => {
      console.log("error", error);
      return false;
    })

    return result;
}

export async function deleteReisplan(id) {
  const result = await fetch(`${urlHolidays}/${id}`, { method: "DELETE" } ).then((response) => {
    if (response.ok) {      
      return true;
    } else {
      return false;
    }
  });

  return result;
}

export async function getLanden() {
  const result = await fetch(urlCountries).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });

  return result;
}

export async function getCategories() {
  const result = await fetch(urlCategorie).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });

  return result;
}

export async function getByCategory(category) {
  const result = await fetch(`${urlCategorie}/${category}`).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });

  return result;
}