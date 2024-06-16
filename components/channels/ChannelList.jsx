import React from "react";
import Icon from "../common/Icon";
import App_url from "../common/constant";
import Button from "../common/Button";
import { useSelector } from "react-redux";

export default function ChannelList() {
  const {access_token, channelsList} = useSelector(App_url.allReducers);

  const ChannelItem = ({item}) =>{
    return(
        <Button variant={"hover-secondary-1"} className={"w-100"}>
        <Icon attrIcon={`${item?.mode === "public" ? App_url.icons.Hash: App_url.icons.Lock}`} size={"sm"} />
        <span>{item?.channel_name}</span>
      </Button>
    )
  }
  return (
    <div className="channel_sidebar__static_list">
        {channelsList?.data?.map((item, index)=>(
            <React.Fragment key={index}>
                <ChannelItem item={item}  />
            </React.Fragment>
        ))}
    </div>
  );
}
