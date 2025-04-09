import React, { useEffect, useState } from "react";
import Icon from "../../common/Icon";
import App_url from "../../common/constant";
import DropButton from "../../common/DropButton";
import { useDispatch, useSelector } from "react-redux";
import action from "../../../store/action";
import ChannelList from "../../channels/ChannelList";
import { setShowModal } from "../../../store/Actions";

export default function ChannelListTab(props) {
  const { access_token } = useSelector(App_url.allReducers);
  const [toggleChannel, setToggleChannel] = useState(false);
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
  useEffect(() => {
    callGetChannelList();
  }, []);
  const callGetChannelList = async () => {
    action.getChannelsList(access_token, dispatch);
  };
  const onSelect = async (e) => {
    if (e.key === "create_channels") {
      dispatch(
        setShowModal({
          show: "CREATE_CHANNEL",
        })
      );
    }
  };
  return (
    <React.Fragment>
        <div className="channel_sidebar__static_list">
          <div className="channel_sidebar__section_heading">
            <Icon
              attrIcon={App_url.icons.DownDot}
              size={"xsm"}
              className={`rotate-${toggleChannel ? "-90" : ""}`}
              button
              variant={"hover-secondary-1"}
              onClick={() => setToggleChannel(!toggleChannel)}
            />
            <DropButton
              option={options}
              title={"Channels"}
              onSelect={onSelect}
            />
          </div>
        </div>
        {!toggleChannel && <ChannelList group_type="group" />}
    </React.Fragment>
  );
}
