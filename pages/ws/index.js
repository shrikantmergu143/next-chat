import React from "react";
import { Card } from "react-bootstrap";

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
      name: "Add Friend Request",
      param: {
        url: "send_friend_request",
        request: { email_to: "shrikantmergu14311233213@gmail.com" },
        broadcast: "true",
      },
    },
    {
      name: "Add Channels",
      param: {
        "url": "add_channels",
        "request": {
          "channel_name":"643bae35482bb59a80685acd",
          "broadcast": true
        },
        "tab_id": "0.6902953025468757",
        "broadcast": true
      }
    },
    {
      name: "Get Channels",
      param: {
        "url": "get_channels",
        "request": { "limit": "20", "page": "1" },
        "tab_id": "0.6902953025468757",
        "broadcast": true
      }
    }
  ];
  return (
    <div className="container-lg">
      <Card>
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
  );
}
