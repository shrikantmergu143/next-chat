"use client"; // Required for Next.js 13+ (App Router)
import React, { useEffect, useMemo, useRef, useState } from "react";
import DropButton from "../common/DropButton";
import Icon from "../common/Icon";
import App_url from "../common/constant";
import Scrollbar from "../common/Scrollbar";
import Editor from "../common/text-editor/Editor";
import { PostRequestAPI } from "../api/PostRequest";
import usePosterReducers from "../context/usePosterReducers";
import { setStoreCreateChatMessage, setUpdatePaginationList } from "../../store/Actions";
import { useDispatch } from "react-redux";
import Button from "../common/Button";
import Utils from "../utils";
import FriendRequestModal from "../common/modal/FriendRequestModal";
import { PutRequestAPI } from "../api/PutRequest";
import MessageEditor from "../common/text-editor/MessageEditor";
export function PaginationList(array, page_size, page_number) {
  if(array){
      return array?.sort(( a, b )=> {
          return  new Date(b?.created_at) -  new Date(a?.created_at)
  })?.slice((page_number - 1) * page_size, page_number * page_size);
  }else{
      return [];
  }
}

export default function ChannelDetails(props) {
  const { access_token, theme, currentUser, savedPin, pinVerified, MessageList, pagination } = usePosterReducers();
  const dispatch = useDispatch();
  const [values, setValues] = useState({ message: "" });
  const [loader, setLoader] = useState(false);
  const getLinkAvatar = useMemo(() => {
    if (props?.chatGroupDetails?.group_type === "direct") {
      return props?.chatGroupDetails?.profile_url
        ? { url: props?.chatGroupDetails?.profile_url, image: true }
        : { url: Utils.getThemeDefaultUser(theme), image: true };
    } else {
      return props?.chatGroupDetails?.mode == "public"
        ? { url: App_url.icons.Hash }
        : { url: App_url.icons.Lock };
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const onSendMessage = async (event) => {
    const payload = {
      message: event?.target?.value,
      media_url: "",
      group_id: props?.group_id,
      message_type: "text",
      reply_id: "",
    };
    setValues("");
    if (payload?.message) {
      const response = await PostRequestAPI(
        App_url.api.API_CREATE_CHAT_MESSAGE,
        payload,
        access_token
      );
      if (response?.status == 200) {
        dispatch(
          setStoreCreateChatMessage({
            group_id: props?.group_id,
            data: response?.data?.data,
          })
        );
      } else {
      }
    }
  };
  const onStatusChange = async (status) =>{
    const payload = {
      group_id: props?.group_id,
      status:status,
      user_id:currentUser?.id,
      email: currentUser?.email,
    }
    const response = await PutRequestAPI(App_url.api.API_UPDATE_INVITE_GROUP, payload, access_token);
    console.log("response", response)
    if(response?.status == 200){
      props?.callBackUpdate?.();
    }else{

    }
  }
  const getUserInfo = useMemo(()=>{
      if(savedPin && pinVerified){
          return props?.chatGroupDetails?.channel_name || props?.chatGroupDetails?.name
      }
      return Utils.encode({message:props?.chatGroupDetails?.channel_name || props?.chatGroupDetails?.name}, process.env.TOKEN_KEY)
  },[props?.chatGroupDetails, savedPin, pinVerified])


  if (props?.chatGroupDetails?.user_status?.status != "accepted") {
    return (
      <FriendRequestModal onStatusChange={onStatusChange}  chatGroupDetails={props?.chatGroupDetails} />
    );
  }
  const renderText = () =>{
    return(
      <MessageEditor
        field="message"
        html={values?.message}
        onChange={handleChange}
        // placeholder="Temporal placeholder..."
        onSend={onSendMessage}
      />
    )
  }
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
              <span className="text-capitalize">
                {getUserInfo}
              </span>
            </div>
          }
          show_down={false}
        />
        <Icon
          attrIcon={App_url.icons.repeat}
          button
          onClick={props?.callGetMessages}
          buttonClassName="ms-auto"
        />
      </div>
      <div className="p-view-body">
          {props?.children}
      </div>
      {renderText()}
    </React.Fragment>
  );
}
