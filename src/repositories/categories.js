import config from "../config";

const URL_CATEGORIES = `${config.URL_BACKEND}/categories`;

function getAll() {
  return fetch(`${URL_CATEGORIES}`).then(async (serverResponse) => {
    if (serverResponse.ok) {
      const response = await serverResponse.json();
      return response;
    }
    throw new Error("error: can't get the data, please try again");
  });
}

function getAllWithVideos() {
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

export default {
  getAllWithVideos,
  getAll,
};
