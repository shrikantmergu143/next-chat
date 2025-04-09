import React, { useState } from "react";
import Icon from "../../common/Icon";
import App_url from "../../common/constant";
import DropButton from "../../common/DropButton";
import ChannelList from "../../channels/ChannelList";

export default function FriendListTab(props) {
  const [toggleFriend, setToggleFriend] = useState(false);

  return (
    <React.Fragment >
        <div className="channel_sidebar__static_list mt-1">
          <div className="channel_sidebar__section_heading">
            <Icon
              attrIcon={App_url.icons.DownDot}
              size={`xsm`}
              button
              className={`rotate-${toggleFriend ? "-90" : ""}`}
              variant={"hover-secondary-1"}
              onClick={() => setToggleFriend(!toggleFriend)}
            />
            <DropButton
              option={props?.optionsChannel}
              title={"Direct Message"}
              onSelect={props?.onSelect}
            />
          </div>
        </div>
        {!toggleFriend && <ChannelList group_type="direct" />}
    </React.Fragment>
  );
}
