"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import DropButton from "../common/DropButton";
import Icon from "../common/Icon";
import App_url from "../common/constant";
import { PostRequestAPI } from "../api/PostRequest";
import usePosterReducers from "../context/usePosterReducers";
import { setStoreCreateChatMessage } from "../../store/Actions";
import { useDispatch } from "react-redux";
import Utils from "../utils";
import FriendRequestModal from "../common/modal/FriendRequestModal";
import { PutRequestAPI } from "../api/PutRequest";
import MessageEditor from "../common/text-editor/MessageEditor";

// Type definitions for props
interface ChatGroupDetails {
  group_type: string;
  profile_url?: string;
  mode?: string;
  channel_name?: string;
  name?: string;
  user_status?: {
    status?: string;
  };
}

interface ChannelDetailsProps {
  chatGroupDetails?: ChatGroupDetails;
  group_id?: string;
  callBackUpdate?: any;
  callGetMessages?: any;
  children?: React.ReactNode;
}

interface MessagePayload {
  message: string;
  media_url: string;
  group_id: string;
  message_type: string;
  reply_id: string;
}

export function PaginationList(array: any[] = [], page_size: number = 10, page_number: number = 1): any[] {
  return array
    ?.sort((a, b) => new Date(b?.created_at).getTime() - new Date(a?.created_at).getTime())
    ?.slice((page_number - 1) * page_size, page_number * page_size);
}

export default function ChannelDetails(props: ChannelDetailsProps) {
  const { access_token, theme, currentUser, savedPin, pinVerified } = usePosterReducers();
  const dispatch = useDispatch();
  const [values, setValues] = useState<{ message: string }>({ message: "" });

  const getLinkAvatar = useMemo(() => {
    if (props?.chatGroupDetails?.group_type === "direct") {
      return props?.chatGroupDetails?.profile_url
        ? { url: props.chatGroupDetails.profile_url, image: true }
        : { url: Utils.getThemeDefaultUser(theme), image: true };
    } else {
      return props.chatGroupDetails.mode === "public"
        ? { url: App_url.icons.Hash }
        : { url: App_url.icons.Lock };
    }
  }, [props.chatGroupDetails, theme]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const onSendMessage = async (event: any) => {
    const payload: MessagePayload = {
      message: event?.target?.value,
      media_url: "",
      group_id: props?.group_id,
      message_type: "text",
      reply_id: "",
    };

    setValues({ message: "" });

    if (payload.message) {
      const response = await PostRequestAPI(App_url.api.API_CREATE_CHAT_MESSAGE, payload, access_token);
      if (response?.status === 200) {
        dispatch(setStoreCreateChatMessage({
          group_id: props.group_id,
          data: response.data.data,
        }));
        setTimeout(() => Utils.gotoMainPageMessage(response?.data?.data?._id, true), 100);
      }
    }
  };

  const onStatusChange = async (status: string) => {
    const payload = {
      group_id: props.group_id,
      status,
      user_id: currentUser?.id,
      email: currentUser?.email,
    };
    const response = await PutRequestAPI(App_url.api.API_UPDATE_INVITE_GROUP, payload, access_token);
    if (response?.status === 200) {
      props?.callBackUpdate?.();
    }
  };

  const getUserInfo = useMemo(() => {
    const name = props?.chatGroupDetails?.channel_name || props?.chatGroupDetails?.name;
    return savedPin && pinVerified ? name : Utils.encode({ message: name }, process.env.TOKEN_KEY!);
  }, [props?.chatGroupDetails, savedPin, pinVerified]);

  if (props.chatGroupDetails?.user_status?.status !== "accepted") {
    return <FriendRequestModal onStatusChange={onStatusChange} chatGroupDetails={props.chatGroupDetails} />;
  }

  const renderText = () => (
    <MessageEditor
      field="message"
      html={values.message}
      onChange={handleChange}
      onSend={onSendMessage}
    />
  );

  return (
    <>
      <div className="p-view_header">
        <DropButton
          title={
            <div className="d-flex-center">
              <Icon attrIcon={getLinkAvatar?.url} image={getLinkAvatar?.image} />
              <span className="text-capitalize">{getUserInfo}</span>
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
      <div className="p-view-body">{props?.children}</div>
      {renderText()}
    </>
  );
}
