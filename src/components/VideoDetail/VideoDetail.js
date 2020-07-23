import React, { useContext } from "react";
import Linkify from "react-linkify";
import { Store } from "../../store";
import VideoPlay from "../VideoPlay/VideoPlay";
import Style from "./VideoDetail.module.scss";

const VideoDetail = () => {
  const { globalState } = useContext(Store);

  return globalState.selected && globalState.selected.id ? (
    <div className={Style.wrap}>
      <VideoPlay id={globalState.selected.id} />
      <p>{globalState.selected.snippet.title}</p>
      <hr />
      <Linkify>
        <pre>{globalState.selected.snippet.description}</pre>
      </Linkify>
    </div>
  ) : (
    <span>no data</span>
  );
};

export default VideoDetail;
