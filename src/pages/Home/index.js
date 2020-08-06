import React, { useEffect, useState } from "react";
// import initialData from "../../data/initial_data.json";
import BannerMain from "../../components/BannerMain";
import Carousel from "../../components/Carousel";
import PageDefault from "../../components/PageDefault";
import categoriesRepository from "../../repositories/categories";

function Home() {
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    categoriesRepository
      .getAllWithVideos()
      .then((categoriesWithVideos) => {
        console.log(categoriesWithVideos[0].videos[0]);
        setInitialData(categoriesWithVideos);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <PageDefault paddingAll={0}>
      {initialData.length === 0 && <div>Loading...</div>}

      {initialData.map((category, index) => {
        if (index === 0) {
          return (
            <div key={category.id}>
              <BannerMain
                videoTitle={initialData[0].videos[0].title}
                url={initialData[0].videos[0].url}
                videoDescription={initialData[0].videos[0].description}
              />
              <Carousel ignoreFirstVideo category={initialData[0]} />
            </div>
          );
        }

        return <Carousel key={category.id} category={category} />;
      })}
    </PageDefault>
  );
}

export default Home;
