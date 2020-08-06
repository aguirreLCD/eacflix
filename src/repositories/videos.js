import config from "../config";

const URL_VIDEOS = `${config.URL_BACKEND}/videos`;

const create = (videoObject) => {
  return fetch(`${URL_VIDEOS}?_embed=videos`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(videoObject),
  }).then(async (serverResponse) => {
    if (serverResponse.ok) {
      const response = await serverResponse.json();
      return response;
    }
    throw new Error("Error: we cant't register the data. Please try again.");
  });
};

export default {
  create,
};
