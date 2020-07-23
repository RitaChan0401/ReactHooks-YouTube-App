import React, { useContext, useEffect } from "react";
import { fetchPopularData } from "../apis/index";
import Layout from "../components/Layout/Layout";
import VideoGrid from "../components/VideoGrid/VideoGrid";
import VideoGridItem from "../components/VideoGridItem/VideoGridItem";
import { Store } from "../store/index";

const Top = () => {
  const { globalState, setGlobalState } = useContext(Store);

  // 引数をからにすることによって、componentDidMountと同じ役割をはたす。
  useEffect(() => {
    // componentがレンダリングされたタイミングでfetchPopularDataを実行し、youtubeAPIからデータを取得
    fetchPopularData().then((res) => {
      console.log("data", res);
      // 取得したデータを setGlobalState関数 を使ってstoreにデータを保存
      setGlobalState({
        type: "SET_POPULAR",
        // popularには取得したリストのみを取得したいのでres.data.itemsを代入
        payload: { popular: res.data.items },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <VideoGrid>
        {globalState.popular.map((popular) => {
          return (
            <VideoGridItem
              id={popular.id}
              key={popular.id}
              src={popular.snippet.thumbnails.standard.url}
              title={popular.snippet.title}
            />
          );
        })}
      </VideoGrid>
    </Layout>
  );
};

export default Top;
