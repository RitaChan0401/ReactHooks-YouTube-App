import React, { useContext, useEffect } from "react";
// URLからクエリーパラメータ取得するのに必要
import { useLocation } from "react-router-dom";
import { fetchRelatedData, fetchSelectedData } from "../apis/index";
import Layout from "../components/Layout/Layout";
import SideList from "../components/SideList/SideList";
import VideoDetail from "../components/VideoDetail/VideoDetail";
import { Store } from "../store/index";

const Watch = () => {
  const { setGlobalState } = useContext(Store);
  const location = useLocation();
  const setVideos = async () => {
    // URLSearchParams は URL のクエリー文字列の操作に役立つメソッドを定義 → Stringからデータを取得しやすいようにオブジェクトに変更してくれる
    // location.search にはURLの ? 以降がstringとして格納されている
    // location.searchには「?v=○○○○○○○○」が入る
    const searchParams = new URLSearchParams(location.search);
    // idには上の「○○○○○○○○」が入る
    const id = searchParams.get("v");
    if (id) {
      // Promise関数が格納された配列を渡すことで、格納された関数の全ての処理が完了するまで、次の処理を待たせることができる。
      const [selected, related] = await Promise.all([
        fetchSelectedData(id),
        fetchRelatedData(id),
      ]);
      setGlobalState({
        type: "SET_SELECTED",
        // responseからitemのみを抽出
        payload: { selected: selected.data.items.shift() },
      });
      setGlobalState({
        type: "SET_RELATED",
        payload: { related: related.data.items },
      });
      // console.log('確認１',selected.data.items.shift());
      // console.log("確認２", related.data.items);
    }
  };
  useEffect(() => {
    // useEffect内では asyncが使えないため別関数として置いてあげる
    setVideos();
  }, [location.search]);
  return (
    <Layout>
      <VideoDetail />
      <SideList />
    </Layout>
  );
};

export default Watch;
