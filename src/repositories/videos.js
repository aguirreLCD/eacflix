import config from "../config";

const URL_VIDEOS = `${config.URL_BACKEND}/videos`;

function getAllVideos() {
  return fetch(`${URL_VIDEOS}`).then(async (serverResponse) => {
    if (serverResponse.ok) {
      const response = await serverResponse.json();
      return response;
    }
    throw new Error("error: can't get the data, please try again");
  });
}

function getAllVideosWithCategories() {
  return fetch(`${URL_VIDEOS}?_embed=videos`).then(async (serverResponse) => {
    if (serverResponse.ok) {
      const response = await serverResponse.json();
      return response;
    }
    throw new Error("error: can't get the data, please try again");
  });
}

const createVideoObject = (videoObject) => {
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

function removeVideo(id) {
  return fetch(`${URL_VIDEOS}/${id}`, {
    method: "DELETE",
  }).then((serverResponse) => {
    if (!serverResponse.ok) {
      throw new Error("we can't delete the data...please try again.");
    }
  });
}

export default {
  getAllVideos,
  getAllVideosWithCategories,
  createVideoObject,
  removeVideo,
};

// const URL_VIDEOS = `${config.URL_BACKEND}/videos`;
// ? "http://localhost:8080/videos"
// : "https://eacflix.herokuapp.com/videos";

// http://localhost:8080/videos/1
