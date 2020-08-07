import config from "../config";

const URL_CATEGORIES = `${config.URL_BACKEND}/categories`;

function getAllCategories() {
  return fetch(`${URL_CATEGORIES}`).then(async (serverResponse) => {
    if (serverResponse.ok) {
      const response = await serverResponse.json();
      return response;
    }
    throw new Error("error: can't get the data, please try again");
  });
}

function getAllCategoriesWithVideos() {
  return fetch(`${URL_CATEGORIES}?_embed=videos`).then(
    async (serverResponse) => {
      if (serverResponse.ok) {
        const response = await serverResponse.json();
        return response;
      }
      throw new Error("error: can't get the data, please try again");
    }
  );
}

function createCategoryObject(categoryObject) {
  return fetch(`${URL_CATEGORIES}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(categoryObject),
  }).then(async (serverResponse) => {
    if (serverResponse.ok) {
      const response = await serverResponse.json();
      return response;
    }
    throw new Error("we can't add the data...please try again.");
  });
}

function removeCategory(id) {
  return fetch(`${URL_CATEGORIES}/${id}?_embed=videos`, {
    method: "DELETE",
  }).then((serverResponse) => {
    if (!serverResponse.ok) {
      throw new Error("we can't delete the data...please try again.");
    }
  });
}

export default {
  getAllCategoriesWithVideos,
  getAllCategories,
  createCategoryObject,
  removeCategory,
};
