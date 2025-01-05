import React, { useEffect, useState } from "react";
import Scrollbar from "../../common/Scrollbar";
import Icon from "../../common/Icon";
import App_url from "../../common/constant";
import ToolTip from "../../common/PopOver";
import DropButton from "../../common/DropButton";
import { useDispatch, useSelector } from "react-redux";
import ChannelListTab from "./ChannelListTab";
import FriendListTab from "./FriendListTab";

export default function TabChatPanel(props) {
  const { access_token } = useSelector(App_url.allReducers);

  return (
    <div className="channel_list">
      <div className="sidebar_header ">
        <div className="sidebar_header__title">
          <DropButton classNameText={"fs-17 fw-7"} title={"Community"} />
        </div>
        <div className="sidebar_header__controls">
          <ToolTip title={"Filter Conversations"}>
            <Icon
              attrIcon={App_url.icons.FilterIcon}
              button
              size={"lg"}
              variant={"hover-secondary-1"}
            />
          </ToolTip>
          <ToolTip title={"New Message"}>
            <Icon
              attrIcon={App_url.icons.Edit}
              button
              size={"lg"}
              variant={"hover-secondary-1"}
            />
          </ToolTip>
        </div>
      </div>
      <Scrollbar style={{ height: "calc(100vh - 94px)" }}>
        <ChannelListTab {...props}/>
        <FriendListTab {...props}/>
      </Scrollbar>
    </div>
  );
}
