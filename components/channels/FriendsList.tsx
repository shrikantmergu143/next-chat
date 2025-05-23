import React from "react";
import App_url from "../common/constant";
import { useSelector } from "react-redux";
import SideBarListItem from "./SideBarListItem";

export default function FriendsList(props) {
  const {channelsList} = useSelector(App_url.allReducers);

  return (
    <div className={`channel_sidebar__static_list ${props?.className} pt-1`}>
        {channelsList?.data?.map((item, index)=> item?.group_type === "direct" && (
            <React.Fragment key={index}>
                <SideBarListItem {...item}  />
            </React.Fragment>
        ))}
    </div>
  );
}
