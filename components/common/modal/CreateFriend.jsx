/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { setShowModal } from "../../../store/Actions";
import { PostRequestAPI } from "../../api/PostRequest";
import { useWebSocket } from "../../context/SocketContext";
import InputGroup from "../InputGroup";
import Button from "../Button";
import Utils from "../../utils";
import action from "../../../store/action";
import Icon from "../Icon";
import App_url from "../constant";

export default function CreateFriend(props) {
  const { ModalPopup, access_token } = useSelector(App_url.allReducers);
  const [formData, setFormData] = useState({
    email_to:"",
  })
  const [errors, setErrors] = useState({
    email_to:"",
  });
  const {send} = useWebSocket();
  
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const validate = () =>{
    let val = true;
    if(formData?.email_to == ""){
      errors.email_to = "Enter your channel name";
      val = false;
    }
    setErrors((error)=>({
      ...error,
      ...errors,
    }));
    return val;
  }
  async function HandleOnClose() {
    if(validate()){
      // const param = {
      //   "url":"send_friend_request",
      //   "request":{
      //     "email_to":formData?.email_to
      //   },
      //   "broadcast":"true"
      // }
      // send(param)
        setLoad(true);
        const response = await PostRequestAPI(App_url.api.SEND_FRIEND_REQUEST, formData, access_token);
        console.log("response",response)
        if(response?.status === 200){
          action.getFriendList(access_token, dispatch);
          CloseModal();
        }else{
          Utils.AuthenticateVerify(response)
        }
        setLoad(false);
    }
  }
  function CloseModal(e) {
    dispatch(setShowModal());
    setFormData({
      email_to:"",
    })
  }
  const onChangeHandle = (e) =>{
    setFormData((data)=>({
      ...data,
      [e.target.name]: e.target.value,
    }));
    setErrors((error)=>({
      ...error,
      [e.target.name]:""
    }))
  }
  if(ModalPopup?.show !== "CREATE_FRIEND" ){
    return (
      <React.Fragment></React.Fragment>
    );
  }
  return (
    <Modal
      centered={true}
      onHide={CloseModal}
      show
      className={`confirm-modal ${ModalPopup?.variant}`}
    >
        <div className="modal-body" >
          <Icon attrIcon={App_url.icons.Close} className={"hover"} button
            variant={"hover-secondary btn-modal-close"}
            onClick={CloseModal}
            />
          <h5 className="title mb-3">Add New Friend</h5>
          <InputGroup
            formClassName={"mb-3"}
            placeholder={"Enter email"}
            onChange={onChangeHandle}
            name={"email_to"}
            label={"Email"}
            value={formData?.email_to}
            error={errors?.email_to}
          />
        </div>
        <div className="modal-footer">
          <Button
            variant={"secondary"}
            className={"button button-primary  btn-sm"}
            onClick={HandleOnClose}
            disabled={load}
          >
            Add Friend
          </Button>
        </div>
    </Modal>
  )
}
CreateFriend.propTypes = {
  closeButton: PropTypes.any,
  variant: PropTypes.any,
};
CreateFriend.defaultProps = {
  closeButton: "Cancel",
  variant: "primary",
};
