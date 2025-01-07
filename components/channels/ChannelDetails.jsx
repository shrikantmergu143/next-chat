import React, { useEffect, useMemo, useRef, useState } from "react";
import DropButton from "../common/DropButton";
import Icon from "../common/Icon";
import App_url from "../common/constant";
import ToolTip from "../common/PopOver";
import Scrollbar from "../common/Scrollbar";
import TextEditor from "./TextEditor";
import {EditorText} from "./../common/text-editor/EditorText";

export default function ChannelDetails(props) {
  const getLinkAvatar = useMemo(()=>{
    if(props?.chatGroupDetails?.group_type === "direct"){
      return props?.chatGroupDetails?.profile_url ? {url:props?.chatGroupDetails?.profile_url, image:true} : {url: App_url.icons.default_image, image:true}
    }else{
      return props?.chatGroupDetails?.mode == "public"
      ? {url:App_url.icons.Hash}
      : {url:App_url.icons.Lock}
    }
  })

  useEffect(()=>{

  },[])
  return (
    <React.Fragment>
      <div className="p-view_header">
        <DropButton
          title={
              <div className="d-flex-center">
                <Icon
                  attrIcon={getLinkAvatar?.url}
                  image={getLinkAvatar?.image}
                />
                <span>{props?.chatGroupDetails?.channel_name || props?.chatGroupDetails?.name}</span>
              </div>
          }
          show_down={false}
        />
      </div>
      <div className="p-view-body">
        <Scrollbar style={{ height: `calc(100vh - 213px)` }}></Scrollbar>
      </div>
      {/* <TextEditor /> */}
      <EditorText/>
    </React.Fragment>
  );
}
