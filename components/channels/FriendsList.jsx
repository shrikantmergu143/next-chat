import React from "react";
import Icon from "../common/Icon";
import App_url from "../common/constant";
import Button from "../common/Button";
import { useSelector } from "react-redux";

export default function FriendsList(props) {
  const {access_token, friendsList} = useSelector(App_url.allReducers);

  const ChannelItem = ({item}) =>{
    return(
      <Button to={`${App_url.link.Channel}/${item?.channel_id}`} variant={"hover-secondary-1"} className={"w-100"}>
        <Icon attrIcon={`${item?.mode === "public" ? App_url.icons.Hash: App_url.icons.Lock}`} size={"ssm"} />
        <span>{item?.email_to}</span>
      </Button>
    )
  }
  return (
    <div className={`channel_sidebar__static_list ${props?.className}`}>
        {friendsList?.data?.map((item, index)=>(
            <React.Fragment key={index}>
                <ChannelItem item={item}  />
            </React.Fragment>
        ))}
    </div>
  );
}
