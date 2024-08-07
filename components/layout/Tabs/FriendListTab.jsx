import React, { useEffect, useState } from "react";
import Icon from "../../common/Icon";
import App_url from "../../common/constant";
import DropButton from "../../common/DropButton";
import { useDispatch, useSelector } from "react-redux";
import FriendsList from "../../channels/FriendsList";

export default function FriendListTab(props) {
  const { access_token } = useSelector(App_url.allReducers);
  const [toggleFriend, setToggleFriend] = useState(false);

  return (
    <React.Fragment className="channel_list">
        <div className="channel_sidebar__static_list mt-4">
          <div className="channel_sidebar__section_heading">
            <Icon
              attrIcon={App_url.icons.DownDot}
              size={`sm`}
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
        {!toggleFriend && <FriendsList className={""} />}
    </React.Fragment>
  );
}
