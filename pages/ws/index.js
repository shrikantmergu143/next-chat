import React from "react";
import { Card } from "react-bootstrap";
import Scrollbar from "../../components/common/Scrollbar";

export default function index() {
  const API_LIST = [
    {
      name: "User Details",
      param: {
        url: "get_user_details",
        request: { user_id: "643bae35482bb59a80685acd", broadcast: true },
        tab_id: "0.6902953025468757",
        broadcast: true,
      },
    },
    {
      name: "Get Friend Request",
      param: {
        url: "get_friend_request",
        request: { status: "accepted", limit: "20", page: "1" },
        tab_id: "0.6902953025468757",
        broadcast: true,
      },
    },
    {
      name: "Add Friend Request",
      param: {
        url: "send_friend_request",
        request: { email_to: "shrikantmergu14311233213@gmail.com" },
        tab_id: "0.6902953025468757",
        broadcast: "true",
      },
    },
    {
      name: "Update Friend Channels",
      param: {
        url: "update_friend_request",
        request: { friend_id: "667996c3c7f680d8955c1d32", status: "accepted" },
        tab_id: "0.6902953025468757",
        broadcast: true,
      },
    },
    {
      name: "Get Friend Accept List",
      param: {
        url: "get_friend_accepted",
        request: { status: "accepted", limit: "20", page: "1" },
        tab_id: "0.6902953025468757",
        broadcast: true,
      },
    },
    {
      name: "Add Channels",
      param: {
        url: "add_channels",
        request: {
          channel_name: "643bae35482bb59a80685acd",
          broadcast: "true",
        },
        tab_id: "0.6902953025468757",
        broadcast: "true",
      },
    },
    {
      name: "Get Channels",
      param: {
        url: "get_channels",
        request: { limit: "20", page: "1", search: "" },
        tab_id: "0.6902953025468757",
        broadcast: true,
      },
    },
  ];
  return (
    <Scrollbar style={{ height: "100vh" }}>
      <div className="bg-light">
        <div className="container-lg">
          <Card className="">
            <Card.Body>
              {API_LIST?.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="p-2">
                    <h6>{item?.name}</h6>
                    <p className="request mb-1">Payload</p>
                    <div className="p-0">{JSON.stringify(item?.param)}</div>
                  </div>
                </React.Fragment>
              ))}
            </Card.Body>
          </Card>
        </div>
      </div>
    </Scrollbar>
  );
}
