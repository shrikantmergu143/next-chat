import React, { useEffect, useLayoutEffect, useRef } from "react";
import { usePosterReducers } from "../components/context/usePosterReducers";
import {
  setStoreDeviceId,
  setStorePaginationList,
  setStoreTheme,
  setUpdatePaginationList,
} from "../store/Actions";
import Utils, { uuidv4 } from "../components/utils";
import { useDispatch } from "react-redux";
import PinGenerate from "../components/common/modal/PinGenerate";
import action from "../store/action";

function PageLoad(props) {
  const { device_id, theme, pagination, MessageList, access_token } = usePosterReducers();
  const dispatch = useDispatch();
  const intervalRef = useRef(null); // Ref for interval
  const isTabActive = useRef(true); // Track tab activity

  useEffect(() => {
    pageLoad();
  }, []);

  const pageLoad = () => {
    if (!device_id) {
      dispatch(setStoreDeviceId(uuidv4()));
    }
    if (!pagination?.page_number) {
      dispatch(
        setUpdatePaginationList({
          page_data: [],
          page_size: 40,
          page_number: 1,
        })
      );
    }
  };

  useLayoutEffect(() => {
    if (theme === undefined) {
      dispatch(setStoreTheme());
    }
    if (theme) {
      const html = document.querySelector("html");
      const body = document.querySelector("body");
      body.setAttribute("class", theme);
      html.setAttribute("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    if (!props?.chat_group_id || !access_token) return;

    const startInterval = () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Clear previous interval
      intervalRef.current = setInterval(() => {
        if (isTabActive.current) {
          callGetMessages(new Date().toJSON());
        }
      }, 3000);
    };

    startInterval();

    // Handle tab visibility changes
    const handleVisibilityChange = () => {
      isTabActive.current = document.visibilityState === "visible";
      if (isTabActive.current) {
        startInterval(); // Restart API calls when tab is active
      } else {
        clearInterval(intervalRef.current); // Stop API calls when tab is inactive
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [props?.chat_group_id, access_token]);

  const callGetMessages = async (date) => {
    if (!props?.chat_group_id) return;

    const payload = { group_id: props?.chat_group_id };

    if (MessageList?.[props?.chat_group_id]?.length) {
      payload.updated_at = MessageList?.[props?.chat_group_id]?.[0]?.updated_at || new Date().toJSON();
      payload.limit = 40;
    }

    if (date) {
      payload.updated_at = date;
    }

    await action.getChatMessagesList(access_token, dispatch, payload);
  };

  return (
    <div>
      <PinGenerate />
    </div>
  );
}

export default React.memo(PageLoad);
