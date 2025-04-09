/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Icon from "../Icon";
import App_url from "../constant";
import { setShowConfirmModal, setShowModal } from "../../../store/Actions";
import Button from "../Button";
import InputGroup from "../InputGroup";
import Utils from "../../utils";
import { PostRequestAPI } from "../../api/PostRequest";
import action from "../../../store/action";

export default function CreateChannelModal(datas) {
  const props = { ...datas };
  const { ModalPopup, access_token } = useSelector(App_url.allReducers);
  const [formData, setFormData] = useState<any>({
    name:"",
    mode:"private",
    group_type:"group",
    users:[],
  })
  const [errors, setErrors] = useState({
    name:"",
    mode:"",
  });
  
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const validate = () =>{
    let val = true;
    if(formData?.name == ""){
      errors.name = "Enter your channel name";
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
        setLoad(true);
        const response = await PostRequestAPI(App_url.api.API_CREATE_GROUP, formData, access_token);
        if(response?.status === 200){
          action.getChannelsList(access_token, dispatch);
        }else{
          Utils.AuthenticateVerify(response)
        }
        setLoad(false);
      CloseModal();
    }
  }
  function CloseModal() {
    dispatch(setShowModal());
    setFormData({
      name:"",
      mode:"private",
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
  const Options = [
    { label:"Public", value:"public" }, 
    { label:"Private", value:"private" }
  ]
  return ModalPopup?.show === "CREATE_CHANNEL" ? (
    <Modal
      centered={true}
      onHide={CloseModal}
      show={ModalPopup?.show === "CREATE_CHANNEL"}
      className={`confirm-modal ${ModalPopup?.variant}`}
    >
      <div className="modal-body" >
        <Icon attrIcon={App_url.icons.Close} className={"hover"} button
          variant={"hover-secondary btn-modal-close"}
          onClick={CloseModal}
          />
        <h5 className="title mb-3">Create a Channel</h5>
        <InputGroup
          formClassName={"mb-3"}
          placeholder={"Name"}
          onChange={onChangeHandle}
          name={"name"}
          label={"Name"}
          value={formData?.name}
          error={errors?.name}
        />
        <InputGroup
          label={"Channel Mode"}
          placeholder={"Channel Mode"}
          onChange={onChangeHandle}
          name={"mode"}
          value={formData?.mode}
          type={"select"}
          select
          option={Options}
        />
      </div>
      <div className="modal-footer">
        <Button
          variant={"secondary"}
          className={"button button-primary  btn-sm"}
          onClick={HandleOnClose}
          disabled={load}
        >
          Next
        </Button>
      </div>
    </Modal>
  ) : (
    <React.Fragment></React.Fragment>
  );
}
CreateChannelModal.propTypes = {
  closeButton: PropTypes.any,
  variant: PropTypes.any,
};
CreateChannelModal.defaultProps = {
  closeButton: "Cancel",
  variant: "primary",
};
