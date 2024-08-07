import React, { useEffect, useState } from "react";
import Scrollbar from "../../common/Scrollbar";
import Icon from "../../common/Icon";
import App_url from "../../common/constant";
import ToolTip from "../../common/PopOver";
import DropButton from "../../common/DropButton";
import { useDispatch, useSelector } from "react-redux";
import action from "../../../store/action";
import ChannelList from "../../channels/ChannelList";
import { setShowModal } from "../../../store/Actions";
import FriendsList from "../../channels/FriendsList";
import ChannelListTab from "./ChannelListTab";
import FriendListTab from "./FriendListTab";

export default function TabChatPanel(props) {
  const { access_token } = useSelector(App_url.allReducers);
  const [toggleChannel, setToggleChannel] = useState(false);
  const [toggleFriend, setToggleFriend] = useState(false);
  const dispatch = useDispatch();
  const options = [
    {
      title: "Create Channels",
      key: "create_channels",
    },
    {
      title: "Manage",
      key: "manage_channels",
    },
  ];

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
