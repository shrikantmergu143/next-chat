import React from "react";
import TabChatPanel from "./TabChatPanel";
import { useSelector } from "react-redux";
import App_url from "../../common/constant";

export default function TabContent(props) {
  const {activeTab} = useSelector(App_url.allReducers)
  const callRenderTab = () =>{
    if(activeTab === "Home"){
      return (
        <TabChatPanel {...props} />
      )
    }else{
      return <React.Fragment/>
    }
  }
  return (
    <div className="view_contents--sidebar">
      {callRenderTab()}
    </div>
  );
}
