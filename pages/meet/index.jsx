import React, { useEffect } from "react";
import Utils from "../../components/utils";
import Layout from "../../components/layout/Layout";
import App_url from "../../components/common/constant";
import RoomPage from "../../components/meet/RoomMeet";

export default function ChannelId(props) {
    if(typeof window === "undefined"){
        return <React.Fragment></React.Fragment>
    }
  return (
    <div {...props}>
        <RoomPage/>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req, params } = context;
  const title = "Welcome to Dashboard";
  const description = "Home Page description";
  return {
    props: {
      title: title,
      description: description,
      env: JSON.stringify(Utils.getCommonEnv(process?.env)),
      localhost_url: Utils.getCurrentURL(context),
      // channelData: response, // Pass the fetched channel data to props
    },
  };
}
