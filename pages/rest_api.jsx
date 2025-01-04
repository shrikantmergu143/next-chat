import React from "react";
import { Card } from "react-bootstrap";
import Scrollbar from "../components/common/Scrollbar";

export default function index() {
  const API_LIST = [
    {
      name:"Get Friend List",
      param:{
        url:"api/friends",
        Method:"GET",
        request:{
          "status":"accepted  | rejected",
          "page": 1,
          "limit":10
        }
      }
    },
  ];
  return (
    <Scrollbar style={{ height: "100vh" }}>
      <div className="bg-light h-100">
        <div className="container-lg">
          <Card className="">
            <Card.Body>
              {API_LIST?.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="p-2">
                    <h6>{item?.name}</h6>
                    <div className="p-0">
                      <div>
                        <b>Request Method :</b> {item?.param?.Method}
                      </div>
                      <div title={item?.param?.url}>
                        <b>URL :</b> <span>{item?.param?.url}</span>
                      </div>
                      {item?.param?.request && (
                        <div title={item?.param?.request}>
                          <b>Payload :</b>{" "}
                          <span>{JSON.stringify(item?.param?.request)}</span>
                        </div>
                      )}
                    </div>
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
