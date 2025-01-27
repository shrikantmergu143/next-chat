import React, { useEffect, useMemo, useRef, useState } from "react";
import DropButton from "../common/DropButton";
import Icon from "../common/Icon";
import App_url from "../common/constant";
import Scrollbar from "../common/Scrollbar";
import Editor from "../common/text-editor/Editor";
import { PostRequestAPI } from "../api/PostRequest";
import usePosterReducers from "../context/usePosterReducers";
import { setStoreCreateChatMessage } from "../../store/Actions";
import { useDispatch } from "react-redux";
import Button from "../common/Button";
import Utils from "../utils";

export default function ChannelDetails(props) {
  const { access_token, theme } = usePosterReducers();
  const dispatch = useDispatch();
  const [values, setValues] = useState({ message: "" });
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
  if (props?.chatGroupDetails?.user_status != "accept") {
    return (
      <React.Fragment>
        <div className="modal-invites-content">
          <div className="modal-invites radius-6">
            <div className="invites-body">
              <div className="invites-profile  text-center pb-3">
                <Icon
                  attrIcon={getLinkAvatar?.url}
                  image={getLinkAvatar?.image}
                  height={"120px"}
                  width={"120px"}
                />
              </div>
              <div className="invites-message text-center">
                <h4 className="text-capitalize">
                  {props?.chatGroupDetails?.channel_name ||props?.chatGroupDetails?.name}
                </h4>
                <p>Send you a friend request</p>
              </div>
              <div className="invites-footer">
                <Button variant={"danger"} size={"lg"} className="w-100" >Reject</Button>
                <Button variant={"green"} size={"lg"} className="w-100" >Accept</Button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
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
                {props?.chatGroupDetails?.channel_name ||
                  props?.chatGroupDetails?.name}
              </span>
            </div>
          }
          show_down={false}
        />
      </div>
      <div className="p-view-body">
        <Scrollbar style={{ height: `calc(100vh - 213px)` }}>
          {props?.children}
        </Scrollbar>
      </div>
      <Editor
        field="message"
        html={values?.message}
        onChange={handleChange}
        placeholder="Temporal placeholder..."
        onSend={onSendMessage}
      />
    </React.Fragment>
  );
}
